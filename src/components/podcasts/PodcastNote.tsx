import { PodcastEpisodeNotesRecord } from "~/xata";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/podcasts/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/podcasts/PodcastEpisodeTitle";
import { CopyableText } from "~/components/CopyableText";
import { Opaque } from "~/components/Opaque";

export function PodcastNote({
  podcastNote,
}: {
  podcastNote: PodcastEpisodeNotesRecord;
}) {
  return (
    <div class="my-24 flex flex-col gap-4">
      <Opaque>
        <PodcastImageWithTitle
          podcast={podcastNote?.podcastEpisode?.podcast}
          size="xs"
        />
      </Opaque>

      <Opaque>
        <PodcastEpisodeTitle
          episode={podcastNote?.podcastEpisode}
          truncateAfter={32}
          size="sm"
        />
      </Opaque>

      <div class="py-2">
        <CopyableText>{podcastNote?.text ?? ""}</CopyableText>
      </div>

      <div class="self-end">
        <Opaque>
          <Datetime date={podcastNote.createdAt} />
        </Opaque>
      </div>
    </div>
  );
}
