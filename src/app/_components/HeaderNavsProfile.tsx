import LMenu from "@/components/menu/LMenu";
import HeaderNavsButton from "./HeaderNavsButton";
import { useState } from "react";
import { LuFolderKanban, LuSettings } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

const menuItems = [
  {
    key: 1,
    label: "پروژه ها",
    icon: <LuFolderKanban />,
    type: "link",
    url: "/tm"
  },
  {
    key: 2,
    label: "تنظیمات",
    icon: <LuSettings />,
    type: "link",
    url: "/settings",
  },
  {
    key: 3,
    type: "divider",
  },
  {
    key: 4,
    label: "خروج از حساب",
    icon: <MdOutlineLogout />,
    color: "danger",
    type: "button",
  },
];

export default function HeaderNavsProfile({ icon }: any) {
  const [switchState, setSwitchState] = useState(false);

  function switchMenuState() {
    setSwitchState((prev) => !prev);
  }

  return (
    <div className="relative">
      <HeaderNavsButton icon={icon} onClick={switchMenuState} />
      <LMenu open={switchState} items={menuItems}>
        <p>hello world</p>
      </LMenu>
    </div>
  );
}
