import server$ from "solid-start/server";
import { InfinitePages } from "~/components/InfinitePages";

interface Post {
  id: string;
  title: string;
}

const jsonPostsFetcher = server$(async (page: number) => {
  const jsonPosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((response) => response.json());

  return jsonPosts.slice(page * 30, (page + 1) * 30) as Post[];
});

export default function TestPage() {
  return (
    <>
      <h1 class="font-bold text-xl text-center">Test</h1>

      <InfinitePages
        fetcher={jsonPostsFetcher}
        fallback={
          <div class="animate-pulse ">
            <div class="bg-gray-600 h-2 w-64 my-2" />
            <div class="bg-gray-600 h-2 w-64 my-2" />
            <div class="bg-gray-600 h-2 w-64 my-2" />
          </div>
        }
      >
        {(item) => <div class="my-4">{item.id}</div>}
      </InfinitePages>
    </>
  );
}
