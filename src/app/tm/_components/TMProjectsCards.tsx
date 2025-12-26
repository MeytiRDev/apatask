import PrimaryGrid from "@/components/grid/PrimaryGrid";
import { Fragment, memo } from "react";
import { Server_ProjectSchema, State_ProjectSchema } from "./TMProjects";
import ProjectCard from "@/components/card/ProjectCard";
import PrimaryList from "@/components/list/PrimaryList";

function TMProjectsCards({
  count,
  data,
  label,
  page,
  prevLabel,
  search,
  viewType,
}: State_ProjectSchema) {
  const Viewer = viewType === "GRID" ? PrimaryGrid : PrimaryList;

  return (
    <Viewer>
      {data?.map((project: Server_ProjectSchema) => {
        return (
          <Fragment key={project.id}>
            <ProjectCard {...project} viewType={viewType} />
          </Fragment>
        );
      })}
    </Viewer>
  );
}

export default memo(TMProjectsCards);
