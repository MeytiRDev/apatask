import { Fragment } from "react/jsx-runtime";
import TaskCard from "./TaskCard";
import { useInfo } from "@/app/tm/[uri]/_hooks/useInfo";

type BoardCardTasksContainerProps = {
  id: string;
};

export default function BoardCardTasksContainer({
  id,
}: BoardCardTasksContainerProps) {
  const { tasks } = useInfo();

  return (
    <div className="space-y-4">
      {tasks?.map(({ boardId, tasks }: any) => {
        if (boardId === id) {
          return tasks.map((task: any) => {
            return (
              <Fragment key={crypto.randomUUID()}>
                <TaskCard {...task} boardId={id} />
              </Fragment>
            );
          });
        }
      })}
    </div>
  );
}
