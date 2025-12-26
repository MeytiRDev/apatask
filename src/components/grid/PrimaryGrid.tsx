export default function PrimaryGrid({ children }: any) {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-6">{children}</div>
  );
}
