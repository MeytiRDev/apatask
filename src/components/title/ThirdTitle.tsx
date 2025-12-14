export default function ThirdTitle({ title, icon }: any) {
  return (
    <h3 className="flex items-center gap-1 font-dana-bold dark:text-white text-lg">
      <span className="empty:hidden text-green-900 dark:text-secondry/70">{icon}</span>
      <span className="text-green-900 dark:text-secondry">{title}</span>
    </h3>
  );
}
