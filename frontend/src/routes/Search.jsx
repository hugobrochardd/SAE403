import { useLoaderData, useParams } from "react-router-dom";
import Card from "../ui/Components/Card";
import { fetchSearchMovies } from "../lib/loaders";
import { useNavigate } from "react-router-dom";
import { Square, List } from "react-feather";
import { useState } from 'react';
import BigCard from "../ui/Components/BigCard";
import TextCard from "../ui/Components/TextCard";
import { ChevronLeft } from "react-feather";
import Button from "../ui/Components/Button";
import { useLayoutEffect } from 'react';




export async function loader(params) {
  console.log(params);
  const movies = await fetchSearchMovies(params.params.searchTerm, 1, 50);
  return movies;
}


export default function Search() {
  const [displayMode, setDisplayMode] = useState('list'); 
  const [search, setSearch] = useState("");
  const { searchTerm } = useParams();
  const movies = useLoaderData();

  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col gap-8 pt-[4.125rem] min-h-screen">
    <section className="w-full flex flex-col items-center justify-center py-16 bg-main-900 gap-6">
      <h1 className="text-3xl font-light text-main-400 pt-3">Recherche</h1>
      <div className='bg-transparent flex flex-row p-4 gap-4'>
              <input 
                className="bg-neutral-800 border-none appearance-none min-w-96 px-6 py-3 text-sm
                text-neutral-100 rounded-lg ring-inset hover:ring-main-700" 
                type="text" 
                placeholder="Rechercher" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
              />
              <Button intent="primary" size="small" active="true" text="black" onClick={handleSearchSubmit}>Rechercher</Button>
      </div>
    </section>
    <div className="flex flex-row justify-between mx-10 mb-5">
        <div className="flex flex-row justify-center items-center gap-10">
          <ChevronLeft className="size-6 cursor-pointer text-white" onClick={goBack} /> 
          <p className="text-2xl font-light text-white">Résultats pour "{searchTerm}"</p>
          <p className="text-2xl font-thin text-white">{movies.length} films</p>
        </div>
        <section className="flex flex-row gap-5 text-white items-center justify-center">
          <Square className="size-6 mt-1 cursor-pointer" onClick={() => setDisplayMode('grid')} /> 
          <div className="text-3xl font-thin">|</div>
          <List className="size-6 mt-1 cursor-pointer" onClick={() => setDisplayMode('list')} /> 
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

