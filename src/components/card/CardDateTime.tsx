export default function CardDateTime({ dateTime }: any) {
  return dateTime?.trim() ? (
    <time className="block text-xs dark:text-white/50 mt-2">{dateTime}</time>
  ) : null;
}
