import { getXataClient, NotesRecord, PodcastEpisodeNotesRecord } from "~/xata";
import { useRouteData, createRouteData } from "solid-start";
import { For } from "solid-js";
import { Note } from "~/components/Note";
import { PodcastNote } from "~/components/PodcastNote";

export function routeData() {
  return createRouteData(async () => {
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
  });
}

export default function Home() {
  const feed = useRouteData<typeof routeData>();

  const { notes, podcastNotes } = feed() ?? { notes: [], podcastNotes: [] };

  return (
    <main>
      <div class="mx-auto my-8 w-80">
        <For each={podcastNotes}>
          {(podcastNote) => <PodcastNote podcastNote={podcastNote} />}
        </For>

        <For each={notes}>{(note) => <Note note={note} />}</For>
      </div>
    </main>
  );
}
