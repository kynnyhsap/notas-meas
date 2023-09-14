import server$ from "solid-start/server";
import { createResource, createSignal, For, Suspense } from "solid-js";

const jsonPostsFetcher = server$(async (page: number) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network latency

  const jsonPosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
  ).then((response) => response.json());

  return jsonPosts.slice(page * 30, (page + 1) * 30) as {
    id: string;
    title: string;
  }[];
});

export default function TestPage() {
  return (
    <>
      <h1 class="font-bold text-xl text-center">Test</h1>

      <Pages />
    </>
  );
}

function Pages() {
  const [current, setCurrent] = createSignal(0);

  const pages = () => Array.from(Array(current() + 1).keys());

  function loadNext() {
    setCurrent(current() + 1);
  }

  return (
    <For each={pages()}>
      {(p) => <Page page={p} onLoadMore={() => loadNext()} />}
    </For>
  );
}

function Page({ page, onLoadMore }: { page: number; onLoadMore(): void }) {
  const [data] = createResource(page, jsonPostsFetcher);

  const isLast = () => !data.loading && (data() ?? [])?.length === 0;

  return (
    <Suspense
      fallback={
        <div class="animate-pulse ">
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
          <div class="bg-gray-600 h-2 w-64 my-2" />
        </div>
      }
    >
      <For each={data()}>
        {(post) => (
          <div class="my-4">
            {post.id} - {post.title.slice(0, 20) + "..."}
          </div>
        )}
      </For>

      {isLast() && <div class="my-4">the last page</div>}

      {!isLast() && (
        <div class="my-4" onClick={onLoadMore}>
          load more
        </div>
      )}
    </Suspense>
  );
}
