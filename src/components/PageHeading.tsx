import { JSX } from "solid-js/types/jsx";

export function PageHeading({ children }: { children: JSX.Element }) {
  return <h1 class="font-bold text-xl text-center">{children}</h1>;
}
