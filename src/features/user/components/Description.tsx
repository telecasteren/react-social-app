import React, { useState } from "react";
import { loadKey } from "@/services/helpers/storage";
import type { Profile } from "@/services/api/user/types/profile";
// import FollowButton from "@/components/buttons/FollowBtn";
import BioForm from "./forms/BioForm";
import EditIconButton from "@/components/buttons/EditIconBtn";

interface DescriptionProps {
  user: Profile;
}

const Description: React.FC<DescriptionProps> = ({ user }) => {
  const currentUser = loadKey("profile") as Profile | null;
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [currentBio, setCurrentBio] = useState(user.bio || "No bio yet..");

  const currentUsername = currentUser?.name || "";
  const profileOwnerName = user.name || "";
  const isCurrentUser = currentUsername === profileOwnerName;
  const isOtherUser = currentUser && !isCurrentUser;

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleBioUpdate = (newBio: string) => {
    setCurrentBio(newBio);
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setIsEditingBio(false);
  };

  if (isEditingBio) {
    return (
      <div className="grid grid-cols-1 mt-16 mb-16">
        <BioForm
          user={user}
          currentBio={currentBio}
          onCancel={handleCancelEdit}
          onSuccess={handleBioUpdate}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-16 mb-16">
      <div className="flex items-center justify-center gap-4">
        <p className="text-sm m-2">{currentBio}</p>

        {isCurrentUser && (
          <EditIconButton
            onClick={handleEditBio}
            label="Edit"
            className="edit-post pl-2 pr-2 w-10 hover:w-24 h-10 bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3] rounded shadow-md cursor-pointer flex items-center justify-start overflow-hidden transition-all duration-300 group"
          />
        )}
      </div>

      {isOtherUser && (
        <div className="flex justify-center mt-4">
          {/* <FollowButton user={user} /> */}
        </div>
      )}
    </div>
  );
};
export default Description;
