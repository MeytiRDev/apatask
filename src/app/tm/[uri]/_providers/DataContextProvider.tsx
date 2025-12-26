"use client";
import { customFetch } from "@/utils/fetchCollection";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { type File_DataContextProvider } from "../_types/DataContextProvider.types";

export const DataContext =
  createContext<File_DataContextProvider.Context_Schema>(null);

export default function DataContextProvider({
  children,
}: File_DataContextProvider.DataContextProviderProps) {
  const [workspace, setWorkspace] =
    useState<File_DataContextProvider.State_WorkspaceSchema>({
      boards: [],
      tasks: [],
    });

  const { uri } = useParams();

  const responses = useQueries({
    queries: [
      {
        queryKey: ["boards", uri],
        queryFn: customFetch({
          endpoint: `/tm/board/${uri}`,
        }),
      },
      {
        queryKey: ["tasks", uri],
        queryFn: customFetch({
          endpoint: `/tm/task/${uri}`,
        }),
      },
    ],
    combine: (responses) => {
      return responses.map(({ data }) => data);
    },
  });

  useEffect(() => {
    setWorkspace({
      boards: responses[0] as File_DataContextProvider.ServerData_BoardSchema[],
      tasks: responses[1] as File_DataContextProvider.ServerData_TaskSchema[],
    });
  }, [responses]);

  return (
    <DataContext.Provider value={{ ...workspace, setWorkspace }}>
      {children}
    </DataContext.Provider>
  );
}
