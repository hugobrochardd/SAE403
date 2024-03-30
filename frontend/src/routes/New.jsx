//Les plus récents

import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import Card from "../ui/Components/Card";

export default function New() {
  const movies = useContext(MovieContext);

  const sortedMovies = [...movies].sort((a, b) => b.released - a.released);

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      {sortedMovies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
    </section>
  );
}



// ou tous les films sorties cette années ou l'année dernière