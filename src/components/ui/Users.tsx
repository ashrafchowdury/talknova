"use client";
import { Avatar } from ".";
import Link from "next/link";
import { useUI } from "@/provider";
import { cn } from "@/lib/functions";
import { useUsers } from "@/provider";
import { useRouter } from "next/navigation";
import { formatTimeByLastMsg } from "@/lib/functions";

const Users = ({ data }: any) => {
  const { windowSize } = useUI();
  const router = useRouter();
  const { setUserId, getSelectedUser } = useUsers();

  return (
    <div
      className="flex items-start justify-between my-7 cursor-pointer relative overflow-hidden"
      onClick={() => {
        router.push(
          windowSize < 1025 ? `/chats#${data.uid}` : `/users#${data.uid}`
        );
        setUserId(data.uid);
        getSelectedUser(data.uid);
      }}
    >
      <div className="w-full flex items-center">
        <Avatar
          img={data.image}
          fallback={data.name}
          className="w-10 md:w-12 h-10 md:h-12"
        />
        <div className="w-full ml-2 md:ml-3 mr-2">
          <p className=" font-bold mb-1 flex items-center">
            <span
              className={cn(
                "w-[10px] h-[10px] rounded-full mr-[6px]",
                data?.active ? "bg-green-500" : "bg-red-500"
              )}
            ></span>
            {data.name}
          </p>
          <p className="w-[90%] md:w-[80%] text-xs sm:text-sm text-muted-foreground whitespace-nowrap overflow-hidden truncate">
            {data?.lastMsg ?? "New Friend"}
          </p>
        </div>
      </div>
      <p className="text-[10px] mt-1 whitespace-nowrap mr-3 capitalize absolute top-1 right-0">
        {formatTimeByLastMsg(data?.lastMsgTime)}
      </p>
    </div>
  );
};

export default Users;
