"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
