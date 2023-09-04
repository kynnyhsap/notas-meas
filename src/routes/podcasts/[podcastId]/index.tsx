import { A, useParams } from "@solidjs/router";

export default function PodcastId() {
  const params = useParams();

  return (
    <>
      <A href="/podcasts">Back to podcasts</A>

      <h1>{params.podcastId}</h1>
    </>
  );
}
