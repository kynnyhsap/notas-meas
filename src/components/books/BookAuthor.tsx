import { BooksRecord } from "~/xata";

export function BookAuthor(props: { book: BooksRecord | null | undefined }) {
  const author = () => props.book?.author ?? "";

  return <div class="text-end text-pink-300 italic">{author()}</div>;
}
