"use client";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";

export default function CardPicture({ avatar, url = "/" }: any) {
  function errorHandling({ target }: SyntheticEvent<HTMLImageElement, Event>) {
    const targetElement = target as HTMLImageElement;
    const containerElement = document.querySelector("#container");

    targetElement.remove();

    const altElement = document.createElement("div");
    altElement.classList.value = "size-full flex items-center justify-center";

    containerElement?.appendChild(altElement);
  }

  return (
    <Link
      id="container"
      href={url}
      className="block h-52 border-b border-solid border-black/10 dark:border-white/15"
    >
      <Image
        src={avatar}
        loader={({ src }) => src}
        onError={errorHandling}
        alt="..."
        width={300}
        height={300}
        className="size-full object-cover object-center"
      />
    </Link>
  );
}
