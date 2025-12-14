"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

type ReactQueryProviderProps = {
  children: ReactElement;
};

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
