import { useUsers } from "@/packages/server/context/UserContext";
import { UserType } from "@/packages/server";
import { Button } from "@/packages/ui";
import { TrashIcon, CheckIcon } from "@radix-ui/react-icons";
import { Avatar } from ".";

const NotificationUsers = ({ data }: { data: UserType }) => {
  const { acceptUserInvite } = useUsers();
  return (
    <div key={data.uid} className="flex items-center justify-between">
      <div className="flex items-center space-x-2 !mr-3 w-[70%]">
        <Avatar
          fallback={data.name}
          className="w-9 md:w-10 h-9 md:h-10 text-xs md:text-sm"
        />
        <div className="overflow-hidden ">
          <p className="text-sm md:text-[16px] font-semibold mb-1">
            {data.name}
          </p>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {data.bio}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1 md:space-x-2">
        <Button
          size="icon"
          className="w-7 h-7 md:w-8 md:h-8"
          onClick={() => acceptUserInvite(data.uid, data.id)}
        >
          <CheckIcon className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" className="w-7 h-7 md:w-8 md:h-8">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationUsers;
