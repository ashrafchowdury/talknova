"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/packages/ui";

type ErrorType = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground text-center mb-8">
        Something went wrong! {":("}
      </h1>
      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
}
