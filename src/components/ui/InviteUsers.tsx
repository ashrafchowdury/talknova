import { Avatar } from ".";
import { Button, CommandItem } from "@/packages/ui";
import { UserType } from "@/types";

type InviteUsersType = {
  data: UserType;
  onclick: (email: string) => void;
  button: string;
};

const InviteUsers = ({ data, onclick, button }: InviteUsersType) => {
  return (
    <CommandItem
      key={data.uid}
      className="md:my-1 group/item cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <Avatar
          fallback={data.name}
          className="w-5 md:w-6 h-5 md:h-6 text-[8px] md:text-[10px]"
        />
        <span className="text-sm md:text-[16px] font-semibold">
          {data.name}
        </span>
      </div>
      <Button
        variant="ghost"
        className="text-xs md:text-sm cursor-pointer"
        onClick={() => onclick(data.id)}
      >
        {button}
      </Button>
    </CommandItem>
  );
};

export default InviteUsers;
