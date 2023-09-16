import { getXataClient, PodcastEpisodeNotesRecord } from "~/xata";
import server$ from "solid-start/server";
import { PodcastNote } from "~/components/PodcastNote";
import { PodcastNoteSkeleton } from "~/components/PodcastNoteSkeleton";
import { InfinitePages } from "~/components/InfinitePages";
import { SearchInput } from "~/components/SearchInput";
import { createSignal } from "solid-js";
import { PageHeading } from "~/components/PageHeading";
import { debounce } from "@solid-primitives/scheduled";

const PAGE_SIZE = 20;

const podcastNotesFetcher = server$(
  async ({ page, search }: { page: number; search?: string }) => {
    const xata = getXataClient();

    const { records } = await xata.db.PodcastEpisodeNotes.sort(
      "createdAt",
      "desc",
    )
      .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
      .filter({
        $any: {
          text: {
            $contains: search,
          },
          "podcastEpisode.podcast.title": {
            $contains: search,
          },
          "podcastEpisode.title": {
            $contains: search,
          },
        },
      })
      .getPaginated({
        pagination: {
          size: PAGE_SIZE,
          offset: page * PAGE_SIZE,
        },
      });

    return records as PodcastEpisodeNotesRecord[];
  },
);

export default function Home() {
  const [search, setSearch] = createSignal("");
  const debounced = debounce(setSearch, 300);

  return (
    <>
      {/*<A href="/stats">Stats</A>*/}

      <PageHeading>Feed</PageHeading>

      <div class="my-4">
        <SearchInput onInput={debounced} />
      </div>

      <InfinitePages
        fetcher={podcastNotesFetcher}
        search={search()}
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
