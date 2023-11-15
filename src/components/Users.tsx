"use client";

import { Avatar } from ".";
import { cn, formatTimeByLastMsg } from "@/lib/functions";
import { useRouter } from "next/navigation";
import { Badge } from "@/packages/ui";
import { useEncrypt } from "@/packages/encryption";
import { UserType } from "@/packages/server";
import { useUsers } from "@/packages/server/context/UserContext";

const Users = ({ data }: { data: UserType }) => {
  const router = useRouter();
  const { decryptData } = useEncrypt();
  const { myself } = useUsers();

  return (
    <div
      className="flex items-start justify-between my-7 cursor-pointer relative overflow-hidden"
      onClick={() => router.push(`/users/chats?id=${data.uid}`)}
    >
      <div className="w-full flex items-center">
        <Avatar
          img={data.image}
          fallback={data.name}
          className="w-10 md:w-12 h-10 md:h-12"
        />
        <div className="w-full ml-2 md:ml-3 mr-2">
          <p className=" font-bold mb-1 flex items-center capitalize">
            <span
              className={cn(
                "w-[9px] h-[9px] rounded-full mr-1 ",
                data?.active ? "bg-green-500" : "bg-red-500"
              )}
            ></span>
            {data.name}
            {!data?.lastMsg && <Badge className=" ml-2 text-[10px]">New</Badge>}
          </p>
          <p className="w-[90%] md:w-[80%] text-xs sm:text-sm text-muted-foreground whitespace-nowrap overflow-hidden truncate">
            {data?.lastMsg
              ? `Send: ${decryptData(
                  data?.lastMsg,
                  [myself.uid, data.uid].sort().join("")
                )}`
              : `Start chat with ${data.name}`}
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
