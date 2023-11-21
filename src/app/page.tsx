"use client";

import { useEffect } from "react";
import { Register, Avatar } from "@/components";
import {
  Navbar,
  HomeUICustomizationComponent,
  TextMessageFeature,
  ShareImageFeature,
  AudioMessageFeature,
  LockChatFeature,
  EncryptionFeature,
  CustomizeUIFeature,
  ConnectFeature,
  AllOtherFeatures,
  HomeHeaderImage,
} from "@/components/home";
import { useCookies } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function Home() {
  const { uid } = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (uid) {
      router.push("/users");
    }
  }, [uid]);

  return (
    <main className="w-[95%] sm:w-[550px] md:w-[720px] lg:w-[1050px] xl:w-[1250px] mx-auto">
      <Navbar />

      <header className="w-full flex flex-col-reverse md:flex-row items-center justify-between my-16 md:my-28">
        <section className="flex flex-col items-center md:items-start justify-center mt-10 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-center md:text-start">
            Communicate with e-2-e <br className="hidden sm:block" /> encryption
          </h1>
          <p className="w-[95%] sm:w-[80%] lg:w-[70%] xl:w-[68%] text-sm md:text-base lg:text-lg text-center md:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            quae ex corporis optio maiores assumenda commodi totam voluptates
            vitae mollitia!
          </p>
          <div className=" flex items-center space-x-3 mt-8 sm:mt-10">
            <Register />
            <HomeUICustomizationComponent />
          </div>
        </section>

        <HomeHeaderImage />
      </header>

      <section className="mb-20">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 text-center lg:text-start">
          Features
        </h2>
        <p className="mb-5 text-xs md:text-sm md:w-[90%] lg:w-[65%] xl:w-[50%] text-foreground opacity-75 text-center lg:text-start">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
          accusamus quidem deserunt sapiente. Maiores nesciunt perspiciatis qui
          esse ipsum voluptatem?
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start mb-1 lg:-ml-2">
          <TextMessageFeature />
          <ShareImageFeature />
          <AudioMessageFeature />
          <LockChatFeature />
          <EncryptionFeature />
          <CustomizeUIFeature />
          <ConnectFeature />
          <AllOtherFeatures />
        </div>
      </section>
    </main>
  );
}
