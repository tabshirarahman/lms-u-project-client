"use client";
import { ReactNode } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./hooks/auth-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default Providers;
