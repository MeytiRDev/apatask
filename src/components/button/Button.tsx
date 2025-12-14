const variants = {
  primary:
    "flex items-center justify-center w-full h-10 font-dana-medium rounded-xl bg-secondry hover:bg-third text-white transition-colors",
  secondry:
    "flex items-center justify-center w-full h-10 font-dana-medium rounded-xl bg-secondry hover:bg-third text-white transition-colors",
  third:
    "flex items-center justify-center w-full h-10 font-dana-medium rounded-xl bg-secondry hover:bg-third text-white transition-colors",
  delete:
    "flex items-center justify-center w-full h-10 font-dana-medium rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  type?: "submit" | "button";
  title: string;
  onClick?: (e: any) => void;
};

export default function Button({
  variant = "primary",
  type = "button",
  title,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} className={variants[variant]} onClick={onClick}>
      {title}
    </button>
  );
}
