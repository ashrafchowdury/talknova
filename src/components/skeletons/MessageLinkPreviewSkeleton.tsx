import { Skeleton } from "@/packages/ui";

const MessageLinkPreviewSkeleton = () => {
  return (
    <div className="w-full space-y-5">
      <Skeleton className="w-full h-24 rounded-lg" />
      <Skeleton className="w-full h-8 rounded-md" />
      <div className="w-full space-y-2">
        <Skeleton className="w-full h-4 rounded-sm" />
        <Skeleton className="w-full h-4 rounded-sm" />
      </div>
    </div>
  );
};

export default MessageLinkPreviewSkeleton;
