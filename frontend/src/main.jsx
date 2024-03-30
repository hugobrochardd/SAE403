import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/root.jsx';
import Categories from './routes/Categories.jsx';
import './index.css';
import ErrorPage from './ui/ErrorPage/index.jsx';
import Home from '../src/routes/Home.jsx';
import { fetchMovies, fetchCategories } from "./lib/loaders";
import Search from './routes/Search.jsx';
import MovieDetail from './routes/MovieDetail.jsx';
import New from './routes/New.jsx';
import Selection from './routes/Selection.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: async () => {
      const [movies, categories] = await Promise.all([fetchMovies(), fetchCategories()]);
      return { movies, categories };
    },
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/categories/:category',
        element: <Categories />,
      },
      {
        path: '/search/:searchTerm',
        element: <Search />,
      },
      {
        path:"/movie/:id",
        element:<MovieDetail />
      },
      {
        path: '/new',
        element: <New />,
      },
      {
        path: '/selection',
        element: <Selection />,
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
