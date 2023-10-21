import qs from "query-string";
import { json } from "solid-start";
import { getXataClient } from "~/xata";

type Book = {
  user_book_id: number;
  title: string;
  author: string;
  readable_title: string;
  cover_image_url: string;
  readwise_url: string;
  highlights: Highlight[];

  category: "books" | "articles" | "supplementals" | "podcasts";
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

async function syncReadwiseToXata() {
  console.log("Syncing highlights!");

  const xata = getXataClient();

  // last synced at
  const updatedAfter =
    (
      await xata.db.BookHighlights.sort("highlightedAt", "desc").getFirst()
    )?.highlightedAt?.toISOString() ?? null;

  console.log(`Last highlighted date is ${updatedAfter}.`);

  const booksBulk = [];
  const highlightsBulk = [];

  let currentCursor = "";

  while (true) {
    const query = qs.stringify(
      {
        pageCursor: currentCursor ? currentCursor : null,
        updatedAfter,
      },
      {
        skipNull: true,
      },
    );

    const {
      results = [],
      nextPageCursor,
      count,
    }: {
      count: number;
      nextPageCursor: string | null;
      results: Book[];
    } = await fetch(`https://readwise.io/api/v2/export?${query}`, {
      headers: {
        Authorization: `Token ${process.env.READWISE_API_KEY}`,
      },
    }).then((res) => res.json());

    console.log("Fetched page with books and highlights :", {
      nextPageCursor,
      count,
      results,
    });

    const myBooks = results.filter((book) => book.category !== "supplementals");

    for (const book of myBooks) {
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

  const newBooks = await xata.db.Books.createOrUpdate(booksBulk);
  const newHighlights =
    await xata.db.BookHighlights.createOrUpdate(highlightsBulk);

  console.log("Created (or updated) books and highlights in Xata", {
    newBooks: newBooks.length,
    newHighlights: newHighlights.length,
  });

  console.log("End of sync highlights!");

  return {
    newBooks,
    newHighlights,
  };
}

export async function GET() {
  const result = await syncReadwiseToXata();

  return json(result);
}
