import Button from "../button/Button";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils/fetchCollection";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { TiStarFullOutline } from "react-icons/ti";

export default function ProjectCardFavButton({ id, isFav }: any) {
  const [isFavProject, setIsFavProject] = useState(isFav);

  const { mutateAsync } = useMutation({
    mutationFn: customFetch({
      endpoint: "/tm/project/fav",
      method: "POST",
    }),
  });

  async function addToFavorite(e: MouseEvent) {
    e.stopPropagation();
    const res = await mutateAsync({
      body: {
        projectId: id,
      },
    });

    setIsFavProject(res?.if);
  }

  return (
    <div className="absolute top-3 left-3">
      <Button
        variant="activityMinimal"
        icon={
          <TiStarFullOutline
            className={twMerge("text-xl", isFavProject ? "text-yellow-500" : null)}
          />
        }
        onClick={addToFavorite}
      />
    </div>
  );
}
