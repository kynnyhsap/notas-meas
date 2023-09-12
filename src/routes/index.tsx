import { getXataClient, PodcastEpisodeNotesRecord } from "~/xata";
import server$ from "solid-start/server";
import { createResource, For, Show, createEffect, Suspense } from "solid-js";
import { PodcastNote } from "~/components/PodcastNote";
import { PodcastNoteSkeleton } from "~/components/PodcastNoteSkeleton";

const fetchPodcastNotes = server$(async () => {
  const xata = getXataClient();

  const { records } = await xata.db.PodcastEpisodeNotes.sort(
    "createdAt",
    "desc",
  )
    .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
    .getPaginated();

  return records as PodcastEpisodeNotesRecord[];
});

export default function Home() {
  const [data] = createResource(fetchPodcastNotes);

  return (
    <>
      <h1 class="font-bold text-xl text-center">Feed</h1>

      <Suspense
        fallback={
          <div>
            <PodcastNoteSkeleton />
            <PodcastNoteSkeleton />
            <PodcastNoteSkeleton />
          </div>
        }
      >
        <For each={data()}>
          {(podcastNote) => <PodcastNote podcastNote={podcastNote} />}
        </For>
      </Suspense>
    </>
  );
}
