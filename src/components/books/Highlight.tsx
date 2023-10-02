import { BookHighlightsRecord } from "~/xata";
import { CopyableText } from "~/components/CopyableText";

export function Highlight({ highlight }: { highlight: BookHighlightsRecord }) {
  const text = highlight.text ?? "";

  return (
    <div class="my-8">
      <CopyableText>{text}</CopyableText>
    </div>
  );
}
