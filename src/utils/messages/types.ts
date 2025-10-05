export type MessageType = "info" | "error" | "success" | "warning" | "alert";

export interface UserMessageProps {
  type: MessageType;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export interface AlertStyle {
  text: string;
  bg: string;
  darkText: string;
}

export const alertTypes: Record<MessageType, AlertStyle> = {
  info: {
    text: "text-blue-800",
    bg: "bg-blue-50",
    darkText: "dark:text-blue-400",
  },
  error: {
    text: "text-red-800",
    bg: "bg-red-50",
    darkText: "dark:text-red-400",
  },
  success: {
    text: "text-green-800",
    bg: "bg-green-50",
    darkText: "dark:text-green-400",
  },
  warning: {
    text: "text-yellow-800",
    bg: "bg-yellow-50",
    darkText: "dark:text-yellow-300",
  },
  alert: {
    text: "text-gray-800",
    bg: "bg-gray-50",
    darkText: "dark:text-gray-300",
  },
};
