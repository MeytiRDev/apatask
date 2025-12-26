"use client";
import { Fragment } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
import "./style.css";
import Link from "next/link";

const colors = {
  default: "hover:bg-cyan-500/20 text-white hover:text-cyan-500",
  danger: "hover:bg-red-500/20 text-white hover:text-red-500",
};

type LMenuProps = {
  items: any[];
  open: boolean;
};

export default function LMenu({ items, open = false }: LMenuProps) {
  return (
    <div
      id="lmenu"
      data-open={open}
      className="absolute top-full right-0 min-w-56 bg-[#12121a] border border-solid border-cyan-500/20 rounded-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-3">
        <p className="text-left text-white text-sm">x@gmail.com</p>
      </div>
      <hr className="my-3 border-cyan-500/20" />
      <div>
        {items.map(({ key, label, icon, type, url, color = "default" }) => {
          return (
            <Fragment key={key}>
              {type === "divider" ? (
                <hr className="my-3 border-cyan-500/20" />
              ) : type === "link" ? (
                <Link
                  href={url}
                  className={twMerge(
                    "flex items-center justify-start gap-3 w-full p-3 transition-colors",
                    colors[color]
                  )}
                >
                  <span>{icon}</span>
                  <h5>{label}</h5>
                </Link>
              ) : (
                <button
                  type="button"
                  className={twMerge(
                    "flex items-center justify-start gap-3 w-full p-3 transition-colors",
                    colors[color]
                  )}
                >
                  <span>{icon}</span>
                  <h5>{label}</h5>
                </button>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
