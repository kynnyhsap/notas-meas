export function PodcastNoteSkeleton() {
  return (
    <div class="animate-pulse my-16 pl-4 border-l-2 border-gray-500 cursor-pointer flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="h-2 rounded w-60 bg-gray-400 my-2" />
      </div>

      <div class="flex items-center">
        <div class="w-6 h-6 rounded-sm inline-block mr-2 bg-gray-800" />

        <div class="h-1.5 rounded w-36 bg-gray-600" />
      </div>

      <div class="my-8 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <div class="h-2.5 rounded w-8 bg-gray-200" />
          <div class="h-2.5 rounded w-44 bg-gray-200" />
          <div class="h-2.5 rounded w-16 bg-gray-200" />
        </div>

        <div class="flex items-center gap-2">
          <div class="h-2.5 rounded w-12 bg-gray-200" />
          <div class="h-2.5 rounded w-32 bg-gray-200" />
          <div class="h-2.5 rounded w-24 bg-gray-200" />
        </div>

        <div class="flex items-center gap-2">
          <div class="h-2.5 rounded w-32 bg-gray-200" />
          <div class="h-2.5 rounded w-8 bg-gray-200" />
          <div class="h-2.5 rounded w-20 bg-gray-200" />
          <div class="h-2.5 rounded w-6 bg-gray-200" />
        </div>
      </div>

      <div class="h-2 self-end rounded text-xs bg-gray-600 w-20 mr-2" />
    </div>
  );
}
