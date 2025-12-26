import { MenuProps } from "antd";
import CDropdown from "../antd/CDropdown";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteBoardModal from "./_modals/DeleteBoardModal";
import EditBoardModal from "./_modals/EditBoardModal";
import { useInfo } from "@/app/tm/[uri]/_hooks/useInfo";

type BoardCardHeaderProps = {
  id: string;
  title: string;
};

export type State_SwitchModals = "DELETE" | "EDIT";

function genarateDDItems(
  setSwitchModalsL: Dispatch<SetStateAction<State_SwitchModals | null>>
) {
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "ویرایش اطلاعات",
      onClick: () => setSwitchModalsL("EDIT"),
    },
    {
      key: 2,
      label: "حذف",
      onClick: () => setSwitchModalsL("DELETE"),
    },
  ];

  return items;
}

export default function BoardCardHeader({ id, title }: BoardCardHeaderProps) {
  const [switchModals, setSwitchModals] = useState<State_SwitchModals | null>(
    null
  );

  const { tasks } = useInfo();

  function closeModal() {
    setSwitchModals(null);
  }

  const taskLength = tasks?.find((record) => {
    return record.boardId === id;
  })?.tasks?.length;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <h4 className="text-white text-lg font-dana-medium">{title}</h4>
          <p className="empty:hidden flex items-center justify-center size-10 border border-solid border-cyan-500/30 rounded-xl text-cyan-500 text-lg bg-cyan-500/20">
            {taskLength}
          </p>
        </div>

        <CDropdown
          menu={{ items: genarateDDItems(setSwitchModals) }}
          placement="bottomLeft"
        >
          <button type="button" className="text-white">
            ...
          </button>
        </CDropdown>
      </div>

      <DeleteBoardModal
        open={switchModals === "DELETE"}
        closeModal={closeModal}
        setSwitchModals={setSwitchModals}
        boardId={id}
      />
      <EditBoardModal
        open={switchModals === "EDIT"}
        closeModal={closeModal}
        title={title}
        boardId={id}
      />
    </>
  );
}
