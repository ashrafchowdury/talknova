"use client";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@/packages/ui";
import { BackSpace, ToggleSwitch, ThemeSelector } from "@/components/ui";
import { useAuth } from "@/provider";

const Settings = () => {
  const { logout, isLoading, currentUser } = useAuth();
  return (
    <main className=" w-[95%] sm:w-[520px] md:w-[720px] lg:w-[1050px] mx-auto">
      <nav className="h-[60px] border-b flex items-center justify-start">
        <BackSpace />
        <p className=" text-xl font-bold ml-3">Settings</p>
      </nav>

      <div className="flex flex-col items-center justify-center mt-6 px-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={currentUser.photoURL} alt="@shadcn" />
          <AvatarFallback className=" text-2xl font-bold w-full h-full bg-slate-300 uppercase">
            {currentUser.displayName?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <Input
          placeholder="Username"
          defaultValue={currentUser.displayName}
          className="border-none w-[80%] md:w-[60%] text-xl text-center font-bold mt-2 mb-1"
        />
        <Input
          placeholder="Short bio"
          defaultValue="Lorem ipsum dolor sit amet consectetur this is elit."
          className="border-none w-[90%] md:w-[80%] text-sm text-center opacity-60"
          max={25}
        />
      </div>

      <div className="w-full mt-7 md:px-4">
        <p className="mb-4 font-medium opacity-60">Settings</p>
        <ToggleSwitch
          title="Enable Encryption"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          className="mb-8"
        />
        <ToggleSwitch
          title="Auto Lock"
          desc="Lorem ipsum, dolor sit amet consectetur dolor sit amet consectetur"
          className="mb-8"
        />
        <ToggleSwitch
          title="Lorem Ipsum"
          desc="Lorem ipsum, dolor sit amet consectetur"
          className="mb-8"
        />
        <ToggleSwitch
          title="Theme Light/Dark"
          desc="Lorem ipsum, dolor sit amet consectetur  dolor sit amet"
          className="mb-8"
        />
        <ToggleSwitch
          title="Active state"
          desc="Lorem ipsum, dolor sit amet consectetur  dolor sit amet"
          className="mb-8"
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
