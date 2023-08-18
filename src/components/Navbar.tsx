"use client";
import { MoonIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, Logo } from "./ui";
import Link from "next/link";
import Register from "./Register";

const Navbar = () => {
  return (
    <nav className="h-[80px] flex justify-between items-center">
      <div className="flex items-center">
        <Logo />
        <h1 className=" text-2xl font-bold ml-2">TalkNova</h1>
      </div>

      <section className="navigation_links">
        <Link href="/">Home</Link>
        <Link href="/">Features</Link>
        <Link href="/">Service</Link>
        <Link href="/">About</Link>
      </section>

      <section className=" flex items-center space-x-2">
        <Button
          variant="ghost"
          className=" px-2 hover:bg-slate-200 duration-300"
        >
          <GitHubLogoIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          className=" px-2 hover:bg-slate-200 duration-300 !mr-3"
        >
          <MoonIcon className="w-5 h-5" />
        </Button>

        <Register />
      </section>
    </nav>
  );
};

export default Navbar;
