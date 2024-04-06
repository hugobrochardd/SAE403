import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import NavBar from "../ui/NavBar";
import { fetchCategories } from "../lib/loaders";
import { SearchContext } from "../contexts/SearchContext";
import Footer from "../ui/Components/Footer";
import Cookies from "js-cookie";
import { useEffect } from "react";

export async function loader() {
  const categories = await fetchCategories();
  return { categories };
}

export default function Root() {
  const { categories } = useLoaderData();
  const [search, setSearch] = useState("");
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = Cookies.get('user');
    const token = Cookies.get('token');

    if (user && token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <SearchContext.Provider value={{ search, setSearch }}>
        <CategoryContext.Provider value={categories}>
          <NavBar />
          <Outlet />
          <Footer />
        </CategoryContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider> 
  );
}