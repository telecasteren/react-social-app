export const clearUserMessage = (): void => {
  const existingContainer = document.getElementById("user-message-container");
  if (existingContainer) {
    existingContainer.remove();
  }
};
