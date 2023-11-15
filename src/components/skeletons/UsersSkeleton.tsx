import { Skeleton } from "@/packages/ui";

const UsersSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          className="w-full flex items-center space-x-2 relative p-2 md:p-3 rounded-lg my-3 md:my-4 border"
          key={item}
        >
          <Skeleton className="h-10 md:h-12 w-12 md:w-14 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-[60%] md:w-[180px]" />
            <Skeleton className="h-3 w-[85%] md:w-[420px]" />
          </div>
          <Skeleton className="h-2 w-[50px] absolute top-4 right-3" />
        </div>
      ))}
    </>
  );
};

export default UsersSkeleton;
