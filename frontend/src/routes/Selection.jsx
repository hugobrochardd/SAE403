import Card from "../ui/Components/Card";
import { fetchHighlightMovies } from "../lib/loaders";
import { useLoaderData } from "react-router-dom";


export async function loader() {
  const movies = await fetchHighlightMovies();
  return movies;
}

export default function Highlighted() {
  const movies = useLoaderData();
  return (
    <section className="flex flex-row flex-wrap gap-8 m-10 pt-[4.125rem]">
      {movies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
    </section>
  );
}

