import React, { useState, useEffect } from "react";
import Spinner from "@/components/loaders/Spinner";
import { userMessage } from "@/utils/messages/SimpleUserMessage";
import { clearUserMessage } from "@/utils/messages/clearUserMessage";

interface ForgotPasswordRouteProps {
  onAuthTypeChange?: (isSignup: boolean) => void;
  onClose?: () => void;
  onComplete?: () => void;
}
const ForgotPasswordRoute: React.FC<ForgotPasswordRouteProps> = ({
  onAuthTypeChange,
  onComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = React.useCallback(() => {
    setIsLoading(true);

    userMessage("info", "Forgot your password? Please signup again.");

    setTimeout(() => {
      setIsLoading(false);
      if (onAuthTypeChange) {
        onAuthTypeChange(true);
      }
      if (onComplete) {
        onComplete();
      }
    }, 1000);

    setTimeout(() => {
      clearUserMessage();
    }, 3000);
  }, [onAuthTypeChange, onComplete]);

  useEffect(() => {
    handleForgotPassword();
  }, [handleForgotPassword]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-48">
        <Spinner />
      </div>
    );
  }

  return null;
};
export default ForgotPasswordRoute;
