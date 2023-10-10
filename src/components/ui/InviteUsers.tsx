import { Avatar } from ".";
import { Button, CommandItem, Skeleton } from "@/packages/ui";

type InviteUsersType = {
  data: any;
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
          img={data.image}
          fallback={data.name}
          className="w-5 md:w-6 h-5 md:h-6 text-[8px] md:text-[10px]"
        />
        <span className="text-sm md:text-[16px] font-semibold capitalize">
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

export const InviteUsersSkeleton = () => {
  const number_of_skeletons = [1, 2, 3, 4];
  return (
    <>
      {number_of_skeletons.map((item) => (
        <Skeleton
          className="w-full flex items-center justify-between p-1 md:p-2 rounded-lg my-2 md:my-3"
          key={item}
        >
          <div className="w-full flex items-center space-x-2">
            <Skeleton className="w-5 md:w-6 h-5 md:h-6 rounded-full" />
            <Skeleton className="h-3 md:h-4 w-[60%] md:w-[180px]" />
          </div>

          <Skeleton className="h-2 md:h-3 w-9 md:w-12 rounded-md" />
        </Skeleton>
      ))}
    </>
  );
};
