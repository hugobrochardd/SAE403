import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function MovieDetail() {
    const { id } = useParams();
    const movies = useContext(MovieContext);
    
    const movieId = Number(id);
    const movie = movies.find(movie => movie.id === movieId);

  return movie ? (
    <div>
      <h2>{movie.name}</h2>
      <p>{movie.description}</p>
      {/* ... autres détails du film ... */}
    </div>
  ) : (
    <p>Le film demandé n'a pas été trouvé.</p>
  );
}