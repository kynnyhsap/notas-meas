import { BooksRecord } from "~/xata";

export function BookTitleAndAuthor(props: {
  book: BooksRecord | null | undefined;
}) {
  const title = () => props.book?.title ?? "";
  const author = () => props.book?.author ?? "";

  return (
    <div class="flex flex-col gap-2">
      <div class="text-end font-bold">{title()}</div>

      <div class="text-end text-blue-300">{author()}</div>
    </div>
  );
}
