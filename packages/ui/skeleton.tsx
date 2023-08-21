import { cn } from "@/lib/functions";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-300 dark:bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
