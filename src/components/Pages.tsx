import { JSX } from "solid-js/types/jsx";
import { createResource, createSignal, For, Suspense } from "solid-js";

export function Pages<Item>({
  children,
  fallback,
  fetcher,
}: {
  fallback?: JSX.Element;
  children(item: Item): JSX.Element;
  fetcher(page: number): Promise<Item[]>;
}) {
  const [current, setCurrent] = createSignal(0);

  const pages = () => Array.from(Array(current() + 1).keys());

  function loadNext() {
    setCurrent(current() + 1);
  }

  return (
    <For each={pages()}>
      {(p) => (
        <Page
          fallback={fallback}
          page={p}
          onLoadMore={() => loadNext()}
          fetcher={fetcher}
          item={children}
        />
      )}
    </For>
  );
}

function Page<Item>({
  fallback,
  item,
  page,
  onLoadMore,
  fetcher,
}: {
  fallback?: JSX.Element;
  item(item: Item): JSX.Element;
  page: number;
  onLoadMore(): void;
  fetcher: (page: number) => Promise<Item[]>;
}) {
  const [data] = createResource(page, fetcher);

  const isLast = () => !data.loading && (data() ?? [])?.length === 0;

  const [loadedMore, setLoadedMore] = createSignal(false);

  return (
    <Suspense fallback={fallback}>
      <For each={data()}>{item}</For>

      {!isLast() && !loadedMore() && (
        <div class="my-4 flex items-center justify-center">
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={async () => {
              onLoadMore();
              setLoadedMore(true);
            }}
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              load more
            </span>
          </button>
        </div>
      )}
    </Suspense>
  );
}
