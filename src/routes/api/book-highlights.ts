import { json } from "solid-start/api";
import { getXataClient } from "~/xata";

export async function GET() {
  const xata = getXataClient();

  return json(
    await xata.db.BookHighlights.sort("createdAt", "desc")
      .select(["*"])
      .getAll(),
  );
}
