import { cva } from "class-variance-authority";
import { Heart } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";



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



export default function Spotlight({ category, description, director, highlight, id, name, picture, released, une }) {

  return (
        <div className="relative max-h-[52rem] h-full">
          <img src={`../../../public/_assets/${une}`} alt={name} className="h-full object-cover"/>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-50 rounded-md flex flex-col justify-end items-start p-12">
              <div className="text-white flex flex-col justify-start items-start" onclick="">
                    <h1 className="flex text-3xl font-semibold">{name}</h1>
                    <div className="flex flex-row gap-2 font-extralight">
                        <h2 className="">{director} , {released}</h2>
                    </div>
                  <div className="flex flex-col items-start gap-4">
                      <h2 className="text-main-400 overflow-hidden whitespace-nowrap">Recommandé à 99%</h2>
                      <Link to={`/movie/${id}`} className="">
                        <Button intent="primary" size="small" active="true" text="black">Voir le film</Button>
                      </Link>
                  </div>
              </div>
            </div>
        </div>
  );
}

