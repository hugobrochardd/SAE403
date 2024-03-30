import Card from "../ui/Components/Card";
import { useLoaderData } from "react-router-dom";
import { defer } from "react-router-dom";
import { fetchMovies, fetchCategories } from "../lib/loaders";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function Home() {
  const movies = useContext(MovieContext);

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      {movies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
    </section>
  );
}