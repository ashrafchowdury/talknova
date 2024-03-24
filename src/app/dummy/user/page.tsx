"use client";

import { useState, useEffect, Fragment } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/packages/ui/resizable";
import { Avatar } from "@/components";
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/packages/ui";
import {
  Settings,
  Send,
  Image,
  Smile,
  MessageCircle,
  User2,
  UserCheck,
  EllipsisVertical,
} from "lucide-react";
import { VercelLogoIcon, Cross1Icon } from "@radix-ui/react-icons";
import AllUsers from "../components/all-users";
import Requests from "../components/requests";
import { User as UserType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import ReloadButton from "../components/reload-button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/functions";
import MessageMenu from "../components/message-menu";

type ChatMedia = {
  url: string[];
  type: string;
  messageId: string;
};
export type Chats = {
  message: string;
  id: string;
  chatId: string;
  createdAt: any;
  senderId: string;
  quote: string | null;
  reaction: string | null;
  medias: ChatMedia;
};

type MsgReply = {
  message: string;
  messageId: string;
};

const reactions = [
  { react: "💘", title: "love" },
  { react: "😔", title: "sad" },
  { react: "🥳", title: "celebrate" },
  { react: "👎", title: "down" },
];

const User = () => {
  const [friends, setFriends] = useState<UserType[]>([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chats[]>([]);
  const [msgReply, setMsgReply] = useState<MsgReply | null>(null);

  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const getData = async () => {
    try {
      const res = await fetch("/api/user/friends");
      const data = await res.json();

      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChatUser = async (userId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("userId", userId);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleSendMessage = async (chatUserId: string) => {
    try {
      const sendMessage = await fetch(
        `/api/user/chats/${searchParams.get("userId")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            quote: msgReply?.messageId,
          }),
        }
      );

      const data = await sendMessage.json();

      setChats([...chats, data]);
      msgReply && setMsgReply(null);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChats = async (chatUserId: string) => {
    try {
      const res = await fetch(`/api/user/chats/${searchParams.get("userId")}`);
      const data = await res.json();
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (chatUserId: string, msgId: string[]) => {
    try {
      const res = await fetch(`/api/user/chats/${searchParams.get("userId")}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageIds: msgId }),
      });

      if (!res.ok) {
        toast.error("Enable to delete messages, please try later");
      }

      setChats((prev) =>
        prev.filter((chat) => !msgId.includes(chat.id as string))
      );
      toast("Message got deleted successfully 🥳");
    } catch (error) {
      console.log(error);
    }
  };

  const addReaction = async (
    chatUserId: string,
    msgId: string,
    reaction: string | null
  ) => {
    try {
      const res = await fetch(`/api/user/chats/${chatUserId}/reaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId: msgId, reaction }),
      });

      if (!res.ok) {
        toast.error("Enable to delete messages, please try later");
        return;
      }
      const data = await res.json();

      const updatedReaction = chats.map((chat) => {
        if (chat.id == data.id) {
          return { ...chat, reaction: data.reaction };
        }
        return chat;
      });

      setChats(updatedReaction);
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
          <nav className="w-full h-[70px] flex items-center border-b px-4 space-x-3">
            <h1 className="text-xl font-semibold">Inbox</h1>
            <ReloadButton action={() => getData()} />
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

                <section className="w-full mt-10 mb-24 px-5 space-y-5">
                  {chats?.map((chat) => {
                    const chatUser = chat.senderId == user.id;
                    return (
                      <>
                        <div
                          className={cn(
                            "flex flex-row-reverse items-end space-x-2",
                            chatUser && "flex-row"
                          )}
                        >
                          <Avatar
                            fallback={
                              chatUser
                                ? user.name
                                : (session?.user?.name as string)
                            }
                            img={
                              chatUser
                                ? user.image
                                : (session?.user?.image as string)
                            }
                            className="w-5 h-5 text-[8px] ml-2"
                          />
                          <div className="flex flex-col relative">
                            {chat.quote && (
                              <div className="border-x border-t rounded-t-md py-1 px-3 ml-2">
                                {chats
                                  .filter((item) => chat.quote == item.id)
                                  .map((item) => (
                                    <p className="italic opacity-60 text-sm">
                                      {item.message}
                                    </p>
                                  ))}
                              </div>
                            )}
                            {chat.reaction && (
                              <span
                                className={cn(
                                  "absolute -bottom-3 z-20 p-[1px] border rounded-md text-sm bg-secondary",
                                  chatUser ? "-right-1" : "-left-1"
                                )}
                              >
                                {
                                  reactions.filter(
                                    (item) => item.title == chat.reaction
                                  )[0]?.react
                                }
                              </span>
                            )}

                            <div
                              className={cn(
                                "py-2 px-4 border rounded-md cursor-pointer",
                                chatUser && "bg-primary text-white"
                              )}
                            >
                              <p>{chat.message}</p>
                            </div>
                          </div>
                          <MessageMenu
                            user={user}
                            chat={chat}
                            deleteMessage={deleteMessage}
                            setMsgReply={setMsgReply}
                            addReaction={addReaction}
                            isMainUser={true}
                          />
                        </div>
                      </>
                    );
                  })}
                </section>

                <section className="w-full absolute bottom-3 px-4 flex items-center space-x-2">
                  <div className="w-full relative">
                    {msgReply?.messageId && (
                      <div className="w-full absolute -top-10 left-0 border-t border-x rounded-md pt-2 pb-3 px-3 flex items-center justify-between">
                        <p className="italic opacity-60">
                          {"> "}
                          {msgReply.message}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-6 h-6"
                          onClick={() => setMsgReply(null)}
                        >
                          <Cross1Icon className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    <Input
                      placeholder="Write message..."
                      className="h-[45px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="absolute top-[6px] right-2 z-20 flex items-center space-x-2 opacity-80">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => getAllChats(user.id)}
                      >
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
