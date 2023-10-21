import tippy, { Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./tippy.theme.css";

export function CopyableText({
  children,
  ...props
}: {
  children: string;
  class?: string;
}) {
  let tooltip: Instance;

  async function copyToClipboard() {
    // @ts-ignore
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
      {...props}
    >
      {children}
    </span>
  );
}
