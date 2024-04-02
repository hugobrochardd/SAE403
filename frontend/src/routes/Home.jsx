import Card from "../ui/Components/Card";
import Cardbtn from "../ui/Components/CardButton";
import Spotlight from "../ui/Components/Spotlight";
import { useLoaderData } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { fetchRandomMovies, fetchNewMovies, fetchHighlightMovies } from "../lib/loaders";
import Button from "../ui/Components/Button";
import { Link } from "react-router-dom";
import Categories from "./Categories";


export async function loader() {

  const newMovies = await fetchNewMovies( 1, 5 );
  const highlightMovies = await fetchHighlightMovies( 1, 5 );
  const randomMovies = await fetchRandomMovies( 1, 5 );
  return { newMovies, highlightMovies, randomMovies };
}

export default function Home() {
  const { newMovies, highlightMovies, randomMovies } = useLoaderData();
  const phrases = ["de films récents", "de films de la selection", "de les films bien notés"];

  return (
    <div className="flex flex-col gap-11 items-center">
      <section className="max-h-[50rem]">
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows showStatus={false} interval={5000} emulateTouch={true}>
          {randomMovies.map((movie) => (
            <div key={movie.id}>
              <Spotlight {...movie} />
            </div>
          ))}
        </Carousel>
      </section>


      <section className="flex flex-col flex-nowrap gap-8 m-10 w-full">
        <h2 className="text-main-400 text-xl font-normal">Nouveautés</h2>
        <div className="flex flex-row flex-wrap gap-8">
          {newMovies.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
          <Link className="" to="/new">
            <Cardbtn phrase={phrases[0]} />
          </Link>
        </div>

      </section>


      <section className="flex flex-col flex-nowrap gap-8 m-10 items-center">
        <h3 className="text-neutral-100 uppercase text-sm font-light">Sélection</h3>
        <h2 className="text-main-400 text-xl font-normal">Mis en avant</h2>
        <p></p>
        <div className="flex flex-row flex-nowrap gap-8">
          {highlightMovies.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
          <Link className="" to="/selection">
            <Cardbtn phrase={phrases[1]} />
          </Link>
        </div>
      </section>

      <section className="flex flex-col flex-nowrap gap-8 m-10 items-center">
        <h3 className="text-neutral-100 uppercase text-sm font-light">Sélection</h3>
        <h2 className="text-main-400 text-xl font-normal">Mieux notés</h2>
        <p></p>
        <div className="flex flex-row flex-wrap gap-8">
          {highlightMovies.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
          <Link className="" to="/new">
            <Cardbtn phrase={phrases[2]} />
          </Link>
        </div>
      </section>
    </div>
  );
}