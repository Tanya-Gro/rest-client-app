import { Skeleton } from '../ui';

export const VariableRowSkeleton = () => {
  return [...Array(5)].map((_, i) => (
    <div className="flex flex-col" key={i}>
      <div className="flex gap-2 w-full items-start">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[36px] h-[36px]" />
        <Skeleton className="flex-1 h-[36px]" />
        <Skeleton className="w-[36px] h-[36px]" />
      </div>
    </div>
  ));
};
