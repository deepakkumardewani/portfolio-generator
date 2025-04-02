"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </Provider>
  );
}
