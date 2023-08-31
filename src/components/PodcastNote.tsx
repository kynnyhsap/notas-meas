import { PodcastEpisodeNotesRecord } from "~/xata";
import dateFormat from "dateformat";
import { createSignal, Show } from "solid-js";

const MAX_EPISODE_TITLE_LENGTH = 80; // statically, 90% of the titles in my db are shorter than 80 chars

export function PodcastNote({
  podcastNote,
}: {
  podcastNote: PodcastEpisodeNotesRecord;
}) {
  const date = podcastNote.createdAt
    ? dateFormat(podcastNote?.createdAt, "mmm d, HH:MM")
    : "";

  const image =
    podcastNote.podcastEpisode?.podcast?.image ??
    "https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg";

  const podcastTitle = formatPodcastTitle(
    podcastNote.podcastEpisode?.podcast?.title ?? "",
  );

  const episodeTitle = podcastNote.podcastEpisode?.title ?? "";
  const isLongEpisodeTitle = episodeTitle.length > MAX_EPISODE_TITLE_LENGTH;
  const truncatedEpisodeTitle = episodeTitle.slice(0, MAX_EPISODE_TITLE_LENGTH);

  const [episodeTitleExpanded, setEpisodeTitleExpanded] = createSignal(
    !isLongEpisodeTitle,
  );

  return (
    <div class="my-10 pl-4 border-l-2 border-gray-400 cursor-pointer flex flex-col gap-4">
      <span class="text-xs text-gray-300">
        <Show
          when={episodeTitleExpanded()}
          fallback={
            <>
              {truncatedEpisodeTitle}...{" "}
              <span
                class="text-xs text-blue-400"
                onClick={() => {
                  setEpisodeTitleExpanded(!episodeTitleExpanded());
                }}
              >
                more
              </span>
            </>
          }
        >
          {episodeTitle}
        </Show>
      </span>

      <div>
        <img
          src={image}
          class="w-6 h-6 rounded-sm inline-block mr-2"
          alt="pocast image"
        />

        <span class="text-xs text-gray-500">{podcastTitle}</span>
      </div>

      <span>{podcastNote.text}</span>

      <span class="self-end text-xs text-gray-500">{date}</span>
    </div>
  );
}

function formatPodcastTitle(title: string) {
  return title.replace(" (🔓 for Andriy Pashynnyk)", ""); // this postfix is added by the private podcasts feeds
}
