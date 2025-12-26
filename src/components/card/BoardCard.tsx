import { memo } from "react";
import BoardCardHeader from "./BoardCardHeader";
import BoardCardTasksContainer from "./BoardCardTasksContainer";
import { File_DataContextProvider } from "@/app/tm/[uri]/_types/DataContextProvider.types";

function BoardCard({
  id,
  title,
}: File_DataContextProvider.ServerData_BoardSchema) {
  return (
    <div className="w-96 bg-[#12121a] border border-solid border-cyan-500/30 p-4 space-y-4 rounded-xl">
      <BoardCardHeader id={id} title={title} />
      <BoardCardTasksContainer id={id} />
    </div>
  );
}

export default memo(BoardCard);
