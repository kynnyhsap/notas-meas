import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/solid";
import { createSignal, For, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { A } from "solid-start";
import "./slide-fade.css";

const menuItems = [
  {
    name: "Podnotes",
    to: "/feed/podnotes",
  },
  {
    name: "Highlights",
    to: "/feed/highlights",
  },
  {
    name: "Stats",
    to: "/feed/stats",
  },
];

export function SideMenu() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <Transition name="slide-fade">
        <Show when={isOpen()}>
          <div class="fixed bg-blue-950 right-0 top-0 bottom-0 p-8 w-48">
            <div class="text-xl mb-10 font-bold">Notas Meas</div>

            <ul class="flex flex-col gap-8">
              <For each={menuItems}>
                {(menuItem) => (
                  <li>
                    <A
                      href={menuItem.to}
                      activeClass="text-white font-bold"
                      class="text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {menuItem.name}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>
      </Transition>

      <button
        class="fixed bottom-10 right-10 border rounded p-2 bg-dark"
        onClick={() => setIsOpen(!isOpen())}
      >
        <Icon path={isOpen() ? xMark : bars_3} class="w-6 h-6" />
      </button>
    </>
  );
}
