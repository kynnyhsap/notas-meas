// Spy on kindle highlights and send them to the server.

import { parseMyClippings } from "~/kindle/clippings";
import { getXataClient } from "~/xata";
import { wait } from "~/utils/wait";

const CLIPPINGS_FILE_PATH = "/Volumes/Kindle/documents/My Clippings.txt";

async function spy() {
  // TODO: more fancy logs.

  let raw: string = "";
  try {
    console.log(`Reading "My Clippings.txt"...`);

    const raw = await Bun.file(CLIPPINGS_FILE_PATH).text();
  } catch (error) {
    console.log(`Failed to read "My Clippings.txt", skipping...`);
    return;
  }

  const parsedBooks = parseMyClippings(raw);

  const xata = getXataClient();

  const existingBooks = await xata.db.Books.getAll();

  console.log(`Fetched ${existingBooks.length} existing books.`);

  const newBooksBulk = [];

  for (const { title, author } of parsedBooks) {
    if (existingBooks.find((b) => b.title === title)) {
      continue;
    }

    newBooksBulk.push({
      title,
      author,
    });
  }

  console.log(`Parsed ${newBooksBulk.length} new books. Creating...`);

  const newBooks = await xata.db.Books.create(newBooksBulk);

  console.log(`Created ${newBooks.length} new books.`);

  const allBooks = [...existingBooks, ...newBooks];

  const existingHighlights = await xata.db.BookHighlights.select([
    "id",
    "text",
    "createdAt",
    "book.id",
  ]).getAll();

  console.log(`Fetched ${existingHighlights.length} existing highlights.`);

  const newHighlightsBulk = parsedBooks
    .map((book) => {
      const bookId = allBooks.find((b) => b.title === book.title)?.id;

      const newHighlights = [];
      for (const highlight of book.highlights) {
        const highlightAlreadyExist = existingHighlights
          .filter((h) => h.book?.id === bookId)
          .find((h) => {
            return h.text === highlight.text;
          });

        if (highlightAlreadyExist) {
          continue;
        }

        newHighlights.push({
          book: bookId,
          text: highlight.text,
          isNote: highlight.isNote,
          createdAt: highlight.date,
        });
      }

      return newHighlights;
    })
    .flat();

  console.log(`Parsed ${newHighlightsBulk.length} new highlights. Creating...`);

  const newHighlights = await xata.db.BookHighlights.create(newHighlightsBulk);

  console.log(`Created ${newHighlights.length} new highlights.`);
}

const INTERVAL = 1000 * 10;

async function main() {
  while (true) {
    await spy();
    await wait(INTERVAL);
  }
}

await main();
