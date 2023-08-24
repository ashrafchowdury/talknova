"use client";
import { Navbar, Register, Features } from "@/components";
import { Button } from "@/packages/ui";

export default function Home() {
  return (
    <main className=" w-[95%] sm:w-[520px] md:w-[720px] lg:w-[1050px] xl:w-[1250px] mx-auto">
      <Navbar />

      <header className="w-full flex flex-col items-start justify-center mt-16 sm:mt-28">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Communication with end-2-end <br className="hidden sm:block" />{" "}
          encryption
        </h1>
        <p className="w-[95%] sm:w-[80%] lg:w-[60%] xl:w-[48%] text-sm sm:text-[16px] lg:text-lg xl:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          quae ex corporis optio maiores assumenda commodi totam voluptates
          vitae mollitia!
        </p>
        <div className=" flex items-center space-x-3 mt-6 sm:mt-8">
          <Register />
          <Button variant="outline">Explore</Button>
        </div>

        <Features />
      </header>
    </main>
  );
}
