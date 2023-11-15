import { Skeleton } from "@/packages/ui";
import { cn } from "@/lib/functions";

const MessageSkeleton = () => {
  return (
    <>
      <section className="w-full mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <Skeleton
            className={cn(
              "my-[6px]",
              index % 2 !== 0
                ? "float-right clear-both w-48"
                : "float-left clear-both w-60"
            )}
            key={item}
          ></Skeleton>
        ))}
      </section>
    </>
  );
};

export default MessageSkeleton;
