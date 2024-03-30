// La selection de notre équipe

import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import Card from "../ui/Components/Card";

export default function Highlighted() {
  const movies = useContext(MovieContext);

  const highlightedMovies = movies.filter(movie => movie.highlight);

  

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      {highlightedMovies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
    </section>
  );
}