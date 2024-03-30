import { cva } from "class-variance-authority";
import { Heart } from "react-feather";
import { Link } from "react-router-dom";


// Base definition


const base = "";

const card = cva(base, {
  variants: {
    intent: {
      primary: [

      ],
    },
    size: {
      small: ["text-sm", "py-2", "px-4"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});



export default function Card({ category, description, director, highlight, id, name, picture, released }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className="">
        <div className="relative aspect-[0.73] rounded-md max-w-48">
          <img src={`../../../public/_assets/${picture}`} alt={name} className="rounded-md aspect-[0.73]"/>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 rounded-md">
              <div className="" onclick="">
                  <div className="">
                      <h2 className="">{category[0].name}</h2>
                      <h2 className="">Recommandé à 99%</h2>
                  </div>
              </div>
              <button className="" onclick="">
                <Heart/>
              </button>
          </div>
        </div>

          <div className="flex gap-0.5 flex-col">
              <h1 className="flex text-2xl">{name}</h1>
              <div className="flex flex-row gap-2 text-xs">
                  <h2 className="">{director}</h2>
                  <h2 className="">/</h2>
                  <h2 className="">{released}</h2>
              </div>
          </div>
      </div>
    </Link>
  );
}

