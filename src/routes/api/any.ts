import { APIEvent, json } from "solid-start";

export async function POST({ request }: APIEvent) {
  const data = await request.json();

  console.log({ data });

  return json(data);
}
