import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { SITE_NAME, SITE_LOGO_PIZZA } from "@/utils/branding/config";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import type {
  AuthFormProps,
  FormData,
} from "@/features/dashboard/helpers/types";

const AuthForm: React.FC<AuthFormProps> = ({
  isSignup = false,
  onForgotPassword,
}) => {
  const {
    watch,
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const password = watch("password");
  const { login, register: registerUser, isAuthenticated } = useAuth();

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  useEffect(() => {
    if (isAuthenticated && justLoggedIn) {
      navigate({ to: "/user/profile/" });
      setJustLoggedIn(false);
    }
  }, [isAuthenticated, justLoggedIn, navigate]);

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      toast.loading(isSignup ? "Signing you up..." : "Logging you in...");

      if (isSignup) {
        await registerUser(data.username!, data.email, data.password);
        toast.dismiss();
        toast.success("Signed up successfully!", { duration: 3000 });
      } else {
        await login(data.email, data.password);
        setJustLoggedIn(true);
        toast.dismiss();
        toast.success("Logged in successfully!", { duration: 3000 });
      }
    } catch (error) {
      toast.dismiss();

      let errorMessage = "An error occurred. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          errorMessage = "Invalid email or password.";
        } else if (error.message.includes("409")) {
          errorMessage = "User already exists.";
        } else {
          errorMessage = error.message;
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto w-96 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <img
            className="mx-auto h-10 w-auto dark:invert"
            src={SITE_LOGO_PIZZA}
            alt={`${SITE_NAME} logo`}
          />
        </a>
        <h2 className="auth-title mt-10 text-center text-bigger tracking-tight">
          {isSignup ? "Create your account." : "Log in to your account."}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          id="auth-form"
          className="space-y-6"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {isSignup && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username.
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...registerField("username", {
                    required: isSignup ? "This field is required" : false,
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 22,
                      message: "Username cannot exceed 22 characters",
                    },
                  })}
                  type="text"
                  autoComplete="name"
                  className={`input-field input-border ${errors.username ? "border-red-500" : ""}`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username?.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address.
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...registerField("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },

                  validate: (value) => {
                    const domainPattern = /@(noroff\.no|stud\.noroff\.no)$/;
                    return (
                      domainPattern.test(value) ||
                      "Email must be noroff.no or stud.noroff.no"
                    );
                  },
                })}
                type="email"
                autoComplete="email"
                className={`input-field input-border ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Password.
              </label>
              {!isSignup && (
                <a
                  href="#"
                  className="text-sm font-semibold text-accent-light hover:text-black dark:text-accent-dark dark:hover:text-white"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...registerField("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type="password"
                autoComplete="current-password"
                className={`input-field input-border ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          {isSignup && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...registerField("confirmPassword", {
                    required: "Please confirm your password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: (value) => {
                      return value === password || "Passwords do not match";
                    },
                  })}
                  type="password"
                  className={`input-field input-border ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              id="submit-auth"
              className="submit-btn btn-primary"
            >
              {isSignup ? "Sign up." : "Log in."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
