import React, { useEffect, useState, useLayoutEffect  } from 'react';
import Cookies from 'js-cookie';
import { useLoaderData, defer, Link, Outlet } from "react-router-dom";
import Button from "../../ui/Components/Button.jsx";
import { fetchWatchList } from "../../lib/loaders";
import Card from '../../ui/Components/Card.jsx';
import { ChevronLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Square, List } from 'react-feather';
import BigCard from '../../ui/Components/BigCard.jsx';
import TextCard from '../../ui/Components/TextCard.jsx';




export async function loader() {
  const user = JSON.parse(Cookies.get('user'));
  const dataWatchlistMovie = await fetchWatchList(user.id);
  return defer({ dataWatchlistMovie });
}




async function deleteWatchlist() {
  const user = JSON.parse(Cookies.get('user'));

  const response = await fetch(`http://localhost:8080/api/watchlist/user/${user.id}/delete`, {
    method: 'DELETE',
  });

  if (response.ok) {
    // Refresh the page or update the state to reflect the deleted watchlist
    window.location.reload();
    // console.log('Watchlist deleted');
  } else {
    console.error('Failed to delete watchlist');
  }

}



export default function Playlist() {
  const { dataWatchlistMovie } = useLoaderData();
  const [displayMode, setDisplayMode] = useState('grid');
  const user = JSON.parse(Cookies.get('user'));
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }


  console.log(user);
  console.log(dataWatchlistMovie);



  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
<div className="min-h-screen flex relative flex-col w-full">
  <div className="absolute top-0 left-0 p-6 pt-[6.125rem] flex flex-row gap-4 justify-center items-center">
      <ChevronLeft className="size-10 cursor-pointer text-white" onClick={goBack} />
      <h1 className="text-4xl font-medium text-main-400">Historique</h1>
  </div>
  <section className="absolute top-0 right-0 p-6 pt-[6.325rem] flex flex-row gap-4 justify-center items-center">
        <Button intent={`primary`} onClick={deleteWatchlist}>
          Supprimer la watchlist
        </Button>
        <Link to="/">
          <Button intent={`primary`}>
            Modifier
          </Button>
        </Link>
    </section>

  
  <div className="flex flex-row justify-between px-20 pb-10 w-full pt-[12.125rem] items-center">
          <p className="text-2xl font-light text-white">Les films que vous avez déja visionnés</p>
          <section className="flex flex-row gap-5 text-white items-center justify-center">
            <Square className="size-6 mt-1 cursor-pointer" onClick={() => setDisplayMode('grid')} /> {/* Add onClick handler */}
            <div className="text-3xl font-thin">|</div>
            <List className="size-6 mt-1 cursor-pointer" onClick={() => setDisplayMode('list')} /> {/* Add onClick handler */}
          </section>
  </div>



{dataWatchlistMovie && dataWatchlistMovie.length > 0 ? (
      displayMode === 'list' ? ( 
        <section className="flex flex-col gap-10 mx-6">
                {dataWatchlistMovie.map((movie) => (
                  <TextCard key={movie.id} {...movie} />
                ))}
        </section>
      ) : (
        <section className="flex flex-row flex-wrap gap-2 mx-20">
          {dataWatchlistMovie.map((movie) => (
            <BigCard key={movie.id} {...movie} />
          ))}
        </section>
      )
    ) : (
      <div className='text-main-400 w-full flex items-center justify-center pt-60 text-4xl font-medium '>Votre historique est vide</div>
    )}
  </div>
  );
}







       


            
