import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-7 w-[350px]" />
      <Skeleton className="h-[100px] w-[350px] rounded-xl" />
    </div>
  );
}
