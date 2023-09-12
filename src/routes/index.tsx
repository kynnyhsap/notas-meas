import { getXataClient, PodcastEpisodeNotesRecord } from "~/xata";
import { useRouteData } from "solid-start";
import { For } from "solid-js";
import { PodcastNote } from "~/components/PodcastNote";
import { createServerData$ } from "solid-start/server";

export function routeData() {
  return createServerData$(
    async () => {
      const xata = getXataClient();

      const podcastNotes = (await xata.db.PodcastEpisodeNotes.sort(
        "createdAt",
        "desc",
      )
        .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
        .getMany()) as PodcastEpisodeNotesRecord[];

      return { podcastNotes };
    },
    {
      initialValue: { podcastNotes: [] },
    },
  );
}

export default function Home() {
  const feed = useRouteData<typeof routeData>();

  const { podcastNotes } = feed() ?? { notes: [], podcastNotes: [] };

  // TODO: loading skeletons

  return (
    <>
      <h1 class="font-bold text-xl text-center">Feed</h1>

      <For each={podcastNotes}>
        {(podcastNote) => <PodcastNote podcastNote={podcastNote} />}
      </For>
    </>
  );
}
