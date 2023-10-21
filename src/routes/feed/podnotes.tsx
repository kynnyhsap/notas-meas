import server$ from "solid-start/server";
import { getXataClient, PodcastEpisodeNotesRecord } from "~/xata";
import { createSignal } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { PageHeading } from "~/components/PageHeading";
import { SearchInput } from "~/components/SearchInput";
import { InfinitePages } from "~/components/InfinitePages";
import { PodcastNoteSkeleton } from "~/components/skeletons/PodcastNoteSkeleton";
import { PodcastNote } from "~/components/podcasts/PodcastNote";

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

export default function Podnotes() {
  const [search, setSearch] = createSignal("");
  const debounced = debounce(setSearch, 300);

  return (
    <div>
      <PageHeading>Podnotes</PageHeading>

      <div class="my-16">
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
    </div>
  );
}
