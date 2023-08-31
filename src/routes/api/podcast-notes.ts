import { json } from "solid-start/api";
import { xata } from "~/xata";

export async function GET() {
  return json(
    await xata.db.PodcastEpisodeNotes.sort("createdAt", "desc")
      .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
      .getAll(),
  );
}
