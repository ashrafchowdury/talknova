"use client";
import { Navbar, Register, Features } from "@/components";
import { Button } from "@/components/ui";

export default function Home() {
  return (
    <main className=" xl:w-[1450px] mx-auto">
      <Navbar />

      <header className="w-full flex flex-col items-start justify-center mt-28">
        <h1 className=" text-5xl font-bold mb-4">
          Communication with end-2-end <br /> encryption
        </h1>
        <p className="w-[48%] text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          quae ex corporis optio maiores assumenda commodi totam voluptates
          vitae mollitia!
        </p>
        <div className=" flex items-center space-x-3 mt-8">
          <Register />
          <Button variant="outline">Explore</Button>
        </div>

        <Features />
      </header>
    </main>
  );
}
