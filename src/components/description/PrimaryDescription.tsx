import { twMerge } from "tailwind-merge";

export default function PrimaryDescription({ description, className }: any) {
  return (
    <p className={twMerge("font-dana-medium dark:text-white/70 text-xl", className)}>
      {description}
    </p>
  );
}
