"use client";
import { useEffect } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNavs from "./HeaderNavs";
import { usePathname } from "next/navigation";

export default function HeaderSection() {
  const path = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const paddingY = window.scrollY;
      if (paddingY > 0) {
        const headerElem = document.querySelector("#header");
        headerElem?.classList.replace("py-10", "py-5");
      } else {
        const headerElem = document.querySelector("#header");
        headerElem?.classList.replace("py-5", "py-10");
      }
    });
  });

  return path !== "/auth" ? (
    <header
      id="header"
      className="sticky top-0 bg-secondry py-10 border-b border-solid border-white/10 transition-all duration-200"
    >
      <div className="c_container">
        <div className="flex items-center justify-between">
          <HeaderNavs />
          <HeaderLogo />
        </div>
      </div>
    </header>
  ) : null;
}
