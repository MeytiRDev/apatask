import { useContext } from "react";
import { DataContext } from "../_providers/DataContextProvider";
import { File_DataContextProvider } from "../_types/DataContextProvider.types";

type Func_AddBoardArgs = {
  id: string;
  boardId: string;
  description: string;
  title: string;
  position: string;
};

export function useInfo() {
  const values = useContext(DataContext);

  function addBoard(board: Func_AddBoardArgs) {
    values?.setWorkspace((prev: any) => {
      return {
        ...prev,
        boards: [...prev.boards, board],
      };
    });
  }

  function deleteBoard(boardId: string) {
    const deletedBoard = values?.boards.filter((board) => {
      return board.id !== boardId;
    });

    const deletedBoardTasks = values?.tasks.filter((record) => {
      return record.boardId !== boardId;
    });

    values?.setWorkspace((prev: any) => {
      return {
        ...prev,
        boards: deletedBoard,
        tasks: deletedBoardTasks,
      };
    });
  }

  function updateBoard(
    nBoard: File_DataContextProvider.ServerData_BoardSchema
  ) {
    const boardIndex =
      values?.boards.findIndex((board) => {
        return board.id === nBoard.id;
      }) || 0;

    const findBoard = values?.boards.find((board) => {
      return board.id === nBoard.id;
    }) as File_DataContextProvider.ServerData_BoardSchema;

    const createBoard = { ...findBoard, title: nBoard.title };

    values?.setWorkspace(
      (prev: File_DataContextProvider.State_WorkspaceSchema) => {
        prev.boards[boardIndex] = createBoard;
        return prev;
      }
    );
  }

  function createTask(task: Func_AddBoardArgs) {
    const tasksGroup = values?.tasks.find(
      (record) => record.boardId === task.boardId
    ) as undefined | any;

    const nTasks = tasksGroup
      ? { ...tasksGroup, tasks: [task, ...tasksGroup?.tasks] }
      : { boardId: task.boardId, tasks: [task] };

    const otherTasks = values?.tasks.filter(
      (record) => record.boardId !== task.boardId
    ) as any;

    values?.setWorkspace((prev: any) => {
      return {
        ...prev,
        tasks: [...otherTasks, nTasks],
      };
    });
  }

  function deleteTask(boardId: string, taskId: string) {
    values?.setWorkspace(
      (prev: File_DataContextProvider.State_WorkspaceSchema) => {
        const nTasks = prev.tasks.map(
          (task: File_DataContextProvider.ServerData_TaskSchema) => {
            if (task.boardId === boardId) {
              const filteredTask =
                (task.tasks as any).filter(
                  (
                    task: File_DataContextProvider.ServerData_TaskSchema["tasks"]
                  ) => {
                    return task.id !== taskId;
                  }
                ) || [];
              return { ...task, tasks: filteredTask };
            }
            return task;
          }
        );

        return {
          ...prev,
          tasks: nTasks,
        };
      }
    );
  }

  function updateTaskPosition() {}

  function updateTaskInfo(
    task: File_DataContextProvider.ServerData_TaskSchema["tasks"]
  ) {
    const findIndex =
      values?.tasks.findIndex((tasks: any) => {
        return tasks.tasks.some((t: any) => task.id === t.id);
      }) || 0;

    const nTasks =
      (values?.tasks[findIndex].tasks as any).map(
        (t: File_DataContextProvider.ServerData_TaskSchema["tasks"]) => {
          if (task.id === t.id) {
            return task;
          }
          return t;
        }
      ) || [];

    const nRecord = {
      ...values?.tasks[findIndex],
      tasks: nTasks,
    };

    const otherTasks =
      values?.tasks.filter(
        (row: any) => row.boardId !== values.tasks[findIndex].boardId
      ) || [];

    values?.setWorkspace((prev: any) => {
      return {
        ...prev,
        tasks: [...otherTasks, nRecord],
      };
    });
  }

  return {
    ...values,
    addBoard,
    deleteBoard,
    updateBoard,
    createTask,
    deleteTask,
    updateTaskPosition,
    updateTaskInfo,
  };
}
