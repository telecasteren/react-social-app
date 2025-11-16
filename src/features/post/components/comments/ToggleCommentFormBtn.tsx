import PrimaryButton from "@/components/buttons/PrimaryButton.tsx";

interface ToggleCommentFormBtnProps {
  onClick: () => void;
}

export const ToggleCommentFormBtn = ({
  onClick,
}: ToggleCommentFormBtnProps) => {
  const classes = [
    "mx-auto",
    "mb-4",
    "mt-0",
    "max-w-[100px]",
    "border",
    "border-gray-300",
    "text-xs",
    "hover:scale-105",
    "transition",
    "duration-300",
    "ease-in-out",
  ];

  return (
    <div id="toggle-comment-form-btn">
      <PrimaryButton
        text="Add Comment"
        className={classes.join(" ")}
        onClick={onClick}
      />
    </div>
  );
};
export default ToggleCommentFormBtn;
