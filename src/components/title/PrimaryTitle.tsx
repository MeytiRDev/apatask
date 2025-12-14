export default function PrimaryTitle({ title, icon }: any) {
  return (
    <h2 className="flex items-center gap-2 font-dana-bold dark:text-white text-6xl">
      <span className="empty:hidden dark:text-secondry/70">{icon}</span>
      <span className="text-green-900 dark:text-secondry @max-md:text-4xl">{title}</span>
    </h2>
  );
}
