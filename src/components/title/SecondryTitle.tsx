import { twMerge } from "tailwind-merge";

export default function SecondryTitle({ title, icon, className }: any) {
  return (
    <h2
      className={twMerge(
        "flex items-center gap-1 font-dana-bold dark:text-white text-2xl",
        className
      )}
    >
      <span className="empty:hidden text-white">
        {icon}
      </span>
      <span className="text-white">{title}</span>
    </h2>
  );
}
