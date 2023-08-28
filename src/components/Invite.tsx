"use client";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui";
import { AvatarImg, InviteUsers } from "./ui";
import { ChildrenType } from "@/types";
import { useUsers } from "@/provider";
import { useToast } from "@/packages/ui";

const Invite = ({ children }: ChildrenType) => {
  const [selectedInvitation, setSelectedInvitation] = useState<any>([]);
  const { getAllUsers, user, inviteUser } = useUsers();
  const { toast } = useToast();

  const handleInviteUsers = () => {
    selectedInvitation.map((email: string) => inviteUser(email));
    toast({ title: "Sended Request Successfully" });
  };
  const addUsers = (email: string) => {
    setSelectedInvitation([...selectedInvitation, email]);
  };
  const removeUsers = (email: string) => {
    setSelectedInvitation(() =>
      selectedInvitation.filter((val: any) => val !== email)
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger
          asChild
          onClick={() => user.length == 0 && getAllUsers()}
        >
          {children}
        </DialogTrigger>
        <DialogContent className="w-[95%]  sm:max-w-[580px]">
          <DialogHeader>
            <DialogTitle>Search & Invite Friends</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>

          <Command className="rounded-lg border shadow-md h-[600px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {selectedInvitation.length > 0 && (
                <>
                  <CommandGroup heading="Selected Friends" className="py-2">
                    {user
                      .filter((data: any) => {
                        return selectedInvitation.includes(data.id);
                      })
                      .map((data: any) => (
                        <InviteUsers
                          data={data}
                          onclick={removeUsers}
                          button="Remove"
                        />
                      ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandGroup heading="Suggestions" className="py-2">
                {user
                  .filter((data: any) => {
                    return !selectedInvitation.includes(data.id);
                  })
                  .map((data: any) => (
                    <InviteUsers data={data} onclick={addUsers} button="Add" />
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              onClick={handleInviteUsers}
            >
              Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Invite;
