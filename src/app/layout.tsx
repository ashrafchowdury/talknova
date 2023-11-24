import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
import { ThemeProvider, Toaster } from "@/packages/ui";
import AuthContextProvider from "@/packages/server/context/AuthContext";

export const metadata: Metadata = {
  title: "A fully functional chat application",
  description:
    "Talknova is a real-time chat application built with modern technologies, providing a secure and engaging communication platform for users.",
  openGraph: {
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light-black">
          <AuthContextProvider>
            {children} <Toaster />
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
