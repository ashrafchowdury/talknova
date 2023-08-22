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
  const { setUserId } = useUsers();
  return (
    <div
      className=" flex items-start justify-between my-7 cursor-pointer"
      key={data.id}
      onClick={() => {
        router.push(
          windowSize < 1025 ? `/chats?${data.id}` : `/users?${data.id}`
        );
        setUserId(data.id);
      }}
    >
      <div className=" flex items-center">
        <Avatar>
          <AvatarImage
            src={data.image}
            alt={data.name}
            className=" object-cover"
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
          <p className="lg:w-[180px] xl:w-[240px] text-sm opacity-60 whitespace-nowrap overflow-hidden truncate">
            Me: {data.msg}
          </p>
        </div>
      </div>
      <p className="text-xs mt-1 mr-3 capitalize">{data.date}</p>
    </div>
  );
};

export default Users;
