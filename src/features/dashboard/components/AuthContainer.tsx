import React, { useState } from "react";
import AuthForm from "./AuthForm";
import ForgotPasswordRoute from "@/features/dashboard/helpers/forgotPasswordRoute";
import type { AuthContainerProps } from "@/features/dashboard/helpers/types";

const AuthContainer: React.FC<AuthContainerProps> = ({
  initialMode = "login",
}) => {
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">(
    initialMode,
  );

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
            onAuthTypeChange={(isSignup) =>
              setAuthMode(isSignup ? "signup" : "login")
            }
            onClose={() => setAuthMode("login")}
          />
        );
      default:
        return <AuthForm isSignup={false} />;
    }
  };

  return <div>{authContent()}</div>;
};
export default AuthContainer;
