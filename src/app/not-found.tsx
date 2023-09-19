"use client";

import { Button } from "@/packages/ui";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground text-center mb-8">
        Page Not Found {":("}
      </h1>
      <Button onClick={() => router.back()}>Go Back</Button>
    </section>
  );
};

export default NotFound;
