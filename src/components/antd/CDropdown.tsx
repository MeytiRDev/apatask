"use client";
import { Dropdown, DropdownProps } from "antd";
import { ReactElement } from "react";

type CDropdownProps = {
  children: ReactElement;
  props: DropdownProps;
};

export default function CDropdown({ props, children }: CDropdownProps) {
  return <Dropdown {...props}>{children}</Dropdown>;
}
