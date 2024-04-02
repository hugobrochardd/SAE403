import { useLoaderData, useParams } from "react-router-dom";
import Card from "../ui/Components/Card";
import { fetchSearchMovies } from "../lib/loaders";
import { useNavigate } from "react-router-dom";


export async function loader(params) {
  console.log(params);
  const movies = await fetchSearchMovies(params.params.searchTerm, 1, 50);
  return movies;
}


export default function Search() {
  const { searchTerm } = useParams();
  const movies = useLoaderData();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="flex flex-row flex-wrap gap-8 m-10">
      <p>Résultat pour {searchTerm}</p>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Card key={movie.id} {...movie} />
        ))
      ) : (
        <p>Aucun film ne correspond à votre recherche.</p>
      )}
      
      <button onClick={goBack}>Retourner</button>
    </section>
  );
}

