import { createServerData$ } from "solid-start/server/browser";
import { getXataClient } from "~/xata";
import { useRouteData } from "@solidjs/router";

export function routeData() {
  return createServerData$(
    async () => {
      const xata = getXataClient();

      const [
        {
          aggs: { totalPodcasts },
        },
        {
          aggs: { totalPodcastEpisodes },
        },
        {
          aggs: { totalPodcastEpisodeNotes },
        },
      ] = await Promise.all([
        await xata.db.Podcasts.aggregate({
          totalPodcasts: { count: "*" },
        }),
        await xata.db.PodcastEpisodes.aggregate({
          totalPodcastEpisodes: { count: "*" },
        }),
        await xata.db.PodcastEpisodeNotes.aggregate({
          totalPodcastEpisodeNotes: { count: "*" },
        }),
      ]);

      return {
        totalPodcasts,
        totalPodcastEpisodes,
        totalPodcastEpisodeNotes,
      };
    },
    {
      initialValue: {
        totalPodcasts: 0,
        totalPodcastEpisodes: 0,
        totalPodcastEpisodeNotes: 0,
      },
    },
  );
}

export default function StatsPage() {
  const data = useRouteData<typeof routeData>();

  const { totalPodcasts, totalPodcastEpisodes, totalPodcastEpisodeNotes } =
    data() ?? {};

  return (
    <>
      <h1 class="font-bold text-2xl text-center mb-8">Stats</h1>

      <div class="text-center">
        <span class="font-bold text-red-300">
          {totalPodcastEpisodeNotes} notes
        </span>{" "}
        taken from{" "}
        <span class="font-bold text-green-300">
          {totalPodcastEpisodes} episodes
        </span>{" "}
        of <span class="font-bold text-blue-300">{totalPodcasts} podcasts</span>
      </div>
    </>
  );
}
