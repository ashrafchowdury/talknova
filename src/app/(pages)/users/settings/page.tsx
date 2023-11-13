"use client";

import { Button, Skeleton } from "@/packages/ui";
import { FileTextIcon } from "@radix-ui/react-icons";
import {
  ThemeSelector,
  ToggleSwitch,
  BackSpace,
  SecretKey,
  Avatar,
  AllImages,
} from "@/components/interfaces";
import { useUsers } from "@/packages/server/context/UserContext";
import { useAppearance } from "@/lib/hooks";
import { useTheme } from "next-themes";
import { userThemeSchema } from "@/lib/helpers";
import { useSearchParams, useRouter } from "next/navigation";
import { UserType } from "@/packages/server/types";

const UserSetting = () => {
  const id: any = useSearchParams().get("id");
  const { friends } = useUsers();
  const { userAppearance, changeUserAppearance } = useAppearance();
  const { theme } = useTheme();
  const user: UserType = friends.filter((item) => item.uid == id)[0];

  return (
    <section className="h-auto md:h-screen md:px-4 md:border-x relative">
      <nav className="h-[60px] border-b flex items-center justify-start">
        <BackSpace href={`/users/chats?id=${user?.uid}`} />
        <p className=" text-xl font-bold ml-3">Settings</p>
      </nav>

      <div className="flex flex-col items-center justify-center mt-6 px-4">
        <Avatar
          img={user?.image}
          fallback={user?.name}
          className="w-24 h-24 text-3xl"
        />

        <p className="text-xl font-bold mt-2 mb-1 capitalize">{user?.name}</p>
        <p className="w-[90%] text-sm text-center opacity-60">{user?.bio}</p>
        {!user?.name && (
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
        <SecretKey user={user} />

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

export default UserSetting;
