import { Button, Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import { BellIcon, MixIcon } from "@radix-ui/react-icons";

const Emojies = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          title="Emoji"
          variant="ghost"
          className="py-[2px] px-2 hover:bg-border duration-300"
        >
          <MixIcon className="w-[14px] sm:w-4 h-[14px] sm:h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 -mt-1">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Emojies</h4>

          <div className="flex flex-col space-y-3 items-center justify-center h-28">
            <p className="text-[16px] text-muted-foreground">
              No Emojies Found
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Emojies;
