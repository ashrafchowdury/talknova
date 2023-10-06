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
import { ChildrenType } from "@/types";
import { QuestionMark } from ".";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useEncrypt } from "@/packages/encryption";
import { useUsers } from "@/packages/server";

const SecretKey = () => {
  const [value, setValue] = useState("");
  const { setKey, setIsEncrypt, isEncrypt } = useEncrypt();
  const { selectedUser } = useUsers();

  const handleEncryption = () => {
    setKey(value);
    setValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex items-center justify-between mb-7">
          <div className="mr-5">
            <p className="text-[16px] font-bold mb-1">Enable Encryption</p>
            <p className="text-xs opacity-60 -mt-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <Switch defaultChecked={selectedUser?.encryption} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add a secret key</DialogTitle>
          <DialogDescription>
            Add a secret key to decrypt the messages
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
            <Button
              type="submit"
              className="w-full"
              onClick={() => (value ? handleEncryption() : null)}
            >
              Enable Encryption
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SecretKey;

export const AddSecretKey = () => {
  const [value, setValue] = useState("");
  const { setKey, setIsEncrypt, key } = useEncrypt();
  const { selectedUser } = useUsers();

  const handleDecryption = () => {
    if (value && value == selectedUser.key) {
      setKey(value);
      setIsEncrypt(false);
    }
  };
  return (
    <section className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
      {/* <Button
        variant="ghost"
        size="icon"
        className=" absolute top-5 right-6 w-6 md:w-7 h-6 md:h-7"
        onClick={() => setIsEncrypt(false)}
      >
        <Cross1Icon className="w-4 md:w-5 h-4 md:h-5" />
      </Button> */}
      <Card className="w-[95%] sm:w-[320px] md:w-[450px]">
        <CardHeader>
          <CardTitle className=" flex items-center">
            Dencrypt Message
            <QuestionMark
              title="What is Secret Key?"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam culpa rerum assumenda ratione inventore odio deserunt commodi voluptatum, et dolorem."
              className="ml-2"
            />
          </CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
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
          <Button type="submit" className="w-full" onClick={handleDecryption}>
            Dencrypt Message
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
