import { A } from "@solidjs/router";
import { PodcastEpisodesRecord } from "~/xata";
import { truncate } from "~/utils/truncate";
import { Size } from "~/components/size";

export function PodcastEpisodeTitle(props: {
  episode: PodcastEpisodesRecord | null | undefined;
  size: Size;
  truncateAfter?: number;
}) {
  return (
    <A href={`/podcasts/episodes/${props.episode?.id}`}>
      <div
        class={`text-${props.size} text-purple-300 rounded p-2 border border-gray-800`}
      >
        {truncate(props.episode?.title, props.truncateAfter ?? 500)}
      </div>
    </A>
  );
}
