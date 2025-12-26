import BoardCard from "@/components/card/BoardCard";
import TaskCard from "@/components/card/TaskCard";
import { Fragment } from "react";

export default function TMTasks() {
  return (
    <div className="mt-10">
      <div className="c_container">
        <div className="space-y-3">
          <h5 className="font-dana-medium text-cyan-500 text-xl">
            تمام تسک ها
          </h5>

          <div className="flex items-center gap-4 overflow-x-auto *:shrink-0">
            {Array.from({ length: 7 }).map(() => {
              return (
                <Fragment key={crypto.randomUUID()}>
                  <TaskCard />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
