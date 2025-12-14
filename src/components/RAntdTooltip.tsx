import { Tooltip, type TooltipProps } from "antd";
import { ReactElement } from "react";

type RAntdTooltipProps = {
  children: ReactElement;
  orgProps: {
    [P in keyof TooltipProps]: TooltipProps[P];
  };
};

export default function RAntdTooltip({
  children,
  orgProps = {},
}: RAntdTooltipProps) {
  return (
    <Tooltip color="#16a34a" {...orgProps}>
      {children}
    </Tooltip>
  );
}
