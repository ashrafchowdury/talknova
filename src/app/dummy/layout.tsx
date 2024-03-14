"use client";
import Provider from "@/components/provider/Provider";

export default function DummyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
