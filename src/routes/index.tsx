import { getXataClient, PodcastEpisodeNotesRecord } from "~/xata";
import server$ from "solid-start/server";
import { PodcastNote } from "~/components/PodcastNote";
import { PodcastNoteSkeleton } from "~/components/PodcastNoteSkeleton";
import { InfinitePages } from "~/components/InfinitePages";

const PAGE_SIZE = 20;

const podcastNotesFetcher = server$(async (page: number) => {
  const xata = getXataClient();

  const { records } = await xata.db.PodcastEpisodeNotes.sort(
    "createdAt",
    "desc",
  )
    .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
    .getPaginated({
      pagination: {
        size: PAGE_SIZE,
        offset: page * PAGE_SIZE,
      },
    });

  return records as PodcastEpisodeNotesRecord[];
});

export default function Home() {
  return (
    <>
      <h1 class="font-bold text-xl text-center">Feed</h1>

      <InfinitePages
        fetcher={podcastNotesFetcher}
        fallback={
          <div>
            <PodcastNoteSkeleton />
            <PodcastNoteSkeleton />
            <PodcastNoteSkeleton />
            <PodcastNoteSkeleton />
            <PodcastNoteSkeleton />
          </div>
        }
      >
        {(podcastNote) => <PodcastNote podcastNote={podcastNote} />}
      </InfinitePages>
    </>
  );
}
