const timeAgo = (date) => {
  if (!date) return "Unknown";

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
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

export const dateBadge = (createdAt, bgColor, textColor, borderColor) => {
  const span = document.createElement("span");
  span.className = `bg-${bgColor} text-${textColor} text-xs font-medium inline-flex items-center
  px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-${textColor} border border-${borderColor}`;

  span.appendChild(document.createTextNode(timeAgo(createdAt)));

  return span;
};
