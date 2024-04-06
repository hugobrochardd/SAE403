import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories, {loader as categoriesLoader } from './routes/Categories.jsx';
import './index.css';
import ErrorPage from './ui/ErrorPage/index.jsx';
import Home, {loader as homeLoader } from '../src/routes/Home.jsx';
import Search, {loader as searchLoader } from './routes/Search.jsx';
import MovieDetail, {loader as movieDetailLoader } from './routes/MovieDetail.jsx';
import New, {loader as newLoader } from './routes/New.jsx';
import Selection, {loader as selectionLoader } from './routes/Selection.jsx';
import Root, {loader as rootLoader} from './routes/root.jsx';
import Playlist, {loader as playlistLoader} from './routes/user/Playlist.jsx';
import Login from '../src/routes/Login.jsx';
import Register from '../src/routes/Register.jsx';
import Logout from './routes/Logout.jsx';
import PrivateRoute from './ui/Components/PrivateRoot.jsx';
import Profil from './routes/user/Profil.jsx';
import Top, {loader as topLoader} from './routes/Top.jsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: '/categories/:category',
        element: <Categories />,
        loader: categoriesLoader,
      },
      {
        path: '/search/:searchTerm',
        element: <Search />,
        loader: searchLoader,
      },
      {
        path:"/movie/:id",
        element: <MovieDetail />,
        loader: movieDetailLoader,
      },
      {
        path: '/new',
        element: <New />,
        loader: newLoader,
      },
      {
        path: '/selection',
        element: <Selection />,
        loader: selectionLoader,
      },
      {
        path: '/top',
        element: <Top />,
        loader: topLoader,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: "/profil",
        element: (
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        ),
      },
      {
        path: "/playlist",
        element: (
          <PrivateRoute>
            <Playlist />
          </PrivateRoute>
        ),
        loader: playlistLoader,
      }

    ],
  }
]);




const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  console.error('No root element found');
}
