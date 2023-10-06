import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import { Arrow } from "@radix-ui/react-popover";
import { cn } from "@/lib/functions";

type QuestionMarkType = {
  className?: string;
  title: string;
  description: string;
};
const QuestionMark = ({ className, title, description }: QuestionMarkType) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <QuestionMarkCircledIcon
          className={cn("w-3 md:w-4 h-3 md:h-4 cursor-pointer", className)}
        />
      </PopoverTrigger>
      <PopoverContent className=" w-64 md:w-80" sideOffset={5}>
        <div className="space-y-2">
          <h3 className="text-[16px] md:text-lg">{title}</h3>
          <p className=" text-xs md:text-sm font-thin">{description}</p>
        </div>
        <Arrow />
      </PopoverContent>
    </Popover>
  );
};

export default QuestionMark;
