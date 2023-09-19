import { PodcastEpisodeNotesRecord } from "~/xata";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/PodcastEpisodeTitle";

import { CopyableText } from "~/components/CopyableText";

export function PodcastNote({
  podcastNote,
}: {
  podcastNote: PodcastEpisodeNotesRecord;
}) {
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
        <CopyableText>{podcastNote?.text ?? ""}</CopyableText>
      </div>

      <Datetime date={podcastNote.createdAt} />
    </div>
  );
}
