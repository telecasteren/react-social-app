import React, { useState, useEffect, useRef } from "react";
import Spinner from "@/components/loaders/Spinner";
import toast from "react-hot-toast";

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
  const toastShown = useRef(false);

  const handleForgotPassword = React.useCallback(() => {
    if (toastShown.current) return;
    toastShown.current = true;

    setIsLoading(true);
    toast("Forgot your password? Please signup again.", {
      icon: "ℹ️",
    });

    setTimeout(() => {
      setIsLoading(false);
      if (onAuthTypeChange) {
        onAuthTypeChange(true);
      }
      if (onComplete) {
        onComplete();
      }
    }, 1000);
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
