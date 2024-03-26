"use client";

import { FormEvent, useState } from "react";
import {
  Input,
  Button,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/packages/ui";
import {
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  ReloadIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
} from "@radix-ui/react-icons";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const callbackURL = "http://localhost:3000/dummy";

  const handleForms = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    const res = await signIn("credentials", {
      [username.includes("@") ? "email" : "username"]: username,
      password: password,
      redirect: true,
      callbackUrl: callbackURL,
    });
  };

  const oAuth = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: callbackURL });
      setIsLoading(false);
    } catch (error) {
      toast.error(
        "Encounter error while triyng to login, please try again later"
      );
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ea!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleForms(e)} className="space-y-3">
            <div className="space-y-1 relative">
              <Label htmlFor="name">Username Or Email</Label>
              <PersonIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
              <Input
                type="name"
                placeholder="Username"
                className="px-8"
                autoFocus
                required
              />
            </div>
            <div className="space-y-1 relative">
              <Label htmlFor="password">Password</Label>
              <LockClosedIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
              <Input
                type="password"
                placeholder="Password"
                className="px-8"
                required
              />
            </div>
            <Button className="!mt-8 w-full">Create Account</Button>
          </form>

          <div className="w-full flex items-center my-4">
            <div className="w-1/2 h-[1px] bg-gray-300"></div>{" "}
            <span className="mx-2">Or</span>
            <div className="w-1/2 h-[1px] bg-gray-300"></div>
          </div>

          <CardFooter className="w-full m-0 p-0 flex flex-col space-y-3">
            <Button
              onClick={() => oAuth("google")}
              disabled={isLoading}
              variant="outline"
              className="w-full flex justify-center items-center space-x-2"
            >
              {isLoading ? (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <VercelLogoIcon className="w-5 h-5" />
              )}
              <span>Continue with Google</span>
            </Button>

            <Button
              onClick={() => oAuth("github")}
              disabled={isLoading}
              variant="outline"
              className="w-full flex justify-center items-center space-x-2"
            >
              {isLoading ? (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <GitHubLogoIcon className="w-5 h-5" />
              )}
              <span>Continue with GitHub</span>
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;
