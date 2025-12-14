"use client";
import { customFetch } from "@/utils/fetchCollection";
import { useQuery } from "@tanstack/react-query";
import TM_ProjectCard from "./TM_ProjectCard";
import { Fragment } from "react/jsx-runtime";

export type Server_ProjectSchema = {
  id: string;
  projectName: string;
  projectImage: string | null;
};

export default function TM_Projects() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: customFetch({
      endpoint: "/tm/projects",
    }),
  });

  return (
    <div className="grid grid-cols-4 gap-5">
      {data?.map((project: Server_ProjectSchema) => {
        return (
          <Fragment key={project.id}>
            <TM_ProjectCard {...project} />
          </Fragment>
        );
      })}
    </div>
  );
}
