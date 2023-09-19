import tippy, { Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./tippy.theme.css";

export function CopyableText({ children }: { children: string }) {
  let tooltip: Instance;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(children);

    tooltip.show();

    const timeoutId = setTimeout(() => {
      tooltip.hide();
      clearTimeout(timeoutId);
    }, 1000);
  }

  return (
    <span
      onClick={copyToClipboard}
      ref={(el) => {
        tooltip = tippy(el, {
          content: "Copied to clipboard",
          animation: "scale",
          placement: "bottom",
          trigger: "manual",
          theme: "custom",
          duration: 300,
        });
      }}
    >
      {children}
    </span>
  );
}
