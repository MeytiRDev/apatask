import Link from "next/link";
import { AiOutlineProject } from "react-icons/ai";
import { FiHome } from "react-icons/fi";

const links = [
  {
    title: "خانه",
    icon: <FiHome />,
    url: "/",
  },
  {
    title: "تسک منیجر",
    icon: <AiOutlineProject />,
    url: "/tm",
  },
];

export default function HeaderNavs() {
  return (
    <nav className="flex items-center justify-center gap-10">
      {links.map(({ title, icon, url }) => {
        return (
          <Link
            key={url}
            href={url}
            className="flex items-center justify-center gap-1 text-white/75 hover:text-white transition-colors"
          >
            {icon}
            <span>{title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
