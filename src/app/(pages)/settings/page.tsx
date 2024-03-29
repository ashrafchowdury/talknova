"use client";
import { useState } from "react";
import { Button, Input, Separator } from "@/packages/ui";
import {
  BackSpace,
  ToggleSwitch,
  ThemeSelector,
  Avatar,
  ImageUpload,
} from "@/components";
import { useTheme } from "next-themes";
import { useAuth } from "@/packages/server/context/AuthContext";
import { useUsers } from "@/packages/server/context/UserContext";
import { toggleTheme } from "@/lib/functions";
import { themeSchema } from "@/lib/helpers";
import { toast } from "sonner";

const Settings = () => {
  const [detailes, setDetailes] = useState({ name: "", bio: "" });
  const { logout, isLoading } = useAuth();
  const { updateUserProfile, myself, activeStatus } = useUsers();
  const { theme, setTheme } = useTheme();

  const handleUpdateProfile = () => {
    if (detailes.name.length > 0 && detailes.name.length < 2) {
      toast.error("Name must have to be more than one character");
    } else if (detailes.bio.length > 0 && detailes.bio.length < 10) {
      toast.error("Bio must have to be more than 10 characters");
    } else if (myself.name === detailes.name || myself.bio == detailes.bio) {
      toast.error("Name & Bio must have to be different from before");
    } else {
      try {
        updateUserProfile("", detailes.name, detailes.bio);
        setDetailes({ name: "", bio: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeColorScheme = (color: string) => {
    const which = theme?.split("-") as string[];
    setTheme(`${which[0]}-${color}`);
  };

  return (
    <main className="md:px-4 md:border-x h-screen">
      <nav className="h-[60px] border-b flex items-center justify-start">
        <BackSpace href="/users" />
        <p className=" text-xl font-bold ml-3">Settings</p>
      </nav>

      <div className="flex flex-col items-center justify-center mt-10 px-4">
        <ImageUpload type="profile">
          <button>
            <Avatar
              img={myself.image}
              fallback={myself.name}
              className="text-3xl cursor-pointer"
            />
          </button>
        </ImageUpload>

        <Input
          placeholder="Username"
          defaultValue={myself.name}
          className="border-none w-[80%] md:w-[60%] text-xl text-center font-bold mt-2 mb-1"
          onChange={(e) => setDetailes({ ...detailes, name: e.target.value })}
          maxLength={15}
        />
        <Input
          placeholder="Short bio"
          defaultValue={myself.bio}
          className="border-none w-[90%] md:w-[80%] text-sm text-center opacity-60"
          maxLength={50}
          onChange={(e) => setDetailes({ ...detailes, bio: e.target.value })}
        />

        {detailes.name.length >= 2 || detailes.bio.length >= 2 ? (
          <Button className=" mt-8 font-bold" onClick={handleUpdateProfile}>
            Save
          </Button>
        ) : null}
      </div>

      <div className="w-full mt-7 md:px-4">
        <p className="mb-4 font-medium opacity-60">Settings</p>
        <ToggleSwitch
          title="Active state"
          desc="Lorem ipsum, dolor sit amet consectetur  dolor sit amet"
          badge="Beta"
        />
        <ToggleSwitch
          title="Block Notifications"
          desc="Lorem ipsum, dolor sit amet consectetur dolor sit amet  dolor sit amet consectetur dolor sit amet"
          badge="Beta"
        />

        <Separator className="my-8" />

        <div className="w-full">
          <p className="mb-5 font-medium opacity-60">App Appereance</p>
          <ToggleSwitch
            title="Turn on Dark mood"
            desc="Lorem ipsum, dolor sit amet consectetur  dolor sit amet"
            action={() => toggleTheme(theme, setTheme)}
            checked={theme?.includes("light") ? false : true}
            className="!mb-9"
          />
          <ThemeSelector
            action={changeColorScheme}
            defaultValue={theme?.split("-")[1] as string}
            schema={themeSchema}
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-20 md:mt-28 !mb-6">
        <Button
          variant="destructive"
          className="w-full md:w-[98%] py-5"
          onClick={() => {
            logout();
            activeStatus(false);
          }}
          load={isLoading}
        >
          Log Out
        </Button>
      </div>
    </main>
  );
};

export default Settings;
