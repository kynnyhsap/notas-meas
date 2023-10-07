import { json } from "solid-start";
import { syncReadwiseToXata } from "~/sync-readwise-to-xata";

export async function GET() {
  const result = await syncReadwiseToXata();

  return json(result);
}
