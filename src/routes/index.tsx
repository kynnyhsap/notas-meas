import { getXataClient } from "~/xata";
import { For } from "solid-js";
import { useRouteData, createRouteData } from "solid-start";
import { Note } from "~/routes/api/notes";

export function routeData() {
  return createRouteData(async () => {
    const xata = getXataClient();

    return (await xata.db.Notes.sort("createdAt", "desc")
      .select(["*"])
      .getAll()) as Note[];
  });
}

export default function Home() {
  const notes = useRouteData<typeof routeData>();

  return (
    <main>
      <h1>Home</h1>

      <For each={notes()}>{(note) => <div>{note.id}</div>}</For>
    </main>
  );
}
