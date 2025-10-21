interface ButtonProps {
  text: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  children,
  disabled,
}) => {
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
