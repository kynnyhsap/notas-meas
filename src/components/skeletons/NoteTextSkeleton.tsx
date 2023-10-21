export function NoteTextSkeleton() {
  return (
    <div class="animate-pulse my-8 flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="h-2.5 rounded w-16 bg-gray-200" />
        <div class="h-2.5 rounded w-44 bg-gray-200" />
        <div class="h-2.5 rounded w-16 bg-gray-200" />
      </div>

      <div class="flex items-center gap-2">
        <div class="h-2.5 rounded w-12 bg-gray-200" />
        <div class="h-2.5 rounded w-32 bg-gray-200" />
        <div class="h-2.5 rounded w-24 bg-gray-200" />
        <div class="h-2.5 rounded w-28 bg-gray-200" />
      </div>

      <div class="flex items-center gap-2">
        <div class="h-2.5 rounded w-32 bg-gray-200" />
        <div class="h-2.5 rounded w-8 bg-gray-200" />
        <div class="h-2.5 rounded w-20 bg-gray-200" />
        <div class="h-2.5 rounded w-6 bg-gray-200" />
      </div>
    </div>
  );
}
