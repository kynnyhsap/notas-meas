import server$ from "solid-start/server";
import { getXataClient } from "~/xata";
import { createResource, For } from "solid-js";
import { Datetime } from "~/components/Datetime";
import { PodcastImageWithTitle } from "~/components/PodcastImageWithTitle";
import { PodcastEpisodeTitle } from "~/components/PodcastEpisodeTitle";
import { PageHeading } from "~/components/PageHeading";
import { useParams } from "solid-start";
import { wait } from "~/utils/wait";

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

  return (
    <>
      <PageHeading>Podcast Episode</PageHeading>

      <div class="my-4">
        <PodcastImageWithTitle podcast={podcast()} size="sm" />
      </div>

      <div class="my-4">
        <PodcastEpisodeTitle episode={episode()} size="md" />
      </div>

      <ol class="relative border-l border-gray-700 ml-4">
        <For each={notes()}>
          {(note) => (
            <li class=" ml-4">
              <div class="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>

              <Datetime date={note.createdAt} />

              <p class="my-4 font-normal">{note.text}</p>
            </li>
          )}
        </For>
      </ol>
    </>
  );
}
