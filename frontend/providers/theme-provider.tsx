"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useTheme } from "next-themes";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const {setTheme } = useTheme();

  React.useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>
}
