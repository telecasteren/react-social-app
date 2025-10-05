import React, { useCallback, useState } from "react";
import AuthForm from "./AuthForm";
import ForgotPasswordRoute from "@/features/dashboard/helpers/forgotPasswordRoute";
import type { AuthContainerProps } from "@/features/dashboard/helpers/types";

const AuthContainer: React.FC<AuthContainerProps> = ({
  initialMode = "login",
}) => {
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">(
    initialMode,
  );

  const handleAuthChange = useCallback((isSignup: boolean) => {
    setAuthMode(isSignup ? "signup" : "login");
  }, []);

  const handleClose = useCallback(() => {
    setAuthMode("login");
  }, []);

  const authContent = () => {
    switch (authMode) {
      case "login":
        return (
          <AuthForm
            isSignup={false}
            onForgotPassword={() => setAuthMode("forgot")}
          />
        );
      case "signup":
        return <AuthForm isSignup={true} />;
      case "forgot":
        return (
          <ForgotPasswordRoute
            onAuthTypeChange={handleAuthChange}
            onClose={handleClose}
          />
        );
      default:
        return <AuthForm isSignup={false} />;
    }
  };

  return <div>{authContent()}</div>;
};
export default AuthContainer;
