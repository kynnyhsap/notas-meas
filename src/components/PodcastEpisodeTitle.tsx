import { A } from "@solidjs/router";
import { PodcastEpisodesRecord } from "~/xata";
import { truncate } from "~/utils/truncate";

export function PodcastEpisodeTitle({
  episode,
  size,
  truncateAfter = 500,
}: {
  episode: PodcastEpisodesRecord | null | undefined;
  size?: "xs" | "sm" | "md" | "lg";
  truncateAfter?: number;
}) {
  if (!episode) return null;

  return (
    <A href={`/podcasts/episodes/${episode.id}`}>
      <div
        class={`text-${size} text-purple-300 rounded p-2 border border-gray-800`}
      >
        {truncate(episode.title, truncateAfter)}
      </div>
    </A>
  );
}
