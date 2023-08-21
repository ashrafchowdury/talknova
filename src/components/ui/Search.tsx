import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Search = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            title="Search Users"
            className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px] border-none">
          <DialogHeader>
            <DialogTitle>Search Friends</DialogTitle>
          </DialogHeader>
          <div>
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup
                  heading="Friends"
                  className="h-48 overflow-y-auto"
                >
                  <CommandItem className="text-[16px]">
                    <span>Ashraf Cowdru</span>
                  </CommandItem>
                  <CommandItem className="text-[16px]">
                    <span>Lorem Ipsum</span>
                  </CommandItem>
                  <CommandItem className="text-[16px]">
                    <span>Madari</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Search;
