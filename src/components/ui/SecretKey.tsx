import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Switch,
} from "@/packages/ui";

const SecretKey = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Switch />
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
            <Input id="key" placeholder="Add a secrect key" />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Enable Encryption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SecretKey;
