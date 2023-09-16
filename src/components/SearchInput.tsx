export function SearchInput({
  onChange,
  onInput,
}: {
  onChange?(value: string): void;
  onInput?(value: string): void;
}) {
  return (
    <form>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-transparent"
          placeholder="Search notes..."
          required
          onChange={(e) => onChange?.(e.currentTarget.value)}
          onInput={(e) => onInput?.(e.currentTarget.value)}
        />
      </div>
    </form>
  );
}
