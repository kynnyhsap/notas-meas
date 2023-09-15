import { createServerData$ } from "solid-start/server";
import { getXataClient } from "~/xata";
import { useRouteData, RouteDataArgs } from "solid-start";
import { For } from "solid-js";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/PodcastEpisodeTitle";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async (id) => {
      const xata = getXataClient();

      const [episode, notes] = await Promise.all([
        await xata.db.PodcastEpisodes.read(id, ["podcast.*", "*"]),
        await xata.db.PodcastEpisodeNotes.filter({
          "podcastEpisode.id": id,
        })
          .sort("xata.createdAt", "desc")
          .getAll(),
      ]);

      return { episode, notes };
    },
    {
      key: () => params.id,
      initialValue: {
        episode: null,
        notes: [],
      },
    },
  );
}

export default function PodcastEpisodePage() {
  const data = useRouteData<typeof routeData>();

  return (
    <>
      <h1 class="font-bold text-xl text-center">Episode</h1>

      <div class="my-4">
        <PodcastImageWithTitle podcast={data()?.episode?.podcast} size="sm" />
      </div>

      <div class="my-4">
        <PodcastEpisodeTitle episode={data()?.episode} size="md" />
      </div>

      <ol class="relative border-l border-gray-700 ml-4">
        <For each={data()?.notes}>
          {(note) => (
            <li class=" ml-4">
              <div class="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>

              <Datetime date={note.createdAt} />

              <p class="my-4 font-normal">{note.text}</p>
            </li>
          )}
        </For>
      </ol>
    </>
  );
}
