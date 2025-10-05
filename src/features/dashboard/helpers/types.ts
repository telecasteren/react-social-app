export interface AuthFormProps {
  isSignup?: boolean;
  onSubmit?: (formData: FormData) => void;
  onForgotPassword?: () => void;
}

export interface FormData {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

export interface AuthContainerProps {
  initialMode?: "login" | "signup" | "forgot";
}
