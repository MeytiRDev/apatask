import { ReactElement } from "react";

type HeaderNavsButtonProps = {
  icon: ReactElement;
  onClick: any
};

export default function HeaderNavsButton({
  icon,
  onClick,
}: HeaderNavsButtonProps) {
  return (
    <button
      type="button"
      className="text-xl text-gray-400 p-2 rounded-xl border border-solid border-cyan-500/50 hover:border-cyan-500 hover:text-cyan-500 transition-all"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
