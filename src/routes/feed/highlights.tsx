import { PageHeading } from "~/components/PageHeading";
import { createSignal } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { SearchInput } from "~/components/SearchInput";
import { InfinitePages } from "~/components/InfinitePages";
import server$ from "solid-start/server";
import { BookHighlightsRecord, getXataClient } from "~/xata";
import { BookHighlight } from "~/components/books/BookHighlight";
import { BookHighlightSkeleton } from "~/components/skeletons/BookHighlightSkeleton";
import { Icon } from "solid-heroicons";
import { arrowPath } from "solid-heroicons/solid";

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

      <div class="my-8 flex justify-between items-center gap-2">
        <SearchInput onInput={debounced} />
        <SyncHighlightsButton />
      </div>

      <InfinitePages
        fetcher={bookHighlightsFetcher}
        search={search()}
        fallback={
          <div>
            <BookHighlightSkeleton />
            <BookHighlightSkeleton />
            <BookHighlightSkeleton />
            <BookHighlightSkeleton />
            <BookHighlightSkeleton />
          </div>
        }
      >
        {(highlight) => <BookHighlight highlight={highlight} />}
      </InfinitePages>
    </div>
  );
}

function SyncHighlightsButton() {
  const [syncing, setSyncing] = createSignal(false);

  async function sync() {
    if (syncing()) return;

    setSyncing(true);
    try {
      await fetch("/api/sync-highlights");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <button
      class="bg-green-700 rounded px-2 py-2 flex items-center gap-2"
      onClick={() => sync()}
    >
      <Icon path={arrowPath} class={`w-6 ${syncing() ? "animate-spin" : ""}`} />
    </button>
  );
}
