import TMZoneHeader from "./_components/TMZoneHeader";
import TMBoardsTasksContainer from "./_components/TMBoardsTasksContainer";
import DataContextProvider from "./_providers/DataContextProvider";

export default function ProjectPage() {
  return (
    <DataContextProvider>
      <div>
        <TMZoneHeader />
        <TMBoardsTasksContainer />
      </div>
    </DataContextProvider>
  );
}
