import { useNavigate, useLoaderData } from 'react-router-dom';
import { fetchMovieById } from '../lib/loaders.js';

export async function loader({ params }) {
  const movies = await fetchMovieById(params.id);
  return movies;
}

export default function MovieDetail() {
  const movie = useLoaderData();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return movie ? (
    <div className="pt-[4.125rem]">
      <h2>{movie.name}</h2>
      <p>{movie.description}</p>
      <button onClick={goBack}>Retourner</button>
    </div>
  ) : (
    <p>Le film demandé n'a pas été trouvé.</p>
  );
}