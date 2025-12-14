import React, { ReactElement } from "react";

type CardProps = {
  children: ReactElement[];
};

export default function Card({ children }: CardProps) {
  return (
    <div className="relative w-full rounded-xl dark:border dark:border-solid dark:border-white/15 overflow-hidden hover:-translate-y-2 shadow-xl transition-all">
      {children}
    </div>
  );
}
