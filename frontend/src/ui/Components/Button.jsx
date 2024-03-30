import { cva } from "class-variance-authority";

// Base definition

const base = "bg-transparent";

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
        "text-neutral-100",
        "border-b-2", // This is the line that is causing the error
        "border-transparent", // This is the line that is causing the error
        "hover:border-b-2",
        "hover:border-b-main-400",
        "uppercase",
        "text-sm",
        "py-4",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-6"],
      medium: ["text-base", "py-2", "px-4"],
    },
    active: {
      true: ["bg-main-400", "text-neutral-100"],
      false: [],
    },

  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    active: "false",
  },
});

export default function Button({ intent, size, active, className, children, ...rest }) {
  return <button {...rest} className={button({ intent, size, active, className })}>
    {children} 
  </button>
}

