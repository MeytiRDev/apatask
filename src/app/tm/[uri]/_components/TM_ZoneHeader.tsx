import CDropdown from "@/components/antd/CDropdown";
import { MenuProps } from "antd";
import { RiMenu5Fill } from "react-icons/ri";
import { Server_ZoneSchema } from "../page";
import { ActionDispatch, useState } from "react";
import CModal from "@/components/antd/CModal";

type SwitchStateSchema = "DELETE" | "ADD_TASK" | "EDIT_ZONE";

function dropdownItems(dispatch: ActionDispatch<any>) {
  const items: MenuProps["items"] = [
    { key: 1, label: "ویرایش ستون", onClick: () => dispatch("EDIT_ZONE") },
    { key: 2, label: "افزودن تسک", onClick: () => dispatch("ADD_TASK") },
    { key: 3, label: "حذف ردیف", onClick: () => dispatch("DELETE") },
  ];
  return items;
}

export default function TM_ZoneHeader({ title }: Server_ZoneSchema) {
  const [switchState, dispatchSwitchState] = useState<SwitchStateSchema | null>(
    null
  );

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-fourth">
        <h2 className="text-xl text-white">{title}</h2>
        <CDropdown
          props={{
            menu: {
              items: dropdownItems(dispatchSwitchState),
            },
            placement: "bottomLeft",
          }}
        >
          <RiMenu5Fill className="text-xl text-white" />
        </CDropdown>
      </div>

      <CModal
        props={{
          open: switchState === "ADD_TASK",
          onCancel: () => dispatchSwitchState(null),
        }}
      >
        <p>task</p>
      </CModal>

      <CModal
        props={{
          open: switchState === "EDIT_ZONE",
          onCancel: () => dispatchSwitchState(null),
        }}
      >
        <p>edit zone</p>
      </CModal>

      <CModal
        props={{
          open: switchState === "DELETE",
          onCancel: () => dispatchSwitchState(null),
        }}
      >
        <p>delete</p>
      </CModal>
    </>
  );
}
