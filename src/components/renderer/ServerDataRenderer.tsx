import { ReactElement } from "react";

type ServerDataRendererProps = {
  status: "PENDING" | "RESOLVED" | "REJECTED";
  pendingComponent: ReactElement;
  resolvedComponent: ReactElement;
  rejectedComponent: ReactElement;
};

export default function ServerDataRenderer({
  status,
  pendingComponent,
  resolvedComponent,
  rejectedComponent,
}: ServerDataRendererProps) {
  return status === "PENDING"
    ? pendingComponent
    : status === "RESOLVED"
    ? resolvedComponent
    : rejectedComponent;
}
