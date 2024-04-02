import Card from "../ui/Components/Card";
import { useParams } from "react-router-dom";
import { fetchMovies, fetchMoviesByCategories } from "../lib/loaders";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export async function loader({ params }) {
  let movies;
  let name = params.category;
  if (params.category == "all"){
    movies = await fetchMovies(1, 50);
    name = "Tous les films";
  }
  else{
    movies = await fetchMoviesByCategories(params.category);
  }
  return { movies, name };
}

export default function Categories() {
  const { category } = useParams();
  const { movies, name } = useLoaderData({ category });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={goBack}>Retourner</button>
      <h1 className="text-4xl font-bold text-center m-10">{name}</h1>
      <section className="flex flex-row flex-wrap gap-8 m-10">
        {movies.map((movie) => (
          <Card key={movie.id} {...movie} />
        ))}
      </section>
    </div>
  );
}