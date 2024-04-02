import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import NavBar from "../ui/NavBar";
import { fetchCategories } from "../lib/loaders";
import { SearchContext } from "../contexts/SearchContext";


export async function loader() {
  const categories = await fetchCategories();
  return { categories };
}

export default function Root() {
  const { categories } = useLoaderData();
  const [search, setSearch] = useState("");


  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <CategoryContext.Provider value={categories}>
        <NavBar />
        <Outlet />
      </CategoryContext.Provider>
    </SearchContext.Provider>
  );
}