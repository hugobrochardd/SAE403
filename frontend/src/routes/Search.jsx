import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { useParams } from "react-router-dom";
import Card from "../ui/Components/Card";


export default function Search() {
  const { searchTerm } = useParams();
  const movies = useContext(MovieContext);

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <Card key={movie.id} {...movie} />
        ))
      ) : (
        <p>Aucun film ne correspond à votre recherche.</p>
      )}
    </section>
  );
}