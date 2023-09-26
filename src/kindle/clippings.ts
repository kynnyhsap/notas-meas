type Clipping = {
  title: string;
  author: string;
  text: string;
  date: Date;
  isNote: boolean;
  location: {
    start: number;
    end?: number;
  };

  raw: string;
};

type Book = {
  title: string;
  author: string;
  highlights: {
    isNote: boolean;
    text: string;
    date: Date;
  }[];
};

/**
 * This function is relying on my own use of Kindle, which is to highlight and occasionally add notes. I intend to send those parsed notes to my Xata database.
 */
export function parseMyClippings(data: string) {
  const clippings: Clipping[] = [];

  for (let raw of data.split("==========")) {
    if (!raw) {
      continue;
    }

    if (raw.includes("- Your Bookmark on")) {
      continue;
    }

    const isNote = raw.includes("- Your Note on");

    const [titleAndAuthor, locationAndDate, _, ...textLines] = raw
      .trim()
      .split("\r\n");

    const text = textLines.join(" ");

    if (!titleAndAuthor || !locationAndDate || !text) {
      continue;
    }

    const { date } = /Added on (?<date>.*)/.exec(locationAndDate)?.groups ?? {};

    const { title, author } =
      /(?<title>.*) \((?<author>.*)\)/.exec(titleAndAuthor)?.groups ?? {};

    const { start, end } =
      /Location (?<start>\d+)(-(?<end>\d+))?/.exec(locationAndDate)?.groups ??
      {};

    if (!title || !author || !date || !text) {
      continue;
    }

    clippings.push({
      title,
      author,
      text,
      isNote,
      date: new Date(date),
      location: { start: Number(start), end: end ? Number(end) : undefined },
      raw: raw,
    });
  }

  const books: Book[] = [];

  for (const { title, author, date, text, isNote } of clippings) {
    const book = books.find((book) => book.title === title);

    if (book) {
      book.highlights.push({ text, date, isNote });
    } else {
      books.push({
        title,
        author,
        highlights: [{ text, date, isNote }],
      });
    }
  }

  return books;
}
