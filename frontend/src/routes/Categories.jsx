import Card from "../ui/Components/Card";
import { useParams } from "react-router-dom";
import { fetchMovies, fetchMoviesByCategories } from "../lib/loaders";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BigCard from "../ui/Components/BigCard";
import TextCard from "../ui/Components/TextCard";
import { Square, List } from "react-feather";
import { useState } from 'react';
import { useLayoutEffect } from 'react';



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
  const [displayMode, setDisplayMode] = useState('list'); // Add this state
  const { category } = useParams();
  const { movies, name } = useLoaderData({ category });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col gap-8 pt-[4.125rem] min-h-screen">
      <section className="w-full flex items-center justify-center py-16 bg-main-900">
        <h1 className="text-3xl font-light text-main-400 pt-3">{category}</h1>
      </section>
      <div className="flex flex-row justify-between mx-10 mb-5">
          <p className="text-2xl font-light text-white">Une sélection de films "{category}"</p>
          <section className="flex flex-row gap-5 text-white items-center justify-center">
            <Square className="size-6 mt-1 cursor-pointer" onClick={() => setDisplayMode('grid')} /> {/* Add onClick handler */}
            <div className="text-3xl font-thin">|</div>
            <List className="size-6 mt-1 cursor-pointer" onClick={() => setDisplayMode('list')} /> {/* Add onClick handler */}
          </section>
      </div>

      {displayMode === 'list' ? ( // Render TextCard section if displayMode is 'list'
        <section className="flex flex-col gap-10 mx-6">
          {movies.map((movie) => (
            <TextCard key={movie.id} {...movie} />
          ))}
        </section>
      ) : ( // Render BigCard section if displayMode is 'grid'
        <section className="flex flex-row flex-wrap gap-2 mx-12">
          {movies.map((movie) => (
            <BigCard key={movie.id} {...movie} />
          ))}
        </section>
      )}
    </section>
  );
}









