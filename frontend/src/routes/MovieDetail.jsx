import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { fetchMovieById, fetchWatchList } from '../lib/loaders.js';
import { defer } from "react-router-dom";
import Button from '../ui/Components/Button';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { PlayCircle } from 'react-feather';




export async function loader({ params }) {
  const dataMovies = await fetchMovieById(params.id);
  const userCookie = Cookies.get('user');
  let dataWatchlistMovie = [];

  if (userCookie) {
    const user = JSON.parse(userCookie);
    dataWatchlistMovie = await fetchWatchList(user.id);
  }

  return defer({ movie: dataMovies, dataWatchlistMovie });
}

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movie, dataWatchlistMovie } = useLoaderData();
  const [displayOption, setDisplayOption] = useState('description');
  const [isMovieInWatchlist, setIsMovieInWatchlist] = useState(
    dataWatchlistMovie
      ? dataWatchlistMovie.some(watchlistMovie => watchlistMovie.id === movie.id)
      : false
  );
  
    const handleAddToWatchlist = async () => {
      const userCookie = Cookies.get('user');
    
      if (!userCookie) {
        navigate('/login');
        return;
      }
    
      if (isMovieInWatchlist) {
        alert('Vous avez déjà vu ce film');
        return;
      }
    
      const user = JSON.parse(userCookie);
      const response = await fetch(`http://193.168.145.234:8080/api/watchlist/user/${user.id}/movie/${movie.id}/add`, {
        method: 'POST',
      });
    
      if (response.ok) {
        // alert('Le film a été ajouté à votre watchlist');
        setIsMovieInWatchlist(true); // Update the state here
      } else {
        alert('Une erreur est survenue lors de l\'ajout du film à votre watchlist');
      }
    };

  const goBack = () => {
    navigate(-1);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return movie ? (
    <section className=''>
      <div className="film relative">
      <img src={`../../../public/_assets/${movie.une}`} alt={movie.name} className="w-full max-h-[55rem] object-cover"/>
      <div className="absolute inset-0 bg-neutral-900/60 flex justify-center items-center ">
        <PlayCircle className='size-20 text-neutral-100 cursor-pointer z-10' onClick={handleAddToWatchlist}></PlayCircle>
      </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-50 rounded-md flex flex-col justify-end items-start p-12">
        <div className="flex flex-row p-2 gap-10">
          <div className="aspect-[0.75] rounded-md w-40 ">
            <img src={`../../../public/_assets/${movie.picture}`} alt={movie.name} className="rounded-md aspect-[0.75] object-cover w-full"/>
          </div>
          <div className="text-neutral-100 text-sm w-full flex flex-col gap-1 justify-between my-1" onclick="">
              <h2 className=" text-4xl font-normal">{movie.name}</h2>
              <div className="flex flex-col gap-0 text-sm">
                  <h2 className="text-neutral-100 font-light opacity-80">{movie.released} - {movie.category[0].name}</h2>
                  <h2 className="text-main-400 overflow-hidden whitespace-nowrap opacity-80">Recommandé à 99%</h2>
              </div>
              <div intent={`primary`} className="mt-5">
                  {isMovieInWatchlist ? 'Vous avez déjà vu ce film' : "Vous n'avez pas encore vu ce film"}
              </div>
          </div>
        </div>
        </div>
    </div>

    <div className='flex flex-row gap-5 mx-20 my-10'>
      <Button intent="bottom" active="false" size="small" text="white" onClick={() => setDisplayOption('description')}>Description</Button>
      <Button intent="bottom" active="false" size="small" text="white" onClick={() => setDisplayOption('trailer')}>Trailer</Button>
    </div>

    <section className="flex flex-row justify-between px-20 pb-10 w-full pt-[2.125rem] items-center text-neutral-100">
      {displayOption === 'description' ? (
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-normal">Synopsys</h2>
          <p className="max-w-[40rem] text-base font-extralight">{movie.description}</p>
          <h2 className="text-3xl font-normal">Categorie</h2>
          <Link to={`/categories/${movie.category[0].name}`}>
            <Button intent="primary" active="true" size="small" text="black" className=" w-min text-base font-extralight">{movie.category[0].name}</Button>
          </Link>
          </div>


      ) : (
        <div className='w-full flex items-center justify-center m-10'>
          <iframe
            width="100%"
            className='aspect-[1.77] w-full'
            src={`https://www.youtube.com/embed/${movie.trailer}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </section>

  </section>
  ) : (
    <p className="text-lg text-center mt-8">Le film demandé n'a pas été trouvé.</p>
  );
}