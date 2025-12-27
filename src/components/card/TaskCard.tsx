"use client";
import { File_DataContextProvider } from "@/app/tm/[uri]/_types/DataContextProvider.types";
import SecondryDescription from "../description/SecondryDescription";
import TaskCardHeader from "./TaskCardHeader";
import TaskCardTags from "./TaskCardTags";
import { DragEvent } from "react";

type TaskCardProps = File_DataContextProvider.ServerData_TaskSchema["tasks"] & {
  boardId: string;
};

export default function TaskCard(info: TaskCardProps) {
  function dragStart(e: DragEvent<HTMLDivElement>) {
    e.currentTarget.setAttribute("data-dragged", "on");
    e.currentTarget.setAttribute("data-dragged-id", info.id);
  }
  function dragEnd(e: DragEvent<HTMLDivElement>) {
    e.currentTarget.setAttribute("data-dragged", "off");
    e.currentTarget.removeAttribute("data-dragged-id");
  }

  return (
    <div
      id="task_card"
      draggable={true}
      data-dragged="off"
      className="rounded-xl border border-solid border-cyan-500/30 p-4 space-y-2 bg-[#1a1a2e]"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >
      <TaskCardHeader {...info} />
      <SecondryDescription description={info.description} />
      <TaskCardTags />
    </div>
  );
}
