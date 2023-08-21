import { Avatar, AvatarFallback, AvatarImage } from "@/packages/ui";

const Users = () => {
  return (
    <div className=" flex items-start justify-between my-7">
      <div className=" flex items-center">
        <Avatar>
          <AvatarImage src="/preview_one.png" alt="@shadcn" />
        </Avatar>
        <div className="ml-3 mr-2">
          <p className=" font-bold mb-1 flex items-center">
            <span className=" w-[10px] h-[10px] rounded-full bg-green-500 mr-[6px]"></span>
            Ashraf Chowdury
          </p>
          <p className="lg:w-[180px] xl:w-[240px] text-sm opacity-60 whitespace-nowrap overflow-hidden truncate">
            Me: Lorem ipsum dolor sit amet. ipsum dolor sit amet
          </p>
        </div>
      </div>
      <p className="text-xs mt-1 mr-3">Today</p>
    </div>
  );
};

export default Users;
