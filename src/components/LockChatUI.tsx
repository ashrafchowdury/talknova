import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Input,
  Label,
  Switch,
} from "@/packages/ui";
import { useEncrypt } from "@/packages/encryption";
import { UserType } from "@/packages/server";
import { useChats } from "@/packages/server/context/ChatContext";

const LockChatUI = ({ user }: { user: UserType }) => {
  const [value, setValue] = useState("");
  const { setKey, setIsAutoLock } = useEncrypt();
  const { toggleChatKey } = useChats();

  const handleEncryption = () => {
    if (value && user?.key == value) {
      toggleChatKey("");
      setIsAutoLock(false);
    } else if (value && !user?.key) {
      toggleChatKey(value);
    }
    setValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setKey("")}>
        <div className="w-full flex items-center justify-between mb-7">
          <div className="mr-5">
            <p className="text-[16px] font-bold mb-1">Lock Chat</p>
            <p className="text-xs opacity-60 -mt-1">
              Add pasword to unloack chats with this user.
            </p>
          </div>
          <Switch
            defaultChecked={Boolean(user?.key)}
            checked={Boolean(user?.key)}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add a secret key</DialogTitle>
          <DialogDescription>
            Add a secret key to lock the messages
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 mb-6">
          <Label htmlFor="key">Add Key</Label>
          <Input
            id="key"
            placeholder="Add a secrect key"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" className="w-full" onClick={handleEncryption}>
              {user?.key ? "Disable" : "Lock Chats"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LockChatUI;
