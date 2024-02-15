import tippy, { Instance } from "tippy.js";
import { TwitterIcon } from "~/components/TwitterIcon";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./tippy.theme.css";

export function CopyAsTweetButton(props: { text: string }) {
  let tooltip: Instance;

  async function onClick() {
    // @ts-ignore
    await navigator.clipboard.writeText(props.text);

    tooltip.show();

    const timeoutId = setTimeout(() => {
      tooltip.hide();
      clearTimeout(timeoutId);
    }, 1000);
  }

  return (
    <button
      onClick={onClick}
      class="flex justify-center items-center gap-1 px-4 py-2 rounded-md border border-[#1DA1F2] text-[#1DA1F2] bg-background"
      ref={(el: any) => {
        // @ts-ignore
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
      <TwitterIcon />
      Copy as Tweet
    </button>
  );
}
