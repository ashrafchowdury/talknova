import { AvatarImg } from ".";
import { Button, CommandItem } from "@/packages/ui";

const InviteUsers = ({ data, onclick, button }: any) => {
  return (
    <CommandItem
      key={data.uid}
      className="my-1 group/item cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <AvatarImg fallback={data.name} className="w-6 h-6 text-[10px]" />
        <span className="font-semibold">{data.name}</span>
      </div>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => onclick(data.id)}
      >
        {button}
      </Button>
    </CommandItem>
  );
};

export default InviteUsers;
