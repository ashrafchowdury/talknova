"use client";

import { UiContextProvider, UserContextProvider } from "@/provider";
import { useCookies } from "@/lib/hooks";
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
    <UserContextProvider>
      <UiContextProvider>{children}</UiContextProvider>
    </UserContextProvider>
  );
}
