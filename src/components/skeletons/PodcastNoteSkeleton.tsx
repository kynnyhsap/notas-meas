import { DatetimeSkeleton } from "./DatetimeSkeleton";
import { PodcastEpisodeTitleSkeleton } from "./PodcastEpisodeTitleSkeleton";
import { PodcastTitleWithImageSkeleton } from "./PodcastTitleWithImageSkeleton";
import { NoteTextSkeleton } from "./NoteTextSkeleton";

export function PodcastNoteSkeleton() {
  return (
    <div class="animate-pulse my-16 cursor-pointer flex flex-col gap-4">
      <PodcastEpisodeTitleSkeleton />

      <PodcastTitleWithImageSkeleton />

      <NoteTextSkeleton />

      <div class="self-end">
        <DatetimeSkeleton />
      </div>
    </div>
  );
}
