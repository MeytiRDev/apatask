export type FetchDataTypes = "W_SEARCH" | "WO_SEARCH";

export type Server_ProjectSchema = {
  id: string;
  title: string;
  description: string | null;
  taskCount: number;
};

export type State_ProjectSchema = {
  data: Server_ProjectSchema[];
  count: number;
  viewType: "GRID" | "LIST";
  fetchType: "SEARCH" | "DEFAULT" | "FAVORITES" | "S&F";
  queries: {
    page: number;
    search: string | null;
    favorites: boolean;
  };
};

export type Hook_UseQuerySchema = {
  projects: Server_ProjectSchema[] | [];
  count: number;
  fetchType: State_ProjectSchema["fetchType"];
};

export type Func_ChangeStateProxy = (
  props: Partial<State_ProjectSchema>
) => void;
