import dayjs from "dayjs";

export function Datetime({ date }: { date: string | Date | undefined | null }) {
  const isThisYear = dayjs(date).year() === dayjs().year();
  const formatted = dayjs(date).format(
    isThisYear ? "MMM D, HH:mm" : "YYYY, MMM D, HH:mm",
  );

  return <time class="self-end text-xs text-gray-500">{formatted}</time>;
}
