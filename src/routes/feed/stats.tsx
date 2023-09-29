import { createServerData$ } from "solid-start/server/browser";
import { getXataClient } from "~/xata";
import { useRouteData } from "@solidjs/router";
import { PageHeading } from "~/components/PageHeading";

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

  return (
    <>
      <PageHeading>Stats</PageHeading>

      <div class="text-center">
        <span class="font-bold text-red-300">
          {data()?.totalPodcastEpisodeNotes} notes
        </span>{" "}
        taken from{" "}
        <span class="font-bold text-green-300">
          {data()?.totalPodcastEpisodes} episodes
        </span>{" "}
        of{" "}
        <span class="font-bold text-blue-300">
          {data()?.totalPodcasts} podcasts
        </span>
      </div>
    </>
  );
}
