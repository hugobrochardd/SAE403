import { cva } from "class-variance-authority";
import { Heart } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
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



export default function TextCard({ category, description, director, highlight, id, name, picture, released }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="w-full flex flex-row p-2 hover:bg-main-900 gap-10">
        <div className="aspect-[0.75] rounded-md w-48 ">
          <img src={`../../../public/_assets/${picture}`} alt={name} className="rounded-md aspect-[0.75] object-cover w-full"/>
        </div>
        <div className="text-white text-sm w-full flex flex-col gap-1 justify-between my-1" onclick="">
            <h2 className=" text-4xl font-normal">{name}</h2>
            <div className="flex flex-col gap-0 text-sm">
                <h2 className="text-white font-light opacity-80">{released} - {category[0].name}</h2>
                <h2 className="text-main-400 overflow-hidden whitespace-nowrap opacity-80">Recommandé à 99%</h2>
            </div>
            <p className="max-w-[40rem] text-base font-extralight">{description}</p>
            <Button intent="primary" active="true" size="small" text="black" className="max-w-40"><Link to={`/movie/${id}`}>Voir le film</Link></Button>
        </div>
      </div>
    </div>
  );
}

