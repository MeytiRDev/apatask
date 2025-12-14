"use client";
import { Image } from "antd";
import { RiUser4Line } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

export default function Avatar({ src, className }: any) {
  return (
    <div
      className={twMerge(
        "shrink-0 size-40 rounded-full overflow-hidden bg-gray-100",
        className
      )}
    >
      {src ? (
        <Image
          preview={{ movable: false, actionsRender: () => null }}
          src={src}
          classNames={{
            image: "size-full! object-cover! object-center!",
            root: "size-full!",
            popup: {
              footer: "hidden",
            },
          }}
        />
      ) : (
        <div className="flex items-center justify-center size-full bg-gray-100 dark:bg-gray-900">
          <RiUser4Line className="text-3xl text-black dark:text-white/50" />
        </div>
      )}
    </div>
  );
}
