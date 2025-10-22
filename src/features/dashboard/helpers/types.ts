export interface AuthFormProps {
  isSignup?: boolean;
  onSubmit?: (formData: FormData) => void;
  onForgotPassword?: () => void;
}

export interface FormData {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthContainerProps {
  initialMode?: "login" | "signup" | "forgot";
}
