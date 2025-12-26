import { Dispatch, ReactElement, SetStateAction } from "react";

export namespace File_DataContextProvider {
  export type DataContextProviderProps = {
    children: ReactElement;
  };

  export type ServerData_BoardSchema = {
    id: string;
    title: string;
  };

  export type ServerData_TaskSchema = {
    boardId: string;
    tasks: {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "REJECTED";
      created_at: string;
    };
  };

  export type State_WorkspaceSchema = {
    boards: [] | ServerData_BoardSchema[];
    tasks: [] | ServerData_TaskSchema[];
  };

  export type Context_Schema =
    | ({
        setWorkspace: Dispatch<SetStateAction<State_WorkspaceSchema>>;
      } & State_WorkspaceSchema)
    | null;
}
