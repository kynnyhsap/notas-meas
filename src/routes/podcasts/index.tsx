import { getXataClient, PodcastsRecord } from "~/xata";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";

export function routeData() {
  return createServerData$(
    async () => {
      const xata = getXataClient();

      const podcasts: PodcastsRecord[] = await xata.db.Podcasts.getAll();

      // sort podcasts by latest episode
      const sortedPodcasts = (
        await Promise.all(
          podcasts.map(async (podcast) => {
            const latestEpisode = await xata.db.PodcastEpisodes.filter({
              "podcast.id": podcast.id,
            })
              .sort("xata.createdAt", "desc")
              .getFirst();

            return {
              podcast,
              latestEpisode,
            };
          }),
        )
      )
        .sort((a, b) => {
          const aDate = a.latestEpisode?.xata.createdAt ?? new Date();
          const bDate = b.latestEpisode?.xata.createdAt ?? new Date();

          return aDate > bDate ? -1 : 1;
        })
        .map(({ podcast }) => podcast);

      return { podcasts: sortedPodcasts };
    },
    {
      key: "podcasts",
      initialValue: { podcasts: [] },
    },
  );
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
              <PodcastImageWithTitle podcast={podcast} size="lg" />
            </div>
          </A>
        )}
      </For>
    </>
  );
}
