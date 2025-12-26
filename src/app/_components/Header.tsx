"use client";
import { usePathname } from "next/navigation";
import HeaderNavs from "./HeaderNavs";
import HeaderLogo from "./HeaderLogo";

export default function HeaderSection() {
  const path = usePathname();

  return path !== "/auth" ? (
    <header
      id="header"
      className="sticky top-0 bg-[#12121a] py-5 border-b border-solid border-white/10 transition-all duration-200 z-50"
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
