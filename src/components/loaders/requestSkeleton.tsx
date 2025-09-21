import { Skeleton } from '../ui';

export const RequestSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      <Skeleton className="w-[100px] h-[32px]" />
      <div className="flex flex-col gap-1">
        <div className="flex w-full gap-2">
          <Skeleton className="w-[130px] h-[32px]" />
          <div className="flex-1"></div>
          <Skeleton className="w-full h-[32px]" />
          <Skeleton className="w-[90px] h-[32px]"></Skeleton>
        </div>
        <Skeleton className="w-[300px] h-[30px] mt-5"></Skeleton>
      </div>
    </div>
  );
};
