"use client";
import { customFetch } from "@/utils/fetchCollection";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TMProjectsTools from "./TMProjectsTools";
import TMProjectsHeader from "./TMProjectsHeader";
import TMProjectsCards from "./TMProjectsCards";
import { getLocalStorage } from "@/utils/localstorageCollection";
import {
  Func_ChangeStateProxy,
  Hook_UseQuerySchema,
  State_ProjectSchema,
} from "../types/TMProjects.types";

function setDataWithConditions(
  changeStateProxy: Func_ChangeStateProxy,
  data: Hook_UseQuerySchema
) {
  changeStateProxy({ data: data.projects, count: data.count });
}

export default function TMProjects() {
  const [projects, setProjects] = useState<State_ProjectSchema>({
    data: [],
    count: 0,
    viewType: "GRID",
    fetchType: "DEFAULT",
    queries: {
      page: 1,
      search: null,
      favorites: false,
    },
  });

  const { data, refetch } = useQuery<Hook_UseQuerySchema>({
    queryKey: ["projects"],
    queryFn: customFetch({
      endpoint: `/tm/projects`,
      queries: projects.queries,
    }),
    select: (data) => {
      return {
        ...data,
      };
    },
  });

  function changeStateProxy(nStates: Partial<State_ProjectSchema>) {
    setProjects((prev) => {
      return {
        ...prev,
        ...nStates,
        queries: {
          ...prev.queries,
          ...nStates.queries,
        },
      };
    });
  }

  useEffect(() => {
    if (data) {
      setDataWithConditions(changeStateProxy, data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [projects.queries]);

  useEffect(() => {
    const lsViewType = getLocalStorage("project_view_type") as
      | State_ProjectSchema["viewType"]
      | undefined;

    setProjects((prev) => {
      return {
        ...prev,
        viewType: lsViewType || "GRID",
      };
    });
  }, []);

  const isEndPage = projects.count <= projects.queries.page * 12;

  return (
    <div className="space-y-10">
      <TMProjectsHeader />
      <TMProjectsTools {...projects} changeStateProxy={changeStateProxy} />
      <TMProjectsCards {...projects} />

      {!isEndPage ? (
        <button
          type="button"
          className="block mx-auto bg-cyan-500/20 border border-solid border-cyan-500/50 rounded-xl px-3 py-2 text-white hover:text-cyan-500 transition-colors"
          onClick={() =>
            changeStateProxy({ queries: { page: ++projects.queries.page } })
          }
        >
          پروژه های بیشتر
        </button>
      ) : null}
    </div>
  );
}
