"use client";
import { useState } from "react";
import { Button, Input, useToast } from "@/packages/ui";
import {
  BackSpace,
  ToggleSwitch,
  ThemeSelector,
  Avatar,
  ImageUpload,
} from "@/components/ui";
import { useTheme } from "next-themes";
import { useAuth, useUsers } from "@/provider";

const Settings = () => {
  const [detailes, setDetailes] = useState({ name: "", bio: "" });
  const { logout, isLoading, currentUser } = useAuth();
  const { updateUserProfile, myself } = useUsers();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  const handleUpdateProfile = () => {
    if (detailes.name.length > 0 && detailes.name.length < 2) {
      toast({
        title: "Name must have to be more than one character",
        variant: "destructive",
      });
    } else if (detailes.bio.length > 0 && detailes.bio.length < 10) {
      toast({
        title: "Bio must have to be more than 10 characters",
        variant: "destructive",
      });
    } else if (myself.name === detailes.name || myself.bio == detailes.bio) {
      toast({
        title: "Nname & Bio must have to be different from before",
        variant: "destructive",
      });
    } else {
      try {
        updateUserProfile("", detailes.name, detailes.bio);
        setDetailes({ name: "", bio: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <main className=" w-[95%] sm:w-[520px] md:w-[720px] lg:w-[1050px] mx-auto">
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
          title="Turn on Dark mood"
          desc="Lorem ipsum, dolor sit amet consectetur  dolor sit amet"
          action={toggleTheme}
          checked={theme == "light" ? false : true}
        />
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
        <ToggleSwitch
          title="Block"
          desc="Lorem ipsum, dolor sit amet consectetur dolor sit amet  dolor sit amet consectetur dolor sit amet"
          badge="Beta"
        />
        <div className="w-full mt-7">
          <p className="mb-4 font-medium opacity-60">Appereance</p>
          <ThemeSelector />
        </div>
      </div>

      <div className="flex items-center justify-center mt-20 mb-6">
        <Button
          variant="destructive"
          className="w-full md:w-[98%] py-5"
          onClick={() => logout()}
          load={isLoading}
        >
          Log Out
        </Button>
      </div>
    </main>
  );
};

export default Settings;
