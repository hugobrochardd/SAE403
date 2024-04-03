import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-feather";
import { Plus } from "react-feather";




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


export default function Cardbtn({phrase}) {
  return (
          <div className="relative aspect-[0.75] rounded-md max-w-40 bg-main-900 flex flex-col items-center justify-center gap-5">
                <Plus className="stroke-main-400 size-12" />
                <h2 className="text-center text-main-400 text-sm font-normal mx-10">{phrase}</h2>
          </div>
);
}

