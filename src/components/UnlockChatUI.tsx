import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/packages/ui";
import { QuestionMark } from ".";
import { Cross1Icon, LockClosedIcon } from "@radix-ui/react-icons";
import { UserType } from "@/packages/server";
import { useEncrypt } from "@/packages/encryption";

const UnlockChatUI = ({ user }: { user: UserType }) => {
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

export default UnlockChatUI;
