"use client";

import { Button, Skeleton } from "@/packages/ui";
import { ImageIcon, DashboardIcon, FileTextIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/functions";
import { ClassType } from "@/types";
import {
  ThemeSelector,
  ToggleSwitch,
  BackSpace,
  SecretKey,
  Avatar,
  AllImages,
} from "./ui";

import { useUsers } from "@/packages/server";
import { useWindowResize, useAppearance } from "@/lib/hooks";
import { useTheme } from "next-themes";
import { userThemeSchema } from "@/lib/helpers";

const UserSettings = ({ className }: ClassType) => {
  const { selectedUser } = useUsers();
  const { userAppearance, changeUserAppearance } = useAppearance();
  const { windowSize } = useWindowResize();
  const { theme } = useTheme();

  return (
    <section className={cn("h-auto lg:h-[98vh]", className)}>
      <nav className="h-[60px] md:mt-2 xl:px-8 border-b flex items-center justify-start">
        <BackSpace
          className="flex xl:hidden"
          href={windowSize < 1025 ? "/chats" : "/users"}
        />
        <p className=" text-xl font-bold ml-3 xl:ml-0">Settings</p>
      </nav>

      <div className="flex flex-col items-center justify-center mt-6 px-4">
        <Avatar
          img={selectedUser?.image}
          fallback={selectedUser?.name}
          className="w-24 h-24 text-3xl"
        />

        <p className="text-xl font-bold mt-2 mb-1">{selectedUser?.name}</p>
        <p className="w-[90%] text-sm text-center opacity-60">
          {selectedUser?.bio}
        </p>
        {!selectedUser?.name && (
          <>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-[90%] mt-2" />
          </>
        )}
      </div>

      <div className="w-full mt-7 px-4">
        <p className="mb-4 font-medium opacity-60">Medias</p>

        <div className="flex items-center space-x-3">
          <AllImages />
          <Button
            variant="outline"
            title="Shared Files"
            className="h-14 w-[95%] hover:bg-border duration-300"
          >
            <FileTextIcon className="w-7 h-7" />
          </Button>
        </div>
      </div>

      <div className="w-full mt-7 px-4">
        <p className="mb-4 font-medium opacity-60">Settings</p>
        <div className="w-full flex items-center justify-between mb-7">
          <div className="mr-5">
            <p className="text-[16px] font-bold mb-1">Enable Encryption</p>
            <p className="text-xs opacity-60 -mt-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <SecretKey />
        </div>

        <ToggleSwitch
          title="Auto Lock"
          desc="Lorem ipsum, dolor sit amet consectetur dolor sit amet consectetur"
        />
        <ToggleSwitch
          title="Lorem Ipsum"
          desc="Lorem ipsum, dolor sit amet consectetur"
        />
      </div>

      <div className="w-full mt-7 px-4">
        <p className="mb-4 font-medium opacity-60">Theme</p>
        <ThemeSelector
          action={changeUserAppearance}
          defaultValue={
            userAppearance ?? theme?.includes("light")
              ? userThemeSchema[0].value
              : userThemeSchema[1].value
          }
          schema={userThemeSchema}
        />
      </div>
    </section>
  );
};

export default UserSettings;
