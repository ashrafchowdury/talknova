"use client";

import { UserContextProvider } from "@/packages/server";
import { EncryptContextProvider } from "@/packages/encryption";
import { useCookies, AppearanceContextProvider } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import NotFound from "../not-found";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { uid } = useCookies();
  const router = useRouter();

  if (!uid) {
    return <NotFound />;
  }
  return (
    <EncryptContextProvider>
      <UserContextProvider>
        <AppearanceContextProvider>{children}</AppearanceContextProvider>
      </UserContextProvider>
    </EncryptContextProvider>
  );
}
