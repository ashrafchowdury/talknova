import { Button, Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import { BellIcon } from "@radix-ui/react-icons";
const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          title="Notifications"
          className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
        >
          <BellIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[258px] md:w-80 -mt-1">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notification</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="flex flex-col space-y-3 items-center justify-center h-20">
            <p className="text-[16px] text-muted-foreground">No Notification</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
