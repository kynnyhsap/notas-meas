import { PodcastEpisodeNotesRecord } from "~/xata";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/PodcastEpisodeTitle";

import tippy from "tippy.js";
import "./tippy-teme.css";

export function PodcastNote({
  podcastNote,
}: {
  podcastNote: PodcastEpisodeNotesRecord;
}) {
  const text = podcastNote?.text ?? "";

  function copyToClipboard() {
    return navigator.clipboard.writeText(text);
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
              content: "Copied to clipboard!",
              trigger: "click",
              placement: "bottom",
              arrow: true,
              animation: "scale",
              theme: "custom",
              delay: [0, 1000],
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
