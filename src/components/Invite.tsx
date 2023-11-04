"use client";
import { useState, Fragment } from "react";
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
  DialogClose,
  useToast,
} from "@/packages/ui";
import { InviteUsers, InviteUsersSkeleton } from "./interfaces";
import { ChildrenType } from "@/types";
import { useUsers } from "@/packages/server/context/UserContext";

const Invite = ({ children }: ChildrenType) => {
  const [selectedInvitation, setSelectedInvitation] = useState<string[]>([]);
  const { getAllUsers, user, inviteUser, friends, invite } = useUsers();
  const { toast } = useToast();

  const handleInviteUsers = () => {
    selectedInvitation.map((email: string) => inviteUser(email));
    toast({ title: "Sended Request Successfully" });
    setSelectedInvitation([]);
  };
  const addUsers = (email: string) => {
    setSelectedInvitation([...selectedInvitation, email]);
  };
  const removeUsers = (email: string) => {
    setSelectedInvitation(() =>
      selectedInvitation.filter((data) => data !== email)
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

          <Command className="rounded-lg border shadow-md h-[60vh] md:h-[600px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {selectedInvitation.length > 0 && (
                <>
                  <CommandGroup
                    heading="Selected Friends"
                    className="py-1 md:py-2"
                  >
                    {user
                      .filter((data: any) =>
                        selectedInvitation.includes(data.id)
                      )
                      .map((data: any) => (
                        <Fragment key={data.uid}>
                          <InviteUsers
                            data={data}
                            onclick={removeUsers}
                            button="Remove"
                          />
                        </Fragment>
                      ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandGroup heading="Suggestions" className="py-1 md:py-2">
                {user.length == 0 && <InviteUsersSkeleton />}
                {user
                  .filter(
                    (data: any) =>
                      !friends.find((item: any) => item.uid == data.uid)
                  )
                  .filter(
                    (data: any) =>
                      !invite.find((item: any) => item.uid == data.uid)
                  )
                  .filter((data: any) => !selectedInvitation.includes(data.id))
                  .map((data: any) => (
                    <Fragment key={data.uid}>
                      <InviteUsers
                        data={data}
                        onclick={addUsers}
                        button="Add"
                      />
                    </Fragment>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <DialogFooter>
            <DialogClose>
              {selectedInvitation.length > 0 ? (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleInviteUsers}
                >
                  Invite
                </Button>
              ) : (
                <Button className="w-full">Close</Button>
              )}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Invite;
