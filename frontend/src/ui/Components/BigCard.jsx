import { cva } from "class-variance-authority";
import { Heart } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";



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



export default function BigCard({ category, description, director, highlight, id, name, picture, released }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Link to={`/movie/${id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="">
        <div className="relative aspect-[0.75] rounded-md w-64">
          <img src={`../../../public/_assets/${picture}`} alt={name} className="rounded-md aspect-[0.75] object-cover w-full"/>
          {isHovered && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 rounded-md flex flex-col justify-between items-end p-4">
              {isAuthenticated ? (
                <button className="" onclick="">
                  <Heart className="stroke-white"/>
                </button>
              ) : (
                <button className="" onclick="">
                  <Heart className="hidden"/>
                </button>
              )}
              <div className="text-white text-sm w-full flex flex-col gap-1" onclick="">
                      <h2 className=" text-lg font-semibold">{name}</h2>
                      <div className="flex flex-row gap-2">
                        <h2 className=" font-medium">{released}</h2>
                        <h2 className="">{category[0].name}</h2>
                      </div>
                      <h2 className="text-main-400 overflow-hidden whitespace-nowrap">Recommandé à 99%</h2>
              </div>
            </div>
          )}
        </div>

      </div>
    </Link>
  );
}

