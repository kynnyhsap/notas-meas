import dayjs from "dayjs";
import { PodcastEpisodeNotesRecord } from "~/xata";
import { A } from "@solidjs/router";

export function PodcastNote({
  podcastNote,
}: {
  podcastNote: PodcastEpisodeNotesRecord;
}) {
  const date = dayjs(podcastNote?.createdAt).format("MMM D, hh:mm");

  const image =
    podcastNote.podcastEpisode?.podcast?.image ??
    "https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg";

  const podcastTitle = formatPodcastTitle(
    podcastNote.podcastEpisode?.podcast?.title ?? "",
  );

  const episodeTitle = podcastNote.podcastEpisode?.title ?? "";

  return (
    <div class="my-16 pl-4 border-l-2 border-gray-400 cursor-pointer flex flex-col gap-4">
      <A href={`/podcasts/episodes/${podcastNote.podcastEpisode?.id}`}>
        <span class="text-xs text-gray-300">{episodeTitle}</span>
      </A>

      <A href={`/podcasts/${podcastNote.podcastEpisode?.podcast?.id}`}>
        <img
          src={image}
          class="w-6 h-6 rounded-sm inline-block mr-2"
          alt="pocast image"
        />

        <span class="text-xs text-gray-500">{podcastTitle}</span>
      </A>

      <span class="py-6">{podcastNote.text}</span>

      <span class="self-end text-xs text-gray-500">{date}</span>
    </div>
  );
}

function formatPodcastTitle(title: string) {
  return title.replace(" (🔓 for Andriy Pashynnyk)", ""); // this postfix is added by the private podcasts feeds
}
