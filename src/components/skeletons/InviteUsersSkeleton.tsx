import { Skeleton } from "@/packages/ui";

const InviteUsersSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          className="w-full flex items-center justify-between p-1 md:p-2 rounded-lg my-2 md:my-3 border"
          key={item}
        >
          <div className="w-full flex items-center space-x-2">
            <Skeleton className="w-5 md:w-6 h-5 md:h-6 rounded-full" />
            <Skeleton className="h-3 md:h-4 w-[60%] md:w-[180px]" />
          </div>

          <Skeleton className="h-2 md:h-3 w-9 md:w-12 rounded-md" />
        </div>
      ))}
    </>
  );
};
export default InviteUsersSkeleton;
