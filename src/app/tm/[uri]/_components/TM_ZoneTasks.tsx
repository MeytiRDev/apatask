"use client";
import { customFetch } from "@/utils/fetchCollection";
import { useQuery } from "@tanstack/react-query";

type Server_TasksSchema = {
  id: number;
  tm_zone_id: number;
  title: string;
  description: string;
  status: "PENDING" | "RESOLVED";
  task_position: number;
  created_at: string;
};

type TM_ZoneTasksProps = {
  zoneId: number;
};

export default function TM_ZoneTasks({ zoneId }: TM_ZoneTasksProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["tasks", zoneId],
    queryFn: customFetch({
      endpoint: `/tm/task/${zoneId}`,
    }),
  });

  return (
    <div className="space-y-2 p-3">
      {data?.map((task: Server_TasksSchema) => {
        return (
          <div
            key={task.id}
            className="bg-white/10 p-3 rounded-xl"
            draggable={true}
          >
            <h4 className="text-lg text-white">{task.title}</h4>
            <p className="line-clamp-3 text-white/75">{task.description}</p>
          </div>
        );
      })}
    </div>
  );
}
