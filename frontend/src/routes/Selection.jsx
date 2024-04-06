import { fetchHighlightMovies } from "../lib/loaders";
import Card from "../ui/Components/Card";
import BigCard from "../ui/Components/BigCard";
import TextCard from "../ui/Components/TextCard";
import { fetchNewMovies } from "../lib/loaders";
import { useLoaderData } from "react-router-dom";
import { Square, List } from "react-feather";
import { useState } from 'react';
import { useLayoutEffect } from 'react';

export async function loader() {
  const movies = await fetchHighlightMovies();
  return movies;
}



export default function New() {
  const movies = useLoaderData();
  const [displayMode, setDisplayMode] = useState('grid'); // Add this state

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col gap-8 pt-[4.125rem] min-h-screen">
      <section className="w-full flex items-center justify-center py-16 bg-[url('../../public/_assets/selection.jpg')] object-cover object-center">
      <div className="absolute inset-0 bg-neutral-900/60"></div>
        <h1 className="text-3xl font-light text-main-400 pt-3 z-20">Sélections</h1>
      </section>
      <div className="flex flex-row justify-between mx-10 mb-5">
          <p className="text-2xl font-light text-neutral-100">Découvrez nos films sélectionnés pour vous</p>
          <section className="flex flex-row gap-5 text-neutral-100 items-center justify-center">
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


