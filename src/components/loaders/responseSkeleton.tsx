import { Skeleton } from '../ui';

export const ResponseSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-[100px] h-[32px]" />
      <Skeleton className="w-[300px] h-[24px]" />
      <Skeleton className="w-[95vw] h-[70px]" />
    </div>
  );
};
