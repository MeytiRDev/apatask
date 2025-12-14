export default function CardExternalLinks({ links }: { links: string[] }) {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {links?.map((link) => {
        return <a href={link}>website</a>;
      })}
    </div>
  );
}
