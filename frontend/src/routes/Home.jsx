import Card from "../ui/Components/Card";
import Cardbtn from "../ui/Components/CardButton";
import Spotlight from "../ui/Components/Spotlight";
import { useLoaderData } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { fetchRandomMovies, fetchNewMovies, fetchHighlightMovies } from "../lib/loaders";
import Button from "../ui/Components/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-feather";
import { useLayoutEffect } from "react";


export async function loader() {

  const newMovies = await fetchNewMovies( 1, 5 );
  const highlightMovies = await fetchHighlightMovies( 1, 5 );
  const randomMovies = await fetchRandomMovies( 1, 5 );
  return { newMovies, highlightMovies, randomMovies };
}

export default function Home() {
  const { newMovies, highlightMovies, randomMovies } = useLoaderData();
  const phrases = ["de films récents", "de films de la selection", "de films bien notés"];


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center pt-[4.125rem]">
      <section className="max-h-[50rem]">
        <Carousel showThumbs={false} infiniteLoop autoPlay useKeyboardArrows showStatus={false} interval={5000} emulateTouch={true}>
          {randomMovies.map((movie) => (
            <div key={movie.id}>
              <Spotlight {...movie} />
            </div>
          ))}
        </Carousel>
      </section>


      <section className="flex flex-col flex-nowrap gap-8 m-10 py-12 w-full px-24">
        <div className="flex flex-row justify-between">
          <h2 className="text-main-400 text-xl font-normal">Nouveautés</h2>
          <Link to="/new" className="">
            <Button intent="primary" active="true" size="small" text="black" className="flex flex-row text-sm font-medium items-center justify-center gap-3">Voir nos derniers films<ArrowRight className="stroke-black size-4" /></Button>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap gap-8">
          {newMovies.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
          <Link className="" to="/new">
            <Cardbtn phrase={phrases[0]} />
          </Link>
        </div>

      </section>


      <section className="flex flex-col flex-nowrap gap-8 items-center bg-[url('../../public/_assets/hero1.jpg')] py-20 w-full relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <h3 className="text-neutral-100 uppercase text-sm font-light z-20">Sélection</h3>
        <h2 className="text-main-400 text-xl font-normal z-20">Mis en avant</h2>
        <p className="text-neutral-100 max-w-[37.5rem] text-center font-extralight mb-12 z-20">Découvrez notre sélection spéciale de films captivants, soigneusement choisis pour leur intrigue, leurs performances et leur réalisation remarquable. Plongez dans des histoires inoubliables qui vous transporteront au-delà de l'écran.</p>
        <div className="flex flex-row flex-nowrap gap-8 mb-12 z-20">
          {highlightMovies.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
          <Link className="" to="/selection">
            <Cardbtn phrase={phrases[1]} />
          </Link>
        </div>
        <Link to="/selection" className="z-20">
          <Button intent="primary" active="true" size="small" text="black" className="flex flex-row text-sm font-medium items-center justify-center gap-3 ">Voir la sélection de nos films<ArrowRight className="stroke-black size-4" /></Button>
        </Link>
      </section>

      <section className="flex flex-col flex-nowrap gap-8 items-center bg-[url('../../public/_assets/hero2.jpg')] py-20 w-full relative object-cover object-center">
      <div className="absolute inset-0 bg-black/60"></div>
        <h3 className="text-neutral-100 uppercase text-sm font-light z-20">Sélection</h3>
        <h2 className="text-main-400 text-xl font-normal z-20">Mieux notés</h2>
        <p className="text-neutral-100 max-w-[37.5rem] text-center font-extralight mb-12 z-20">Explorez notre collection des films les mieux notés, acclamés par les spectateurs et les critiques. Des œuvres d'art cinématographiques qui vous captiveront par leur narration immersive et leur impact émotionnel. Trouvez votre prochain coup de cœur parmi nos recommandations.</p>
        <div className="flex flex-row flex-wrap gap-8 z-20">
          {highlightMovies.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
          <Link className="" to="/top">
            <Cardbtn phrase={phrases[2]} />
          </Link>
        </div>
        <Link to="/selection" className="z-20">
          <Button intent="primary" active="true" size="small" text="black" className="flex flex-row text-sm font-medium items-center justify-center gap-3 ">Voir la sélection de nos films<ArrowRight className="stroke-black size-4" /></Button>
        </Link>
      </section>
    </div>
  );
}