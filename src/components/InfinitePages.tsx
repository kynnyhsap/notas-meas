import { JSX } from "solid-js/types/jsx";
import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { VisibleOnce } from "./VisibleOnce";

export function InfinitePages<Item>({
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

  return (
    <Suspense fallback={fallback}>
      <For each={data()}>
        {(element, index) => (
          <Show
            when={index() !== (data() ?? []).length - 1}
            fallback={
              <VisibleOnce onVisibleOnce={onLoadMore}>
                {item(element)}
              </VisibleOnce>
            }
          >
            {item(element)}
          </Show>
        )}
      </For>
    </Suspense>
  );
}
