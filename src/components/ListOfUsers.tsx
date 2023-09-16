"use client";
import { useState, Fragment } from "react";
import { Users, UsersSkeleton } from "@/components/ui";
import { Invite, Notification } from ".";
import {
  GearIcon,
  PlusCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button, Input } from "@/packages/ui";
import Link from "next/link";
import { useUsers } from "@/provider";

const ListOfUsers = () => {
  const [searchUsers, setSearchUsers] = useState("");
  const { friends, myself } = useUsers();
  const shortUser = () => {
    const now = new Date();
    const changeTimeFormat = friends.map((item: any) => ({
      ...item,
      lastMsgTime: new Date(item.lastMsgTime),
    }));
    const alignUserByTime = changeTimeFormat.sort(
      (a: any, b: any) =>
        Math.abs(now.getTime() - a.lastMsgTime.getTime()) -
        Math.abs(now.getTime() - b.lastMsgTime.getTime())
    );
    return alignUserByTime;
  };
  return (
    <aside className=" w-[95%] sm:w-[520px] md:w-[720px] lg:w-[300px] xl:w-[400px] h-[98vh] mt-2 flex flex-col justify-between">
      <div>
        <nav className="h-[60px] flex items-center justify-between border-b">
          <h1 className=" text-2xl font-bold">Inbox</h1>
          <div>
            <Notification />
            <Invite>
              <Button
                variant="ghost"
                title="Invite Friends"
                className="py-[2px] px-2 mx-1 hover:bg-slate-200 dark:hover:bg-slate-800 duration-300"
              >
                <PlusCircledIcon className="w-5 h-5" />
              </Button>
            </Invite>
            <Button
              variant="ghost"
              title="Settings"
              className="py-[2px] px-2 mx-1 hover:bg-slate-200 dark:hover:bg-slate-800 duration-300"
            >
              <Link href="/settings">
                <GearIcon className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </nav>

        <section className="w-full relative mt-4 mb-5 md:pr-[14px]">
          <Input
            placeholder="Search Friends"
            className="w-full py-5 px-9"
            value={searchUsers}
            onChange={(e) => setSearchUsers(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-[11px] left-[10px]" />
        </section>

        <section className="w-full md:w-[98%] mt-8">
          {myself.friends?.length > 0 && friends.length == 0 ? (
            <UsersSkeleton />
          ) : (
            <>
              {shortUser()
                .filter(
                  (data: any) =>
                    data.name?.toLowerCase().includes(searchUsers.toLowerCase())
                )
                .map((data: any) => (
                  <Fragment key={data.uid}>
                    <Users data={data} />
                  </Fragment>
                ))}
            </>
          )}
        </section>
      </div>

      <Invite>
        <Button className="w-full md:w-[97%]">
          <PlusCircledIcon className="w-5 h-5 mr-2" />
          Invite Friends
        </Button>
      </Invite>
    </aside>
  );
};

export default ListOfUsers;
