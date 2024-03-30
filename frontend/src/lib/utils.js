import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

export async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 3000);
  });
}



export function cn(...args) {
  return twMerge(clsx(args));
}
