import React from "react";
import { Button } from "@/packages/ui";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/functions";

const ReloadButton = ({
  action,
  className,
}: {
  action: any;
  className?: string;
}) => {
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn("w-7 h-7", className)}
      onClick={action}
    >
      <ReloadIcon className="w-4 h-4" />
    </Button>
  );
};

export default ReloadButton;
