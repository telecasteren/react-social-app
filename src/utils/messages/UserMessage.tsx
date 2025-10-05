import React, { useEffect, useState } from "react";
import { alertTypes } from "./types";
import type { UserMessageProps } from "./types";

const UserMessage: React.FC<UserMessageProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const { text, bg, darkText } = alertTypes[type] || alertTypes.alert;

  const handleClose = React.useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, handleClose]);

  // Click outside to close message
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const messageElement = document.querySelector(".user-message");

      if (messageElement && !messageElement.contains(target)) {
        handleClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className={`user-message fixed top-5 left-1/2 transform -translate-x-1/2 w-96 p-4 mb-4
        text-sm ${text} text-center rounded-lg ${bg} dark:bg-gray-800 ${darkText} shadow-lg z-50 cursor-pointer`}
      onClick={handleClose}
    >
      <span className="font-medium">
        {type.charAt(0).toUpperCase() + type.slice(1)}!{" "}
      </span>
      {message}
    </div>
  );
};
export default UserMessage;
