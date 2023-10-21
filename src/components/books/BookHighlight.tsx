import { BookHighlightsRecord } from "~/xata";
import { CopyableText } from "~/components/CopyableText";
import { Datetime } from "~/components/Datetime";
import { BookTitleAndAuthor } from "~/components/books/BookTitleAndAuthor";
import { Opaque } from "~/components/Opaque";
import { Icon } from "solid-heroicons";
import { pencilSquare, pencil } from "solid-heroicons/solid-mini";
import { Show } from "solid-js";

export function BookHighlight(props: { highlight: BookHighlightsRecord }) {
  const text = () => props.highlight.text ?? "";
  const note = () => props.highlight.note ?? "";

  return (
    <div class="my-24 flex flex-col gap-4">
      <Opaque>
        <BookTitleAndAuthor book={props.highlight.book} />
      </Opaque>

      <div class="my-2">
        <CopyableText class="bg-yellow-400 text-black">{text()}</CopyableText>

        <Show when={note()}>
          <div class="mt-4 flex gap-2">
            <Icon path={pencilSquare} style="width: 18px;" />
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
