import { createServerData$ } from "solid-start/server";
import { getXataClient, PodcastEpisodesRecord, PodcastsRecord } from "~/xata";
import { useRouteData, RouteDataArgs } from "solid-start";
import { For } from "solid-js";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/PodcastEpisodeTitle";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async (id) => {
      const xata = getXataClient();

      const [podcast, episodes] = await Promise.all([
        await xata.db.Podcasts.read(id),

        await xata.db.PodcastEpisodes.filter({
          "podcast.id": id,
        })
          .sort("xata.createdAt", "desc")
          .getAll(),
      ]);

      return { podcast, episodes };
    },
    {
      key: () => params.id,
      initialValue: {
        podcast: null,
        episodes: [],
      },
    },
  );
}

export default function PodcastPage() {
  const data = useRouteData<typeof routeData>();

  const podcast = () => data()?.podcast as PodcastsRecord;
  const episodes = () => data()?.episodes ?? ([] as PodcastEpisodesRecord[]);

  return (
    <>
      <h1 class="font-bold text-xl text-center">Podcast</h1>

      <div class="my-4">
        <PodcastImageWithTitle podcast={podcast()} size="lg" />
      </div>

      {/*  TODO: stats about this podcast */}

      <For each={episodes()}>
        {(episode) => (
          <div class="my-8">
            <PodcastEpisodeTitle
              episode={episode}
              truncateAfter={100}
              size="md"
            />
          </div>
        )}
      </For>
    </>
  );
}
