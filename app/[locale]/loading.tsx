import { Skeleton } from '@components';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 flex w-full mx-auto items-center justify-between px-4 py-3.5">
        <div className="flex w-max items-center justify-start px-1 gap-3">
          <Skeleton className="rounded-full h-[40px] w-[40px]" />
          <Skeleton className="hidden sm:inline-block h-[32px] w-[165px]" />
        </div>
        <div className="flex gap-1.5">
          {[...Array(2)].map((_, i) => (
            <Skeleton
              key={`header-{${i}}`}
              className={`h-[40px] w-[50px] rounded-md`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 px-4 py-2 justify-center">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <Skeleton className="h-[48px] w-[316px]" />
          <div className="flex gap-1.5">
            {[...Array(2)].map((_, i) => (
              <Skeleton
                key={`main-{${i}}`}
                className={`h-[36px] w-[110px] rounded-md`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-[28px] w-[90px]" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={`footer-{${i}}`}
                className="rounded-full h-[40px] w-[40px]"
              />
            ))}
          </div>
        </div>
        <Skeleton className="h-[24px] w-[53px]" />
        <Skeleton className="h-[40px] w-[40px]" />
      </div>
    </div>
  );
}
