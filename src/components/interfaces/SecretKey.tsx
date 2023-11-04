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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Switch,
} from "@/packages/ui";
import { QuestionMark } from ".";
import { Cross1Icon, LockClosedIcon } from "@radix-ui/react-icons";
import { useEncrypt } from "@/packages/encryption";
import { UserType } from "@/packages/server/types";
import { useChats } from "@/packages/server/context/ChatContext";

const SecretKey = ({ user }: { user: UserType }) => {
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

export default SecretKey;

export const AddSecretKey = ({ user }: { user: UserType }) => {
  const [value, setValue] = useState("");
  const { setKey, setToggleLockUi, setIsAutoLock, toggleLockUi } = useEncrypt();

  const handleDecryption = () => {
    if (value && value == user?.key) {
      setKey(value);
      setToggleLockUi(false);
      setIsAutoLock(false);
    }
  };
  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        className=" absolute top-4 md:top-3 right-4 md:right-9 z-50 w-7 md:w-8 h-7 md:h-8"
        onClick={() => setToggleLockUi(!toggleLockUi)}
      >
        {toggleLockUi ? (
          <Cross1Icon className="w-4 md:w-5 h-4 md:h-5" />
        ) : (
          <LockClosedIcon className="w-4 md:w-5 h-4 md:h-5" />
        )}
      </Button>
      {toggleLockUi && (
        <section className="absolute top-0 bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Card className="w-[95%] sm:w-[320px] md:w-[450px]">
            <CardHeader>
              <CardTitle className=" flex items-center">
                Unlock Messages
                <QuestionMark
                  title="What is Secret Key?"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam culpa rerum assumenda ratione inventore odio deserunt commodi voluptatum, et dolorem."
                  className="ml-2"
                />
              </CardTitle>
              <CardDescription>
                Add the key to unlock the messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 mb-2">
              <Label htmlFor="key">Add Key</Label>
              <Input
                id="key"
                placeholder="Add your secrect key"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                onClick={handleDecryption}
              >
                Unlock Message
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}
    </>
  );
};
