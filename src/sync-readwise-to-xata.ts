import { getXataClient } from "~/xata";

type Book = {
  user_book_id: number;
  title: string;
  author: string;
  readable_title: string;
  cover_image_url: string;
  readwise_url: string;
  highlights: Highlight[];
};

type Highlight = {
  id: number;
  book_id: number;
  text: string;
  note: string | null;
  highlighted_at: string;
  created_at: string;
  updated_at: string;
  readwise_url: string;
};

export async function syncReadwiseToXata() {
  const booksBulk = [];
  const highlightsBulk = [];

  let currentCursor = "";

  while (true) {
    const query = currentCursor ? "?pageCursor=" + currentCursor : "";
    const {
      results,
      nextPageCursor,
      count,
    }: {
      count: number;
      nextPageCursor: string | null;
      results: Book[];
    } = await fetch(`https://readwise.io/api/v2/export${query}`, {
      headers: {
        Authorization: `Token ${process.env.READWISE_API_KEY}`,
      },
    }).then((res) => res.json());

    console.log("Fetched page with books and highlights :", {
      nextPageCursor,
      count,
    });

    for (const book of results) {
      const readwiseBookId = book.user_book_id.toString();

      booksBulk.push({
        id: readwiseBookId,
        title: book.title,
        author: book.author,
      });

      for (const highlight of book.highlights) {
        const readwiseHighlightId = highlight.id.toString();

        highlightsBulk.push({
          id: readwiseHighlightId,
          book: readwiseBookId,
          text: highlight.text,
          note: highlight.note ?? "",
          highlightedAt: new Date(highlight.highlighted_at),
          lastUpdatedAt: new Date(highlight.updated_at),
          lastSyncedAt: new Date(),
        });
      }
    }

    if (!nextPageCursor) {
      break;
    }

    currentCursor = nextPageCursor;
  }

  const xata = getXataClient();

  const [newBooks, newHighlights] = await Promise.all([
    xata.db.Books.createOrUpdate(booksBulk),
    xata.db.BookHighlights.createOrUpdate(highlightsBulk),
  ]);

  console.log("Created (or updated) books and highlights in Xata", {
    newBooks: newBooks.length,
    newHighlights: newHighlights.length,
  });
}

console.time("Syncing");
await syncReadwiseToXata();
console.timeEnd("Syncing");
