import { PageHeading } from "~/components/PageHeading";
import { createSignal } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { SearchInput } from "~/components/SearchInput";
import { InfinitePages } from "~/components/InfinitePages";
import server$ from "solid-start/server";
import { BookHighlightsRecord, getXataClient } from "~/xata";
import { Highlight } from "~/components/books/Highlight";
import { HighlightSkeleton } from "~/components/books/HighlightSkeleton";

const PAGE_SIZE = 20;

const bookHighlightsFetcher = server$(
  async ({ page, search }: { page: number; search?: string }) => {
    const xata = getXataClient();

    const { records } = await xata.db.BookHighlights.sort(
      "highlightedAt",
      "desc",
    )
      .select(["*", "book.*"])
      .filter({
        $any: {
          text: {
            $contains: search,
          },
          note: {
            $contains: search,
          },
          "book.title": {
            $contains: search,
          },
          "book.author": {
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

    return records as BookHighlightsRecord[];
  },
);

export default function Highlights() {
  const [search, setSearch] = createSignal("");
  const debounced = debounce(setSearch, 300);

  return (
    <div>
      <PageHeading>Highlights</PageHeading>

      <div class="my-8">
        <SearchInput onInput={debounced} />
      </div>

      <InfinitePages
        fetcher={bookHighlightsFetcher}
        search={search()}
        fallback={
          <div>
            <HighlightSkeleton />
            <HighlightSkeleton />
            <HighlightSkeleton />
          </div>
        }
      >
        {(highlight) => <Highlight highlight={highlight} />}
      </InfinitePages>
    </div>
  );
}
