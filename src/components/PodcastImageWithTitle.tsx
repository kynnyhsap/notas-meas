import { Size } from "~/components/size";
import { A } from "@solidjs/router";
import { PodcastsRecord } from "~/xata";

export function PodcastImageWithTitle({
  podcast,
  size = "md",
}: {
  podcast: PodcastsRecord | null | undefined;
  size: Size;
}) {
  if (!podcast) return null;

  const sizeClasses = getWidthAndHeightClassesFromSize(size);
  const gapClass = getGapClassFromSize(size);

  return (
    <A href={`/podcasts/${podcast.id}`} class={`flex items-center ${gapClass}`}>
      <img
        src={podcast.image ?? FALLBACK_IMAGE}
        alt="podcast image"
        class={`${sizeClasses} rounded inline-block shadow shadow-gray-800`}
      />

      <span class={`text-${size} text-orange-300`}>{podcast.title ?? ""}</span>
    </A>
  );
}

const FALLBACK_IMAGE =
  "https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg";

function getGapClassFromSize(size: Size) {
  switch (size) {
    case "xs":
    case "sm":
      return "gap-4";
    case "md":
      return "gap-6";
    case "lg":
      return "gap-8";
  }
}

export function getWidthAndHeightClassesFromSize(size: Size) {
  switch (size) {
    case "xs":
      return "w-8 h-8";
    case "sm":
      return "w-12 h-12";
    case "md":
      return "w-16 h-16";
    case "lg":
      return "w-20 h-20";
  }
}
