import { File_DataContextProvider } from "@/app/tm/[uri]/_types/DataContextProvider.types";
import TaskCardHeaderDropdown from "./TaskCardHeaderDropdown";

type TaskCardHeaderProps = {
  title: string;
  boardId: string;
  taskId: string;
} & File_DataContextProvider.ServerData_TaskSchema;

export default function TaskCardHeader(info: TaskCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-white">{info.title}</h3>
      <TaskCardHeaderDropdown {...info} />
    </div>
  );
}
