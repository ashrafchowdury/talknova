import { Skeleton } from "@/packages/ui";

const NotificationUsersSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          className="w-full flex items-center justify-between p-2 md:p-3 rounded-lg my-2 md:my-3 border"
          key={item}
        >
          <div className="w-full flex items-center space-x-2">
            <Skeleton className="h-8 md:h-10 w-10 md:w-12 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-3 md:h-4 w-[60%] md:w-[120px]" />
              <Skeleton className="h-2 md:h-3 w-[75%] md:w-[160px]" />
            </div>
          </div>
          <div className="flex space-x-1">
            <Skeleton className="h-7 md:h-8 w-7 md:w-8 rounded-md" />
            <Skeleton className="h-7 md:h-8 w-7 md:w-8 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationUsersSkeleton;
