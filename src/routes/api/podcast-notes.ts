import { json, type APIEvent } from "solid-start/api";
import { getXataClient } from "~/xata";

export async function GET() {
  const xata = getXataClient();

  return json(
    await xata.db.PodcastEpisodeNotes.sort("createdAt", "desc")
      .select(["*", "podcastEpisode.*", "podcastEpisode.podcast.*"])
      .getAll(),
  );
}

export type NewPodcastNote = {
  podcastTitle: string;
  episodeTitle: string;
  text: string;
};

const REQUIRED_FIELDS: (keyof NewPodcastNote)[] = [
  "podcastTitle",
  "episodeTitle",
  "text",
];

export async function POST({ request }: APIEvent) {
  const data: NewPodcastNote = await request.json();

  console.log("Received new podcast note:", data);

  if (!data.podcastTitle || !data.episodeTitle || !data.text) {
    const missingFields = REQUIRED_FIELDS.filter((field) => !data[field]);

    return json(
      {
        error: `Missing required fields: ${missingFields.join(", ")}`,
      },
      400,
    );
  }

  const xata = getXataClient();

  let podcast = await xata.db.Podcasts.filter({
    title: data.podcastTitle,
  }).getFirst();

  if (!podcast) {
    podcast = await xata.db.Podcasts.create({
      title: data.podcastTitle,
      // image: data.podcastImage,
    });
  }

  let podcastEpisode = await xata.db.PodcastEpisodes.filter({
    title: data.episodeTitle,
  }).getFirst();

  if (!podcastEpisode) {
    podcastEpisode = await xata.db.PodcastEpisodes.create({
      title: data.episodeTitle,
      podcast: podcast.id,
    });
  }

  const podcastEpisodeNote = await xata.db.PodcastEpisodeNotes.create({
    text: data.text,
    podcastEpisode: podcastEpisode.id,
    createdAt: new Date(),
  });

  console.log("Recorded new podcast note: ", podcastEpisodeNote);

  return json(podcastEpisodeNote);
}
