"use client";
import { Fragment } from "react/jsx-runtime";
import TaskCard from "./TaskCard";
import { useInfo } from "@/app/tm/[uri]/_hooks/useInfo";
import { DragEvent } from "react";
import { getElement, getParentElement } from "@/utils/domCollection";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils/fetchCollection";

type BoardCardTasksContainerProps = {
  id: string;
};

export default function BoardCardTasksContainer({
  id,
}: BoardCardTasksContainerProps) {
  const { tasks, findOneTask, moveTask } = useInfo();

  const { mutate } = useMutation({
    mutationFn: customFetch({
      endpoint: "/tm/task/move",
      method: "PUT",
    }),
    onSuccess: (_, { body }) => {
      moveTask(body);
    },
    onError: () => {},
  });

  function dragOverHandler(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function dropHandler(e: DragEvent<HTMLDivElement>) {
    const currentElem = e.currentTarget;
    const targetElem = e.target as HTMLElement;
    const targetParentElem = getParentElement(
      targetElem,
      "#task_card"
    ) as HTMLDivElement;
    const draggedElemId = getElement(
      "#task_card[data-dragged=on]"
    )?.getAttribute("data-dragged-id") as string;

    const targetElemPosition =
      Array.from(currentElem.children).indexOf(targetParentElem) + 1;

    const task = findOneTask(draggedElemId);

    const body = {
      id: task.id,
      boardId: id,
      position: targetElemPosition || 1,
    };

    try {
      mutate({
        body,
      });
    } catch (err) {}
  }

  return (
    <div
      id="tasks_container"
      className="space-y-4 h-full"
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
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
