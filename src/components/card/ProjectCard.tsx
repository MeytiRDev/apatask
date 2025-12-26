"use client";
import { State_ProjectSchema } from "@/app/tm/_components/TMProjects";
import { genarateRandomColor } from "@/utils/genaratorCollection";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { LuFolderKanban } from "react-icons/lu";
import ProjectCardFavButton from "./ProjectCardFavButton";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  taskCount: number;
  viewType: State_ProjectSchema["viewType"];
  isFav: 0 | 1;
};

function ProjectCard({
  id,
  title,
  description,
  taskCount = 12,
  viewType,
  isFav
}: ProjectCardProps) {
  const router = useRouter();

  function goTo() {
    router.push(`/tm/${id}`);
  }

  const randomColor = genarateRandomColor();

  return (
    <div
      onClick={goTo}
      className="relative bg-[#12121a] rounded-xl p-5 space-y-4 cursor-pointer group"
      style={{
        borderTopWidth: viewType === "GRID" ? 8 : 0,
        borderRightWidth: viewType === "LIST" ? 8 : 0,
        borderStyle: "solid",
        borderColor: randomColor,
      }}
    >
      <ProjectCardFavButton id={id} isFav={isFav} />

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-5">
          <div
            className="size-10 flex items-center justify-center rounded-xl"
            style={{ backgroundColor: randomColor }}
          >
            <LuFolderKanban className="text-white text-xl" />
          </div>
          <h2 className="text-white text-xl">{title}</h2>
        </div>
      </div>

      <div className="space-y-4">
        <p className="line-clamp-2 text-white/75">{description}</p>
        <div className="border border-solid border-cyan-500/20 w-fit rounded-full py-2 px-4">
          <p className="text-cyan-500">{taskCount} تسک</p>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);
