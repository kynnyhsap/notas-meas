import { BooksRecord } from "~/xata";

export function BookTitle(props: { book: BooksRecord | null | undefined }) {
  const title = () => props.book?.title ?? "";

  return <div class="ml-8 text-end">{title()}</div>;
}
