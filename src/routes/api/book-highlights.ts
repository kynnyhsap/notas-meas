import { json } from "solid-start/api";
import { xata } from "~/xata";

export async function GET() {
  return json(
    await xata.db.BookHighlights.sort("createdAt", "desc")
      .select(["*"])
      .getAll(),
  );
}
