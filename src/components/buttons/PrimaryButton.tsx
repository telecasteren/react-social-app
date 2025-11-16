interface ButtonProps {
  text: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({
  text,
  className,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`btn ${className || ""}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};
export default PrimaryButton;
