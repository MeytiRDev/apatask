import Link from "next/link";

type CardTitleProps = {
  title: string;
  url?: string
};

export default function CardTitle({ title, url = "/" }: CardTitleProps) {
  return (
    <Link href={url} className="text-lg font-dana-medium text-black! dark:text-white!">
      {title}
    </Link>
  );
}
