type CardDescriptionProps = {
  description: string;
};
export default function CardDescription({ description }: CardDescriptionProps) {
  return <p className="dark:text-white/50 text-sm line-clamp-3 mt-3">{description}</p>;
}
