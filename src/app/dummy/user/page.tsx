"use client";

import { useState, useEffect, Fragment } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/packages/ui/resizable";
import { Avatar } from "@/components";
import { Button, Input } from "@/packages/ui";
import {
  Settings,
  Send,
  Image,
  Smile,
  MessageCircle,
  User2,
  UserCheck,
} from "lucide-react";
import { VercelLogoIcon } from "@radix-ui/react-icons";
import AllUsers from "../components/all-users";
import Requests from "../components/requests";
import { User as UserType } from "@/lib/types";
import { useSearchParams } from "next/navigation";

type Chats = {
  message?: string;
  id?: string;
  chatId?: string;
  createdAt: any;
};

const User = () => {
  const [friends, setFriends] = useState<UserType[]>([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chats[]>([]);

  const searchParams = useSearchParams();

  const getData = async () => {
    try {
      const res = await fetch("/api/user/friends");
      const data = await res.json();

      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectChatUser = async (userId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("userId", userId);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleSendMessage = async (chatUserId: string) => {
    try {
      const sendMessage = await fetch(`/api/user/chats/${chatUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel defaultSize={4} minSize={4} maxSize={4}>
          <section className="flex flex-col items-center py-5">
            <VercelLogoIcon className="w-7 h-7 mb-9 mt-1" />
            <div className="w-full flex flex-col items-center space-y-3">
              <Button size="icon" variant="ghost" className="w-12 h-12">
                <MessageCircle className="w-6 h-6" />
              </Button>

              <AllUsers>
                <Button size="icon" variant="ghost" className="w-12 h-12">
                  <User2 className="w-6 h-6" />
                </Button>
              </AllUsers>

              <Requests>
                <Button size="icon" variant="ghost" className="w-12 h-12">
                  <UserCheck className="w-6 h-6" />
                </Button>
              </Requests>

              <Button size="icon" variant="ghost" className="w-12 h-12">
                <Settings className="w-6 h-6" />
              </Button>
            </div>
          </section>
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel defaultSize={40}>
          <nav className="w-full h-[70px] flex items-center border-b px-4">
            <h1 className="text-xl font-semibold">Inbox</h1>
          </nav>
          <section className="flex flex-col px-4 mt-8">
            {friends?.map((user) => (
              <div
                className="flex items-center space-x-2 py-3 px-3 border rounded-md cursor-pointer"
                key={user.id}
                onClick={() => handleSelectChatUser(user.id)}
              >
                <Avatar
                  fallback={user.name}
                  img={user.image}
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-lg font-medium">{user.name}</p>{" "}
                  <p className="text-sm">
                    {user.bio ??
                      "Lorem ipsum dolor sit amet, consectetur adipisicing."}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel defaultSize={50} className="relative h-screen">
          {friends
            ?.filter((user) => user.id == searchParams.get("userId"))
            .map((user) => (
              <Fragment key={user.id}>
                <nav className="w-full h-[70px] flex items-center justify-between border-b px-4 sticky top-0">
                  <div className="flex items-center space-x-2">
                    <Avatar
                      fallback={user.name}
                      img={user.image}
                      className="w-9 h-9 text-sm"
                    />
                    <h1 className="text-lg font-medium">{user.name}</h1>
                  </div>

                  <Button size="icon" variant="ghost" className="w-9 h-9">
                    <Settings className="w-5 h-5" />
                  </Button>
                </nav>

                <section className="w-full absolute bottom-3 px-4 flex items-center space-x-2">
                  <div className="w-full relative">
                    <Input
                      placeholder="Write message..."
                      className="h-[45px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="absolute top-[6px] right-2 z-20 flex items-center space-x-2 opacity-80">
                      <Button size="icon" variant="ghost" className="w-8 h-8">
                        <Smile className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8">
                        <Image className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="h-[45px] w-[45px]"
                    onClick={() => handleSendMessage(user.id)}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </section>
              </Fragment>
            ))}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default User;
