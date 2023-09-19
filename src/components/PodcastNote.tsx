import { PodcastEpisodeNotesRecord } from "~/xata";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/PodcastEpisodeTitle";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "./tippy.theme.css";

export function PodcastNote({
  podcastNote,
}: {
  podcastNote: PodcastEpisodeNotesRecord;
}) {
  const text = podcastNote?.text ?? "";

  async function copyToClipboard() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div class="my-16 pl-4 border-l-2 border-gray-400 flex flex-col gap-4">
      <PodcastEpisodeTitle
        episode={podcastNote?.podcastEpisode}
        truncateAfter={80}
        size="sm"
      />

      <PodcastImageWithTitle
        podcast={podcastNote?.podcastEpisode?.podcast}
        size="xs"
      />

      <div class="py-6">
        <span
          onClick={copyToClipboard}
          ref={(el) => {
            tippy(el, {
              content: "Copied to clipboard",
              delay: [200, 1000],
              animation: "scale",
              placement: "bottom",
              trigger: "click",
              theme: "custom",
            });
          }}
        >
          {text}
        </span>
      </div>

      <Datetime date={podcastNote.createdAt} />
    </div>
  );
}
