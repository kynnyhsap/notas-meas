import { A, Outlet } from "solid-start";
import { For } from "solid-js";

export default function Feed() {
  return (
    <div>
      <Outlet />

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const tabs = ["Stats", "Podnotes", "Highlights"];

  return (
    <div class="fixed bottom-0 left-0 right-0 backdrop-blur flex items-center justify-around p-2">
      <For each={tabs}>
        {(tab) => (
          <A
            href={`/feed/${tab.toLowerCase()}`}
            activeClass="text-white"
            class={"p-2 text-gray-600 "}
          >
            {tab}
          </A>
        )}
      </For>
    </div>
  );
}
