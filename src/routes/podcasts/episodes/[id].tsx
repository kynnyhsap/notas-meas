import server$ from "solid-start/server";
import { getXataClient } from "~/xata";
import { createResource, For } from "solid-js";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/podcasts/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/podcasts/PodcastEpisodeTitle";
import { PageHeading } from "~/components/PageHeading";
import { useParams } from "solid-start";
import { wait } from "~/utils/wait";
import { CopyableText } from "~/components/CopyableText";
import { CopyAsTweetButton } from "~/components/CopyAsTweetButton";

const episodeFetcher = server$(async (id) => {
  const xata = getXataClient();

  await wait(1000);

  return await xata.db.PodcastEpisodes.read(id, ["podcast.*", "*"]);
});

const notesFetcher = server$(async (id) => {
  const xata = getXataClient();

  return await xata.db.PodcastEpisodeNotes.filter({
    "podcastEpisode.id": id,
  })
    .sort("xata.createdAt", "desc")
    .getAll();
});

export default function PodcastEpisodePage() {
  const params = useParams<{ id: string }>();

  const [episode] = createResource(() => params.id, episodeFetcher);
  const [notes] = createResource(() => params.id, notesFetcher);

  const podcast = () => episode()?.podcast;

  const episodeTitle = () => episode()?.title;
  const podcastTwitterHandle = () => podcast()?.twitterHandle;

  const notesText = () =>
    notes()
      ?.map((note) => note.text)
      .reverse()
      .join("\n\n");

  const tweetText = () =>
    `notes from recent @${podcastTwitterHandle()} episode - ${episodeTitle()}:

${notesText()}`;

  return (
    <>
      <PageHeading>Podcast Episode</PageHeading>

      <div class="my-4">
        <PodcastImageWithTitle podcast={podcast()} size="sm" />
      </div>

      <div class="my-4">
        <PodcastEpisodeTitle episode={episode()} size="md" />
      </div>

      <div class="my-8 flex items-center justify-center">
        <CopyAsTweetButton text={tweetText()} />
      </div>

      <ol class="relative border-l border-gray-700 ml-4">
        <For each={notes()}>
          {(note) => (
            <li class=" ml-4">
              <div class="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>

              <Datetime date={note.createdAt} />

              <p class="my-4 font-normal">
                <CopyableText>{note.text ?? ""}</CopyableText>
              </p>
            </li>
          )}
        </For>
      </ol>
    </>
  );
}
