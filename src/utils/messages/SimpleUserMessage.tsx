import { createRoot } from "react-dom/client";
import type { MessageType } from "./types";
import UserMessage from "./userMessage";
import { clearUserMessage } from "./clearUserMessage";

export const userMessage = (
  type: MessageType,
  message: string,
  options?: {
    autoClose?: boolean;
    duration?: number;
    onClose?: () => void;
  },
): void => {
  clearUserMessage();

  // Container fot the message
  const container = document.createElement("div");
  container.id = "user-message-container";
  document.body.appendChild(container);
  const root = createRoot(container);

  const handleClose = () => {
    root.unmount();
    container.remove();
    if (options?.onClose) {
      options.onClose();
    }
  };

  root.render(
    <UserMessage
      type={type}
      message={message}
      onClose={handleClose}
      autoClose={options?.autoClose ?? true}
      duration={options?.duration ?? 5000}
    />,
  );
};
