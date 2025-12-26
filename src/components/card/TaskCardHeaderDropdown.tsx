import { MenuProps } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import CDropdown from "../antd/CDropdown";
import DeleteTaskModal from "./_modals/task/DeleteTaskModal";
import AddEditTaskModal from "@/app/tm/[uri]/_modals/AddTaskModal";
import { File_DataContextProvider } from "@/app/tm/[uri]/_types/DataContextProvider.types";

type TaskCardHeaderDropdownProps = {
  boardId: string;
  taskId: string;
};

type State_SwitchModals = "DELETE" | "EDIT";

function genarateDDItems(
  setSwitchModals: Dispatch<SetStateAction<State_SwitchModals | null>>
) {
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "ویرایش",
      onClick: () => setSwitchModals("EDIT"),
    },
    {
      key: 2,
      label: "حذف",
      onClick: () => setSwitchModals("DELETE"),
    },
  ];
  return items;
}

export default function TaskCardHeaderDropdown(
  info: TaskCardHeaderDropdownProps &
    File_DataContextProvider.ServerData_TaskSchema["tasks"]
) {
  const [switchModals, setSwitchModals] = useState<State_SwitchModals | null>(
    null
  );

  function closeModal() {
    setSwitchModals(null);
  }

  return (
    <>
      <CDropdown
        menu={{ items: genarateDDItems(setSwitchModals) }}
        placement="bottomLeft"
      >
        <button type="button" className="text-white">
          ...
        </button>
      </CDropdown>

      <DeleteTaskModal
        open={switchModals === "DELETE"}
        closeModal={closeModal}
        boardId={info.boardId}
        taskId={info.id}
      />

      <AddEditTaskModal
        open={switchModals === "EDIT"}
        type="UPDATE"
        taskId={info.id}
        closeModal={closeModal}
        defaultValues={{
          title: info.title,
          description: info.description,
        }}
      />
    </>
  );
}
