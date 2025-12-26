import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary:
    "shrink-0 flex items-center justify-center gap-1 h-[50px] font-dana-medium rounded-xl text-sm bg-cyan-500 hover:bg-cyan-400 text-black px-5 transition-colors",
  secondry:
    "shrink-0 flex items-center justify-center gap-2 h-10 font-dana-medium rounded-xl text-sm bg-cyan-500 hover:bg-cyan-400 text-black px-5 transition-colors",
  third:
    "shrink-0 flex items-center justify-center gap-2 h-10 font-dana-medium rounded-xl text-sm text-white bg-[#12121a] border border-solid border-cyan-500/30 px-5 transition-colors",
  delete:
    "shrink-0 flex items-center justify-center gap-2 h-10 font-dana-medium rounded-xl text-sm bg-red-500 hover:bg-cyan-400 hover:bg-red-600 text-black px-5 transition-colors",
  activity:
    "shrink-0 flex items-center justify-center gap-1 h-10 font-dana-medium rounded-xl text-sm text-white bg-[#12121a] border border-solid border-cyan-500/30 px-5 transition-colors",
  activityMinimal:
    "shrink-0 flex items-center justify-center gap-1 size-10 font-dana-medium rounded-xl text-sm text-white bg-[#12121a] border border-solid border-cyan-500/30 transition-colors",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  type?: "submit" | "button";
  title?: string;
  icon?: ReactElement;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: any) => void;
};

export default function Button({
  variant = "primary",
  type = "button",
  title,
  icon,
  active = false,
  className,
  onClick,
  disabled = false,
  loading,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        variants[variant],
        active ? "bg-cyan-500/20 text-cyan-500" : null,
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon}
      {title}
    </button>
  );
}
