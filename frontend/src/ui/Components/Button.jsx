import { cva } from "class-variance-authority";

// Base definition

const base = "";

const button = cva(base, {
  variants: {
    intent: {
      primary: [
        "outline",
        "text-neutral-100",
        "outline-main-400",
        "outline-1",
        "hover:outline-main-400",
        "rounded-full",
        "hover:opacity-80",
      ],
      bottom: [
        "border-b-2", // This is the line that is causing the error
        "border-transparent", // This is the line that is causing the error
        "hover:border-b-2",
        "hover:border-b-main-400",
        "uppercase",
        "text-sm",
        "py-4",
        "bg-transparent",
      ],
    },
    size: {
      small: ["text-sm", "py-2", "px-6"],
      medium: ["text-base", "py-2", "px-4"],
    },
    active: {
      true: ["bg-main-400"],
      false: ["bg-transparent"],
    },
    text: {
      blue: ["text-main-400"],
      white: ["text-neutral-100"],
      black: ["text-neutral-900"],
    },

  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase", active: "false", text: "white" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    active: "false",
    text: "white",
  },
});

export default function Button({ intent, size, active, text, className, children, ...rest }) {
  return <button {...rest} className={button({ intent, size, active, className, text })}>
    {children} 
  </button>
}

