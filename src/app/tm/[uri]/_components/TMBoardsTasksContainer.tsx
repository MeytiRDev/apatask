"use client";
import TMBoards from "./TMBoards";
import TMTasks from "./TMTasks";

export type Server_BoardSchema = {
  id: number;
  title: string;
  description: string;
  status: string;
}[];

export default function TMBoardsTasksContainer() {
  return (
    <div className="border-t border-b border-solid border-cyan-500/30 py-10 space-y-10">
      <TMBoards />
      <TMTasks />
    </div>
  );
}
