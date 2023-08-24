"use client";
import {
  Input,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/packages/ui";
import { useAuth } from "@/provider";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useToast } from "@/packages/ui";

const Register = () => {
  const { singup, login, forget } = useAuth();
  const { toast } = useToast();

  const handleSingUp = (e: any) => {
    e.preventDefault();
    const name: string = e.target[0].value;
    const email: string = e.target[1].value;
    const password: string = e.target[2].value;

    if (!name || !email || !password) {
      toast({ variant: "destructive", title: "Pleace fill up all the fildes" });
    } else {
      singup(name, email, password);
    }
  };
  const handleLogIn = (e: any) => {
    e.preventDefault();
    const email: string = e.target[0].value;
    const password: string = e.target[1].value;

    if (!email || !password) {
      toast({ variant: "destructive", title: "Pleace fill up all the fildes" });
    } else {
      login(email, password);
    }
  };
  const handleForgetPass = (e: any) => {
    e.preventDefault();
    const email: string = e.target[0].value;

    if (!email) {
      toast({ variant: "destructive", title: "Pleace fill up all the fildes" });
    } else {
      forget(email);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Get Sarted</Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] sm:w-[400px] border-none px-4 py-10 sm:p-12">
          <Tabs defaultValue="login" className="w-full sm:w-[400px] mx-auto">
            <TabsList className="w-full h-auto bg-slate-200">
              <TabsTrigger value="signup" className="w-full py-2">
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="login" className="w-full py-2">
                Log In
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero, ea!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSingUp} className="space-y-3">
                    <div className="space-y-1 relative">
                      <Label htmlFor="name">Name</Label>
                      <PersonIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
                      <Input
                        type="text"
                        placeholder="Username"
                        className="px-8"
                        required
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <Label htmlFor="email">Email</Label>
                      <EnvelopeClosedIcon className="w-4 h-4 absolute bottom-[10px] left-[11px]" />
                      <Input
                        type="email"
                        placeholder="Email Addrese"
                        className="px-9"
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <Label htmlFor="password">Password</Label>
                      <LockClosedIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="px-8"
                      />
                    </div>
                    <Button className=" !mt-8 w-full">Create Account</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Log In</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptate sunt vitae animi!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogIn} className="space-y-3">
                    <div className="space-y-1 relative">
                      <Label htmlFor="email">Email</Label>
                      <EnvelopeClosedIcon className="w-4 h-4 absolute bottom-[10px] left-[11px]" />
                      <Input
                        type="email"
                        placeholder="Email Addrese"
                        className="px-9"
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <Label htmlFor="password">Password</Label>
                      <LockClosedIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="px-8"
                      />
                    </div>
                    <TabsList className="w-auto h-auto">
                      <TabsTrigger
                        value="forget"
                        className=" bg-transparent p-0"
                      >
                        Forget Password!
                      </TabsTrigger>
                    </TabsList>

                    <Button className=" !mt-8 w-full">Log In</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forget">
              <Card>
                <CardHeader>
                  <CardTitle>Forget Password</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptate sunt vitae animi!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleForgetPass}
                    className="space-y-1 relative"
                  >
                    <Label htmlFor="email">Email</Label>
                    <EnvelopeClosedIcon className="w-4 h-4 absolute top-[34px] left-[11px]" />
                    <Input
                      type="email"
                      placeholder="Email Addrese"
                      className="px-9"
                    />

                    <Button className=" !mt-8 w-full">Forget Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
