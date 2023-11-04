"use client";

import { Avatar } from ".";
import { cn, formatTimeByLastMsg } from "@/lib/functions";
import { useRouter } from "next/navigation";
import { Badge, Skeleton } from "@/packages/ui";
import { useEncrypt } from "@/packages/encryption";
import { UserType } from "@/packages/server/types";
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
            {data.name}{" "}
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

export const UsersSkeleton = () => {
  const number_of_skeletons = [1, 2, 3, 4];
  return (
    <>
      {number_of_skeletons.map((item) => (
        <Skeleton
          className="w-full flex items-center space-x-2 relative p-2 md:p-3 rounded-lg my-3 md:my-4"
          key={item}
        >
          <Skeleton className="h-10 md:h-12 w-10 md:w-12 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-[60%] md:w-[180px]" />
            <Skeleton className="h-3 w-[85%] md:w-[220px]" />
          </div>
          <Skeleton className="h-2 w-[50px] absolute top-4 right-2" />
        </Skeleton>
      ))}
    </>
  );
};
