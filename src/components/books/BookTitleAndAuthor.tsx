import { BooksRecord } from "~/xata";

export function BookTitleAndAuthor(props: {
  book: BooksRecord | null | undefined;
}) {
  const title = () => props.book?.title ?? "";
  const author = () => props.book?.author ?? "";

  return (
    <div class="flex flex-col gap-2">
      <div class="ml-8 text-end italic">{title()}</div>

      <div class="text-end text-pink-300">{author()}</div>
    </div>
  );
}
