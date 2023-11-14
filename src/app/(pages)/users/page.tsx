"use client";
import { useState, Fragment, useEffect } from "react";
import { Users as User, UsersSkeleton, Loader } from "@/components/interfaces";
import { Invite, Notification } from "@/components";
import {
  GearIcon,
  PlusCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button, Input } from "@/packages/ui";
import Link from "next/link";
import { useUsers } from "@/packages/server/context/UserContext";
import { useVisibilityChange } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

const Users = () => {
  const [searchUsers, setSearchUsers] = useState("");
  const { friends, myself, isLoading } = useUsers();
  const { theme } = useTheme();
  const documentVisible = useVisibilityChange();
  const id = useSearchParams().get("id");

  useEffect(() => {
    const soundEffects = () => {
      if (!documentVisible && navigator.onLine && !isLoading) {
        const effect = new Audio("/new_message.mp3");
        effect.play();
      }
    };
    soundEffects();
  }, [friends]);

  const alignUser = () => {
    const now = new Date();
    const changeTimeFormat = friends.map((item) => {
      return { ...item, lastMsgTime: new Date(item.lastMsgTime) };
    });
    const alignUserByTime = changeTimeFormat.sort(
      (a, b) =>
        Math.abs(now.getTime() - a.lastMsgTime.getTime()) -
        Math.abs(now.getTime() - b.lastMsgTime.getTime())
    );
    return alignUserByTime;
  };

  if (isLoading) {
    return (
      <Loader
        variant={theme == "light" ? "black" : "white"}
        className="scale-150 md:scale-[2] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
      />
    );
  } else {
    return (
      <aside className="h-screen flex flex-col justify-between md:px-4 md:border-x">
        <div>
          <nav className="h-[60px] flex items-center justify-between border-b">
            <h1 className=" text-2xl font-bold">Inbox</h1>
            <div>
              <Notification />
              <Invite>
                <Button
                  variant="ghost"
                  title="Invite Friends"
                  className="py-[2px] px-2 mx-1 hover:bg-border duration-300"
                >
                  <PlusCircledIcon className="w-5 h-5" />
                </Button>
              </Invite>
              <Button
                variant="ghost"
                title="Settings"
                className="py-[2px] px-2 mx-1 hover:bg-border duration-300"
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
                {alignUser()
                  .filter(
                    (data) =>
                      data.name
                        ?.toLowerCase()
                        .includes(searchUsers.toLowerCase())
                  )
                  .map((data) => (
                    <Fragment key={data.uid}>
                      <User data={data} />
                    </Fragment>
                  ))}
              </>
            )}
          </section>
        </div>

        <Invite>
          <Button className="w-full md:w-[97%] mb-3">
            <PlusCircledIcon className="w-5 h-5 mr-2" />
            Invite Friends
          </Button>
        </Invite>
      </aside>
    );
  }
};

export default Users;
