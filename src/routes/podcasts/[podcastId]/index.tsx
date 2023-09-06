import { createServerData$ } from "solid-start/server";
import { getXataClient, PodcastEpisodes, PodcastsRecord } from "~/xata";
import { useRouteData, RouteDataArgs } from "solid-start";
import { For } from "solid-js";
import { truncate } from "~/utils/truncate";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async (id) => {
      const xata = getXataClient();

      const [podcast, episodes] = await Promise.all([
        await xata.db.Podcasts.read(id),
        await xata.db.PodcastEpisodes.filter({
          "podcast.id": id,
        }).getAll(),
      ]);

      return { podcast, episodes };
    },
    {
      key: () => params.podcastId,
      initialValue: {
        podcast: null,
        episodes: [],
      },
    },
  );
}

export default function PodcastPage() {
  const data = useRouteData<typeof routeData>();
  const { podcast, episodes } = (data() ?? { podcast: {}, episodes: {} }) as {
    podcast: PodcastsRecord;
    episodes: PodcastEpisodes[];
  };

  return (
    <>
      <div class="flex items-center gap-4 my-8">
        <img
          src={podcast?.image ?? ""}
          alt={`"${podcast?.title}" podcast image.`}
          class="w-16 h-16 rounded-sm inline-block shadow shadow-gray-800"
        />

        <span>{podcast?.title}</span>
      </div>

      <For each={episodes}>
        {(episode) => (
          <div class="my-6 flex flex-col items-center gap-4">
            <span>{truncate(episode.title, 100)}</span>

            <div class="border border-gray-500 rounded w-[80%]" />
          </div>
        )}
      </For>
    </>
  );
}
