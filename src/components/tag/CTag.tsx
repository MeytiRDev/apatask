import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  success: "text-green-500 bg-green-500/20",
  error: "text-red-500 bg-red-500/10",
  warning: "text-yellow-500 bg-yellow-500/20",
};

type CTagProps = {
  variant: keyof typeof variants;
  children: ReactNode;
};

export default function CTag({ variant, children }: CTagProps) {
  return (
    <div
      className={twMerge(
        "rounded-md py-1 px-3",
        variants[variant]
      )}
    >
      {children}
    </div>
  );
}
