"use client";
import { useAuth } from "@/zustand/auth";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";
import HeaderNavsButton from "./HeaderNavsButton";
import { FiUser } from "react-icons/fi";
import HeaderNavsProfile from "./HeaderNavsProfile";
import Button from "@/components/button/Button";

const links = [
  {
    id: "auth",
    type: "link",
    label: "ورود به حساب",
    icon: <MdOutlineAccountCircle />,
    url: "/auth",
  },
  {
    id: "profile",
    type: "dropdown",
    icon: <FiUser />,
    url: "/",
  },
  {
    id: "home",
    type: "link",
    icon: <IoNotificationsOutline />,
    url: "/notifs",
  },
] as const;

export default function HeaderNavs() {
  const { isLogin } = useAuth();

  console.log(isLogin);

  return (
    <nav className="flex items-center justify-center gap-3">
      {links.map(({ id, icon, url, type, label }) => {
        return (
          <Fragment key={id}>
            {id === "auth" ? (
              !isLogin ? (
                <Button variant="third" title={label} />
              ) : null
            ) : type === "dropdown" ? (
              <HeaderNavsProfile icon={icon} />
            ) : (
              <HeaderNavsButton icon={icon} />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
