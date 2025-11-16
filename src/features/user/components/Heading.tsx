import React from "react";
// import { editAvatar } from "/js/app/components/forms/avatarForm.js";
import { loadKey } from "@/services/helpers/storage";
import type { Profile } from "@/utils/types/user/profile";
import Tooltip from "@/components/tooltip/Tooltip";
import Title from "@/components/titles/Title";

interface HeadingProps {
  user: Profile;
}

const Heading: React.FC<HeadingProps> = ({ user }) => {
  const currentUser = loadKey("profile") as Profile | null;

  const currentUsername = currentUser?.name || "Unknown user";
  const userNameParam = user?.name || "Unknown user";
  const userAvatarSrc = user.avatar?.url;
  const userAvatarAlt = user.avatar?.alt;

  let visibleUsername = user.name || "Unknown user";
  const maxLength = 20;
  const showTooltip = visibleUsername && visibleUsername.length > maxLength;

  if (showTooltip) {
    visibleUsername = visibleUsername.substring(0, maxLength) + "...";
  }

  const handleEditAvatar = async () => {
    console.log("Edit avatar clicked");
    // const handleEditAvatar = useHandleEditAvatar(user);
  };

  const isCurrentUser = currentUsername === userNameParam;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 relative">
      <div className="relative group inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full ring-2 ring-accent-light dark:bg-gray-600 dark:ring-accent-dark">
        <div className="relative w-full h-full">
          {userAvatarSrc ? (
            <img
              id="avatar-img"
              className={`w-32 h-32 object-cover transition duration-300 ease-in-out ${
                isCurrentUser ? "group-hover:blur-sm" : ""
              }`}
              src={userAvatarSrc}
              alt={userAvatarAlt || "No image uploaded."}
            />
          ) : (
            <span className="font-medium text-lg text-gray-600 dark:text-gray-300">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          )}

          {isCurrentUser && (
            <div
              className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-full"
              onClick={handleEditAvatar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        {showTooltip ? (
          <Tooltip content={user.name || "Unknown user"}>
            <Title
              text={visibleUsername}
              className="text-[1.8rem] sm:text-bigger m-4 cursor-pointer"
            />
          </Tooltip>
        ) : (
          <Title
            text={visibleUsername}
            className="text-[1.8rem] sm:text-bigger m-4"
          />
        )}
      </div>
    </div>
  );
};

export default Heading;
