const timeAgo = (date: Date) => {
  if (!date) return "Unknown";

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

interface DateBadgeProps {
  createdAt: string | Date;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const DateBadge = ({
  createdAt,
  bgColor,
  textColor,
  borderColor,
}: DateBadgeProps) => {
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  return (
    <span
      className={`bg-${bgColor} text-${textColor} text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-${textColor} border border-${borderColor}`}
    >
      {timeAgo(date)}
    </span>
  );
};
export default DateBadge;
