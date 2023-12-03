import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanstackProviderProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

let DevToolsComponent: React.ComponentType<{ initialIsOpen: boolean }> | null =
  null;

// Check if environment is development and import ReactQueryDevtools
if (process.env.NODE_ENV === "development") {
  import("@tanstack/react-query-devtools").then((module) => {
    DevToolsComponent = module.ReactQueryDevtools;
  });
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Conditionally render ReactQueryDevtools */}
      {DevToolsComponent && <DevToolsComponent initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
