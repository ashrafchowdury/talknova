"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({
  children,
  themes,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      themes={[
        "light-black",
        "dark-black",
        "light-blue",
        "dark-blue",
        "light-red",
        "dark-red",
        "light-green",
        "dark-green",
        "light-orange",
        "dark-orange",
      ]}
    >
      {children}
    </NextThemesProvider>
  );
}
