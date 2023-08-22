"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/packages/ui";
import { cn } from "@/lib/functions";
import { ClassType } from "@/types";

const BackSpace = ({ className }: ClassType) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("w-7 h-7", className)}
      title="Go Back"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="w-5 h-5" />
    </Button>
  );
};

export default BackSpace;
