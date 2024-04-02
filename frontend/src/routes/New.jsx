import Card from "../ui/Components/Card";
import { fetchNewMovies } from "../lib/loaders";
import { useLoaderData } from "react-router-dom";


export async function loader() {
  const movies = await fetchNewMovies();
  return movies;
}


export default function New() {
  const movies = useLoaderData();

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      {movies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
    </section>
  );
}



