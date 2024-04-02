import { cva } from "class-variance-authority";
import { Heart } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";



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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/movie/${id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="">
        <div className="relative aspect-[0.75] rounded-md max-w-40">
          <img src={`../../../public/_assets/${picture}`} alt={name} className="rounded-md aspect-[0.75]"/>
          {isHovered && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 rounded-md flex flex-col justify-between items-end p-4">
              <button className="" onclick="">
                <Heart className="stroke-white"/>
              </button>
              <div className="text-white text-sm" onclick="">
                  <div className="">
                      <div className="flex flex-row gap-2">
                        <h2 className="font-bold">{released}</h2>

                        <h2 className="">{category[0].name}</h2>
                      </div>
                      <h2 className="text-main-400 overflow-hidden whitespace-nowrap">Recommandé à 99%</h2>
                  </div>
              </div>
            </div>
          )}
        </div>

          <div className="flex gap-0 flex-col text-neutral-100 text-normal">
              <h1 className="flex font-semibold">{name}</h1>
              <div className="flex flex-row gap-2 font-extralight">
                  <h2 className="">{director}</h2>
              </div>
          </div>
      </div>
    </Link>
  );
}

