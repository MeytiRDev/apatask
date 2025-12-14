import CDropdown from "@/components/antd/CDropdown";
import { MenuProps } from "antd";
import { RiMenu5Fill } from "react-icons/ri";
import { Server_ZoneSchema } from "../page";
import { useReducer } from "react";

const dropdownItems: MenuProps["items"] = [
  { key: 1, label: "افزودن تسک" },
  { key: 2, label: "حذف ردیف" },
];

type SwitchStateSchema = {
  type: "DELETE" | "ADD_TASK" | null;
  switch: boolean;
};

function reducer(prevState, dispatch) {
  console.log(prevState);
}

export default function TM_ZoneHeader({ title }: Server_ZoneSchema) {
  const [switchState, dispatchSwitchState] = useReducer(reducer, {
    type: null,
    switch: false,
  });

  return (
    <>
      <button onClick={() => dispatchSwitchState({ type: "DELETE" })}>
        click
      </button>
      <div className="flex items-center justify-between p-3 bg-fourth">
        <h2 className="text-xl text-white">{title}</h2>
        <CDropdown
          props={{
            menu: {
              items: dropdownItems,
            },
            placement: "bottomLeft",
          }}
        >
          <RiMenu5Fill className="text-xl text-white" />
        </CDropdown>
      </div>
    </>
  );
}
