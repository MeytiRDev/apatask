"use client";
import { customFetch } from "@/utils/fetchCollection";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TM_Zone from "./_components/TM_Zone";
import { Fragment } from "react/jsx-runtime";

export type Server_ZoneSchema = { id: number; title: string };

export default function ProjectPage() {
  const { uri } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["project", uri],
    queryFn: customFetch({
      endpoint: `/tm/zone/${uri}`,
    }),
  });

  return (
    <div className="c_container">
      <div className="flex gap-5 my-20 overflow-x-auto">
        {data?.map((zone) => {
          return (
            <Fragment key={zone.id}>
              <TM_Zone {...zone} />
            </Fragment>
          );
        })}
      </div>
      ;
    </div>
  );
}
