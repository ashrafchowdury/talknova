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


const Register = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Get Sarted</Button>
        </DialogTrigger>
        <DialogContent className="w-[400px] border-none p-12">
          <Tabs defaultValue="login" className="w-[400px] mx-auto">
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
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Username" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email Addrese" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Create Account</Button>
                </CardFooter>
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
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email or Username</Label>
                    <Input id="email" placeholder="Add Email or Username" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Log In</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
