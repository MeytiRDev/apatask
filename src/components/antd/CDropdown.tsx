"use client";
import { Dropdown, DropdownProps } from "antd";
import { ReactElement } from "react";

type CDropdownProps = {
  children: ReactElement;
};

export default function CDropdown(props: CDropdownProps & DropdownProps) {
  return <Dropdown {...props}>{props.children}</Dropdown>;
}
