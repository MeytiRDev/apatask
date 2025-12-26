import type { CSSProperties, ReactElement } from "react";

type PrimaryFlexProps = {
  children: ReactElement[] | ReactElement;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: number;
};

export default function PrimaryFlex({
  children,
  alignItems = "center",
  justifyContent = "center",
  gap = 5,
}: PrimaryFlexProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems,
        justifyContent,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
