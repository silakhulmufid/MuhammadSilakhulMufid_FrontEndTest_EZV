"use client";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "./ui/theme-provider";
import ThemeToggleButton from "./ui/theme-toggle-button";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="absolute top-1 left-1 lg:top-5 lg:left-5">
          <ThemeToggleButton variant="circle-blur" start="top-left" />
        </div>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
