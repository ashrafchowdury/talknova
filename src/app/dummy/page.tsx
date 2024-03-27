"use client";
import { Button } from "@/packages/ui";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Dummy = () => {
  const { data: session, status } = useSession();

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen ">
      <h1 className="mb-12 text-xl">{session?.user?.name}</h1>
      <div className="space-x-3">
        {session?.user?.name ? (
          <Button onClick={() => signOut()}>Log Out</Button>
        ) : (
          <Link href="/dummy/login">
            <Button>Log In</Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Dummy;
