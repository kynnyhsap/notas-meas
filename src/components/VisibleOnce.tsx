import { JSX } from "solid-js/types/jsx";
import { isServer } from "solid-js/web";
import { createSignal } from "solid-js";

export function VisibleOnce({
  onVisibleOnce,
  children,
}: {
  onVisibleOnce(): void;
  children: JSX.Element;
}) {
  const [viewedOnce, setViewedOnce] = createSignal(false);

  let observer = isServer
    ? null
    : new IntersectionObserver((entries) => {
        if (!viewedOnce() && entries[0].isIntersecting) {
          setViewedOnce(true);

          onVisibleOnce();

          observer?.disconnect();
        }
      });

  return (
    <div
      ref={(el) => {
        observer?.observe(el);
      }}
    >
      {children}
    </div>
  );
}
