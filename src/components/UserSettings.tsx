import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Switch,
} from "@/packages/ui";
import { ImageIcon, DashboardIcon, FileTextIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/functions";
import { ClassType } from "@/types";
import { ThemeSelector, ToggleSwitch, BackSpace } from "./ui";

const UserSettings = ({ className }: ClassType) => {
  return (
    <section className={cn("h-[98vh]", className)}>
      <nav className="h-[60px] mt-2 xl:px-8 border-b flex items-center justify-start">
        <BackSpace className="flex xl:hidden" />
        <p className=" text-xl font-bold ml-3 xl:ml-0">Settings</p>
      </nav>

      <div className="flex flex-col items-center justify-center mt-6 px-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/preview_three.png" alt="@shadcn" />
        </Avatar>

        <p className="text-xl font-bold mt-2 mb-1">Ashraf Chowdury</p>
        <p className="w-[90%] text-sm text-center opacity-60">
          Lorem ipsum dolor sit amet consectetur this is elit.
        </p>
      </div>

      <div className="w-full mt-7 px-4">
        <p className="mb-4 font-medium opacity-60">Medias</p>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            title="Shared Imgaes"
            className="h-14 w-full hover:bg-slate-200 duration-300"
          >
            <ImageIcon className="w-7 h-7" />
          </Button>
          <Button
            variant="outline"
            title="Shared Files"
            className="h-14 w-full hover:bg-slate-200 duration-300"
          >
            <FileTextIcon className="w-7 h-7" />
          </Button>
          <Button
            variant="outline"
            title="Share QR-Code"
            className="h-14 w-full hover:bg-slate-200 duration-300"
          >
            <DashboardIcon className="w-7 h-7" />
          </Button>
        </div>
      </div>

      <div className="w-full mt-7 px-4">
        <p className="mb-4 font-medium opacity-60">Settings</p>
        <ToggleSwitch
          title="Enable Encryption"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
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
        <ThemeSelector />
      </div>
    </section>
  );
};

export default UserSettings;