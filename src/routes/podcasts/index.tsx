import { getXataClient, PodcastsRecord } from "~/xata";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { For } from "solid-js";
import { A } from "@solidjs/router";

export function routeData() {
  return createServerData$(
    async () => {
      const xata = getXataClient();

      const podcasts: PodcastsRecord[] = await xata.db.Podcasts.getAll(); // TODO: .sort("lastAddedNoteAt", "desc")

      return { podcasts };
    },
    {
      key: "podcasts",
      initialValue: { podcasts: [] },
    },
  );
}

export function getPodcastImage(image: string | null | undefined) {
  return (
    image ??
    "https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg"
  );
}

export function formatPodcastTitle(title: string | null | undefined) {
  return title?.replace(" (🔓 for Andriy Pashynnyk)", ""); // this postfix is added by the private podcasts feeds
}

export default function Podcasts() {
  const data = useRouteData<typeof routeData>();

  const { podcasts } = data() ?? { podcasts: [] };

  return (
    <>
      <h1 class="font-bold text-xl text-center">Podcasts</h1>

      <For each={podcasts}>
        {(podcast) => (
          <A href={`/podcasts/${podcast.id}`} class="cursor-pointer">
            <div class="flex items-center gap-4 my-8">
              <img
                src={getPodcastImage(podcast.image)}
                alt={`"${podcast.title}" podcast image.`}
                class="w-16 h-16 rounded-sm inline-block shadow shadow-gray-800"
              />

              <span>{formatPodcastTitle(podcast.title)}</span>
            </div>
          </A>
        )}
      </For>
    </>
  );
}
