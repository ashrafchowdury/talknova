import UserContextProvider from "@/packages/server/context/UserContext";
import ChatContextProvider from "@/packages/server/context/ChatContext";
import { EncryptContextProvider } from "@/packages/encryption";
import { AppearanceContextProvider } from "@/lib/hooks";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-[95%] sm:w-[520px] md:w-[720px] lg:w-[580px] xl:w-[680px] mx-auto mt-2">
      <EncryptContextProvider>
        <UserContextProvider>
          <ChatContextProvider>
            <AppearanceContextProvider>{children}</AppearanceContextProvider>
          </ChatContextProvider>
        </UserContextProvider>
      </EncryptContextProvider>
    </main>
  );
}
