import { File_DataContextProvider } from "@/app/tm/[uri]/_types/DataContextProvider.types";
import SecondryDescription from "../description/SecondryDescription";
import TaskCardHeader from "./TaskCardHeader";
import TaskCardTags from "./TaskCardTags";

export default function TaskCard(
  info: File_DataContextProvider.ServerData_TaskSchema["tasks"] & {
    boardId: string;
  }
) {
  return (
    <div
      className="rounded-xl border border-solid border-cyan-500/30 p-4 space-y-2 bg-[#1a1a2e]"
      draggable={true}
    >
      <TaskCardHeader {...info} />
      <SecondryDescription description={info.description} />
      <TaskCardTags />
    </div>
  );
}
