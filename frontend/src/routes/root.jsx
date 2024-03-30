import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MovieContext } from "../contexts/MovieContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { SearchContext } from "../contexts/SearchContext";
import NavBar from "../ui/NavBar";

export default function Root() {
  const { movies, categories } = useLoaderData();
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <CategoryContext.Provider value={categories}>
        <MovieContext.Provider value={movies}>
          <NavBar />
          <Outlet />
        </MovieContext.Provider>
      </CategoryContext.Provider>
    </SearchContext.Provider>
  );
}