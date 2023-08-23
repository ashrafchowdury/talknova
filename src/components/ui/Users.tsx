"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/packages/ui";
import Link from "next/link";
import { useUI } from "@/provider";
import { cn } from "@/lib/functions";
import { useUsers } from "@/provider";
import { useRouter } from "next/navigation";

const Users = ({ data }: any) => {
  const { windowSize } = useUI();
  const router = useRouter();
  const { setUserId, getSelectedUser } = useUsers();
  return (
    <div
      className="flex items-start justify-between my-7 cursor-pointer relative overflow-hidden"
      onClick={() => {
        router.push(
          windowSize < 1025 ? `/chats#${data.id}` : `/users#${data.id}`
        );
        setUserId(data.id);
        getSelectedUser(data.id);
      }}
    >
      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src={data.image}
            alt={data.name}
            className="object-cover"
          />
        </Avatar>
        <div className="ml-3 mr-2">
          <p className=" font-bold mb-1 flex items-center">
            <span
              className={cn(
                "w-[10px] h-[10px] rounded-full mr-[6px]",
                data.active ? "bg-green-500" : "bg-red-500"
              )}
            ></span>
            {data.name}
          </p>
          <p className="w-[90%] text-xs sm:text-sm opacity-60 whitespace-nowrap overflow-hidden truncate">
            Me: {data.msg}
          </p>
        </div>
      </div>
      <p className="text-[10px] mt-1 whitespace-nowrap mr-3 capitalize absolute top-1 right-0">
        {data.date}
      </p>
    </div>
  );
};

export default Users;
