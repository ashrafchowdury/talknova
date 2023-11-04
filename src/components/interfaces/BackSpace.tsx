"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/packages/ui";
import { cn } from "@/lib/functions";

type BackSpaceType = {
  className?: string;
  href: string;
};
const BackSpace = ({ className, href }: BackSpaceType) => {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="icon"
        className={cn("w-7 h-7", className)}
        title="Go Back"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </Button>
    </Link>
  );
};

export default BackSpace;
