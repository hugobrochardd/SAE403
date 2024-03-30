import Card from "../ui/Components/Card";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function Categories() {
  const movies = useContext(MovieContext);
  const { category } = useParams();

  let filteredMovies = [];
  if (movies) {
    filteredMovies = movies.filter(movie => 
      movie.category && movie.category.some(cat => cat.id === parseInt(category))
    );
  }

  console.log(filteredMovies); // Should log the movies now

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      {filteredMovies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
    </section>
  );
}