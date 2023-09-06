export function truncate(
  str: string | undefined | null,
  length: number,
): string {
  if (!str) return "";

  return str.length > length ? str.substring(0, length) + "..." : str;
}
