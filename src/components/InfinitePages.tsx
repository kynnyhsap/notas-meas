import { JSX } from "solid-js/types/jsx";
import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { VisibleOnce } from "./VisibleOnce";

export type PageFetcher<Item> = (args: {
  page: number;
  search?: string;
}) => Promise<Item[]>;

export function InfinitePages<Item>(props: {
  fallback?: JSX.Element;
  search?: string;
  children(item: Item): JSX.Element;
  fetcher: PageFetcher<Item>;
}) {
  const [current, setCurrent] = createSignal(0);

  const pages = () => Array.from(Array(current() + 1).keys());

  function loadNext() {
    setCurrent(current() + 1);
  }

  return (
    <>
      <For each={pages()}>
        {(p) => (
          <Page
            page={p}
            fallback={props.fallback}
            search={props.search}
            onLoadMore={() => loadNext()}
            fetcher={props.fetcher}
            item={props.children}
          />
        )}
      </For>
    </>
  );
}

function Page<Item>(props: {
  fallback?: JSX.Element;
  item(item: Item): JSX.Element;
  search?: string;
  page: number;
  onLoadMore(): void;
  fetcher: PageFetcher<Item>;
}) {
  const source = () => ({
    search: props.search,
    page: props.page,
  });

  const [data] = createResource(source, props.fetcher);

  return (
    <Suspense fallback={props.fallback}>
      <For each={data()}>
        {(element, index) => (
          <Show
            when={index() !== (data() ?? []).length - 1}
            fallback={
              <VisibleOnce onVisibleOnce={props.onLoadMore}>
                {props.item(element)}
              </VisibleOnce>
            }
          >
            {props.item(element)}
          </Show>
        )}
      </For>
    </Suspense>
  );
}
