import { UiContextProvider, UserContextProvider } from "@/provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <UiContextProvider>{children}</UiContextProvider>;
    </UserContextProvider>
  );
}
