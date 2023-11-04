"use client";
import { FormEvent } from "react";
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
import { useAuth } from "@/packages/server/context/AuthContext";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useToast } from "@/packages/ui";

const Register = () => {
  const { singup, login, forget, isLoading } = useAuth();
  const { toast } = useToast();

  const hnadleForms = (
    e: any,
    form: number[],
    authFunction: (...args: string[]) => void
  ) => {
    e.preventDefault();
    const value = form.map((data) => e.target[data].value);

    if (value.some((data) => !data)) {
      toast({ variant: "destructive", title: "Please fill up all the fildes" });
    } else {
      authFunction(...value);
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
            <TabsList className="w-full h-auto">
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
                  <form
                    onSubmit={(e) => hnadleForms(e, [0, 1, 2], singup)}
                    className="space-y-3"
                  >
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
                    <Button className="!mt-8 w-full" load={isLoading}>
                      Create Account
                    </Button>
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
                  <form
                    onSubmit={(e) => hnadleForms(e, [0, 1], login)}
                    className="space-y-3"
                  >
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
                    <TabsList className="w-auto h-auto bg-transparent">
                      <TabsTrigger
                        value="forget"
                        className="bg-transparent p-0"
                      >
                        Forget Password!
                      </TabsTrigger>
                    </TabsList>
                    <Button className="!mt-8 w-full" load={isLoading}>
                      Log In
                    </Button>
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
                    onSubmit={(e) => hnadleForms(e, [0], forget)}
                    className="space-y-1 relative"
                  >
                    <Label htmlFor="email">Email</Label>
                    <EnvelopeClosedIcon className="w-4 h-4 absolute top-[34px] left-[11px]" />
                    <Input
                      type="email"
                      placeholder="Email Addrese"
                      className="px-9"
                    />
                    <Button className="!mt-8 w-full" load={isLoading}>
                      Forget Password
                    </Button>
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
