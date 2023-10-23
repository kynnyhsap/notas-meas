import { BookHighlightsRecord } from "~/xata";
import { CopyableText } from "~/components/CopyableText";
import { Datetime } from "~/components/Datetime";
import { Opaque } from "~/components/Opaque";
import { Show } from "solid-js";
import { BookAuthor } from "~/components/books/BookAuthor";
import { BookTitle } from "~/components/books/BookTitle";

export function Highlight(props: { highlight: BookHighlightsRecord }) {
  const text = () => props.highlight.text ?? "";
  const note = () => props.highlight.note ?? "";

  return (
    <div class="my-24 flex flex-col gap-4">
      <Opaque>
        <div class="flex flex-col gap-2">
          <BookTitle book={props.highlight.book} />
          <BookAuthor book={props.highlight.book} />
        </div>
      </Opaque>

      <div class="my-2">
        <CopyableText class="bg-yellow-400 text-black">{text()}</CopyableText>

        <Show when={note()}>
          <div class="mt-4 flex gap-2 opacity-80">
            <div class="w-1 bg-yellow-400 rounded" />
            <CopyableText class="text-sm">{note()}</CopyableText>
          </div>
        </Show>
      </div>

      <div class="self-end">
        <Opaque>
          <Datetime date={props.highlight.highlightedAt} />
        </Opaque>
      </div>
    </div>
  );
}
