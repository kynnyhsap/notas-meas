import { APIEvent, json } from "solid-start/api";
import { getXataClient } from "~/xata";
import { NewPodcastNote } from "~/routes/api/podcast-notes";

export async function GET() {
  const xata = getXataClient();

  return json(
    await xata.db.Notes.sort("createdAt", "desc").select(["*"]).getAll(),
  );
}

export type Note = {
  id: string;
  text: string;
  createdAt: Date;
};

export async function POST({ request }: APIEvent) {
  const data = await request.json();

  console.log("Received new note:", data);

  if (!data.text) {
    return json(
      {
        error: `Missing required field "text"`,
      },
      400,
    );
  }

  const xata = getXataClient();

  const note = await xata.db.Notes.create({
    text: data.text,
  });

  console.log("Recorded note: ", note);

  return json(note);
}
