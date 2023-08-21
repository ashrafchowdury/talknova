"use client";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Switch,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui";

import {
  GearIcon,
  BellIcon,
  PlusCircledIcon,
  MagnifyingGlassIcon,
  LockClosedIcon,
  PaperPlaneIcon,
  ImageIcon,
  MixerVerticalIcon,
  MixIcon,
  DashboardIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import Notification from "@/components/Notification";
import Invite from "@/components/Invite";
import Users from "@/components/Users";

const Chats = () => {
  return (
    <main className="flex justify-center">
      <aside className=" xl:w-[380px] h-[98vh] ml-5 mt-2 flex flex-col justify-between">
        <div>
          <nav className="h-[60px] flex items-center justify-between border-b">
            <h1 className=" text-2xl font-bold">Inbox</h1>
            <div>
              <Button
                variant="ghost"
                title="Search Users"
                className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>
              <Notification />
              <Invite>
                <Button
                  variant="ghost"
                  title="Invite Friends"
                  className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
                >
                  <PlusCircledIcon className="w-5 h-5" />
                </Button>
              </Invite>
              <Button
                variant="ghost"
                title="Settings"
                className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
              >
                <GearIcon className="w-5 h-5" />
              </Button>
            </div>
          </nav>

          <section className="w-[98%] mt-8">
            <Users />
            <Users />
            <Users />
          </section>
        </div>

        <Invite>
          <Button className=" w-[98%]">
            <PlusCircledIcon className="w-5 h-5 mr-2" />
            Invite Friends
          </Button>
        </Invite>
      </aside>

      <main className=" w-[900px] h-[98vh] border-x mt-2">
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

      <section className="w-[350px] h-[98vh]">
        <nav className="h-[60px] mt-2 px-8 border-b flex items-center justify-between">
          <p className=" text-xl font-bold">Settings</p>
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

          <div className="w-full flex items-center justify-between mb-7">
            <div className="mr-5">
              <p className="text-[16px] font-bold mb-1">Enable Encryption</p>
              <p className="text-xs opacity-60 -mt-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <Switch />
          </div>
          <div className="w-full flex items-center justify-between mb-7">
            <div className="mr-5">
              <p className="text-[16px] font-bold mb-1">Auto Lock</p>
              <p className="text-xs opacity-60 -mt-1">
                Lorem ipsum, dolor sit amet consectetur dolor sit amet
                consectetur
              </p>
            </div>
            <Switch />
          </div>
          <div className="w-full flex items-center justify-between mb-7">
            <div className="mr-5">
              <p className="text-[16px] font-bold mb-1">Lorem Ipsum</p>
              <p className="text-xs opacity-60 -mt-1">
                Lorem ipsum, dolor sit amet consectetur
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="w-full mt-7 px-4">
          <p className="mb-4 font-medium opacity-60">Theme</p>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colours</SelectLabel>
                <SelectItem value="apple">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-3 h-3 rounded-sm bg-black mr-2"></div>
                    Black
                  </div>
                </SelectItem>
                <SelectItem value="banana">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
                    Blue
                  </div>
                </SelectItem>
                <SelectItem value="blueberry">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
                    Red Rose
                  </div>
                </SelectItem>
                <SelectItem value="grapes">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-3 h-3 rounded-sm bg-green-600 mr-2"></div>
                    Green Leave
                  </div>
                </SelectItem>
                <SelectItem value="pineapple">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-3 h-3 rounded-sm bg-orange-500 mr-2"></div>
                    Orange
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
    </main>
  );
};

export default Chats;
