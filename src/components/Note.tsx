import { NotesRecord } from "~/xata";
import dateFormat from "dateformat";

export function Note({ note }: { note: NotesRecord }) {
  const date = note.createdAt ? dateFormat(note.createdAt, "mmm d, HH:MM") : "";

  return (
    <div class="my-10 pl-4 border-l-2 border-gray-400 flex flex-col cursor-pointer">
      <span>{note.text}</span>

      <span class="self-end text-xs text-gray-500">{date}</span>
    </div>
  );
}
