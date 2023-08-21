import { UiContextProvider } from "@/provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UiContextProvider>{children}</UiContextProvider>;
}
