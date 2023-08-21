import {
  GearIcon,
  LockClosedIcon,
  PaperPlaneIcon,
  ImageIcon,
  MixerVerticalIcon,
  MixIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@/packages/ui";
import { useUI } from "@/provider";
import { cn } from "@/lib/functions";
import { ClassType } from "@/types";

const Chat = ({ className }: ClassType) => {
  const { windowSize } = useUI();
  return (
    <main className={cn("h-[98vh] border-x mt-2", className)}>
      <nav className="h-[60px] px-8 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="/preview_three.png" alt="@shadcn" />
          </Avatar>
          <div className="ml-2">
            <p className="text-lg font-bold ">Ashraf Chowdury</p>
            <p className="text-sm opacity-60 -mt-1">Typing...</p>
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            title="Settings"
            className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
            // onClick={() => windowSize }
          >
            <GearIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            title="Random"
            className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
          >
            <LockClosedIcon className="w-5 h-5" />
          </Button>
        </div>
      </nav>
      <article className=" w-full h-[86.5vh]"></article>
      <section className="mx-8 relative">
        <Input
          placeholder="Type a Message..."
          className=" !py-6 text-[16px] border border-black pr-16"
        />
        <div className=" flex items-center space-x-3 absolute top-[7px] right-2">
          <Button
            title="Emoji"
            variant="ghost"
            className="py-[2px] px-2 hover:bg-slate-200 duration-300"
          >
            <MixIcon className="w-4 h-4" />
          </Button>
          <Button
            title="Select Media"
            variant="ghost"
            className="py-[2px] px-2 hover:bg-slate-200 duration-300"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          {/* <Button title="Record Voice" className="py-0 px-3">
              <MixerVerticalIcon className="w-4 h-4" />
            </Button> */}
          <Button title="Send Message" className="py-0 px-3">
            <PaperPlaneIcon className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
