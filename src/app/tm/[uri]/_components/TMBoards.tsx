import { Fragment } from "react/jsx-runtime";
import { useInfo } from "../_hooks/useInfo";
import BoardCard from "@/components/card/BoardCard";

export default function TMBoards() {
  const { boards } = useInfo();

  return (
    <div className="c_container">
      <div className="space-y-3">
        <h5 className="font-dana-medium text-cyan-500 text-xl">تخته ها</h5>
        <div className="flex gap-4 overflow-x-auto *:shrink-0">
          {boards?.map((info) => {
            return (
              <Fragment key={info.id}>
                <BoardCard {...info} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
