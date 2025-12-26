import { Fragment } from "react";
import CTag from "../tag/CTag";

export default function TaskCardTags() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <Fragment key={crypto.randomUUID()}>
            <CTag variant={i % 2 === 0 ? "success" : "warning"}>success</CTag>
          </Fragment>
        );
      })}
    </div>
  );
}
