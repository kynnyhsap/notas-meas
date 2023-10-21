import { DatetimeSkeleton } from "~/components/skeletons/DatetimeSkeleton";
import { BookTitleAndAuthorSkeleton } from "~/components/skeletons/BookTitleAndAuthorSkeleton";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/solid-mini";

export function BookHighlightSkeleton() {
  return (
    <div class="my-24 flex flex-col gap-4">
      <BookTitleAndAuthorSkeleton />

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
          <Icon path={pencilSquare} style="width: 18px;" />
          <div class="h-1.5 rounded w-48 bg-gray-200" />
        </div>
      </div>

      <div class="self-end">
        <DatetimeSkeleton />
      </div>
    </div>
  );
}
