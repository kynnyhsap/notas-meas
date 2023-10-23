import { DatetimeSkeleton } from "~/components/skeletons/DatetimeSkeleton";
import { BookTitleSkeleton } from "~/components/skeletons/BookTitleSkeleton";
import { BookAuthorSkeleton } from "~/components/skeletons/BookAuthorSkeleton";

export function HighlightSkeleton() {
  return (
    <div class="my-24 flex flex-col gap-4 opacity-60">
      <div class="flex flex-col gap-2 items-end">
        <BookTitleSkeleton />
        <BookAuthorSkeleton />
      </div>

      <div class="my-2">
        <div class="animate-pulse my-8 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <div class="h-2.5 rounded w-16 bg-yellow-400" />
            <div class="h-2.5 rounded w-44 bg-yellow-400" />
            <div class="h-2.5 rounded w-16 bg-yellow-400" />
          </div>

          <div class="flex items-center gap-2">
            <div class="h-2.5 rounded w-12 bg-yellow-400" />
            <div class="h-2.5 rounded w-32 bg-yellow-400" />
            <div class="h-2.5 rounded w-24 bg-yellow-400" />
            <div class="h-2.5 rounded w-28 bg-yellow-400" />
          </div>

          <div class="flex items-center gap-2">
            <div class="h-2.5 rounded w-32 bg-yellow-400" />
            <div class="h-2.5 rounded w-8 bg-yellow-400" />
            <div class="h-2.5 rounded w-20 bg-yellow-400" />
            <div class="h-2.5 rounded w-6 bg-yellow-400" />
          </div>

          <div class="flex items-center gap-2">
            <div class="h-2.5 rounded w-16 bg-yellow-400" />
            <div class="h-2.5 rounded w-44 bg-yellow-400" />
            <div class="h-2.5 rounded w-16 bg-yellow-400" />
          </div>

          <div class="flex items-center gap-2">
            <div class="h-2.5 rounded w-12 bg-yellow-400" />
            <div class="h-2.5 rounded w-32 bg-yellow-400" />
            <div class="h-2.5 rounded w-24 bg-yellow-400" />
            <div class="h-2.5 rounded w-28 bg-yellow-400" />
          </div>

          <div class="flex items-center gap-2">
            <div class="h-2.5 rounded w-32 bg-yellow-400" />
            <div class="h-2.5 rounded w-8 bg-yellow-400" />
            <div class="h-2.5 rounded w-20 bg-yellow-400" />
            <div class="h-2.5 rounded w-6 bg-yellow-400" />
          </div>
        </div>

        <div class="mt-4 flex gap-2 items-center">
          <div class="w-1 h-5 bg-yellow-400 rounded" />
          <div class="h-1.5 rounded w-48 bg-gray-200" />
        </div>
      </div>

      <div class="self-end">
        <DatetimeSkeleton />
      </div>
    </div>
  );
}
