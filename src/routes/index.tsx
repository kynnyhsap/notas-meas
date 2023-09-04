import { getXataClient, NotesRecord, PodcastEpisodeNotesRecord } from "~/xata";
import { useRouteData } from "solid-start";
import { For } from "solid-js";
import { Note } from "~/components/Note";
import { PodcastNote } from "~/components/PodcastNote";
import { createServerData$ } from "solid-start/server";

export function routeData() {
  return createServerData$(
    async () => {
      const xata = getXataClient();

      const [notes, podcastNotes] = await Promise.all([
        (await xata.db.Notes.sort("createdAt", "desc")
          .select(["*"])
          .getAll()) as NotesRecord[],

        (await xata.db.PodcastEpisodeNotes.sort("createdAt", "desc")
          .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
          .getAll()) as PodcastEpisodeNotesRecord[],
      ]);

      return { notes, podcastNotes };
    },
    {
      initialValue: { notes: [], podcastNotes: [] },
    },
  );
}

export default function Home() {
  const feed = useRouteData<typeof routeData>();

  const { notes, podcastNotes } = feed() ?? { notes: [], podcastNotes: [] };

  // TODO: loading skeletons

  return (
    <>
      <h1 class="font-bold text-xl text-center">Feed</h1>

      <For each={podcastNotes}>
        {(podcastNote) => <PodcastNote podcastNote={podcastNote} />}
      </For>

      <For each={notes}>{(note) => <Note note={note} />}</For>
    </>
  );
}
