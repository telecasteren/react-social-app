import React from "react";
import Title from "@/components/titles/Title";

interface EditIconProps {
  label: string;
  dataId?: string | null;
  classes?: string;
  className?: string;
  onClick?: (() => void) | null;
}

const EditIcon: React.FC<EditIconProps> = ({
  label = "Edit",
  dataId = null,
  classes = "",
  className = "",
  onClick = null,
}) => {
  return (
    <div
      className={`${classes} ${className}`}
      data-id={dataId || undefined}
      onClick={onClick || undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white opacity-100 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z" />
      </svg>
      {/* Help text */}
      <Title
        text={label}
        className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.8rem] text-white"
      />
    </div>
  );
};
export default EditIcon;
