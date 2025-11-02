import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { submitFollow } from "@/services/api/user/actions/submitFollow";
import { submitUnfollow } from "@/services/api/user/actions/submitUnfollow";
import type { Profile } from "@/utils/types/user/profile";
import { loadKey } from "@/services/helpers/storage";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { toast } from "react-hot-toast";

interface FollowButtonProps {
  user: Profile;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visitedUserName = user.name;

  const currentUser = loadKey("profile") as Profile;
  const {
    data: visitedUser,
    refetch,
    isLoading: isLoadingProfile,
  } = useUserProfile(user.name);

  if (!currentUser || !visitedUser) return null;

  const isFollowing =
    visitedUser.followers?.some(
      (follower: Profile) => follower.name === currentUser.name,
    ) || false;

  const handleToggleFollow = async () => {
    if (isLoadingProfile) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!isFollowing) {
        await submitFollow(user);
        toast.success(`Started following: ${visitedUserName}`);
      } else {
        await submitUnfollow(user);
        toast(`Stopped following: ${visitedUserName}`);
      }

      await refetch();
    } catch (error) {
      toast.error("There was an error updating the follow state.");
      const errorMessage =
        error instanceof Error ? error.message : "Failed to toggle follow";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = () => {
    if (isLoading) return "...";
    return isFollowing ? "Unfollow" : "Follow";
  };

  return (
    <PrimaryButton
      text={buttonText()}
      className="follow-btn btn-secondary justify-self-center"
      onClick={isLoading ? undefined : handleToggleFollow}
    >
      {error && <span className="text-red-500 text-xs block">{error}</span>}
    </PrimaryButton>
  );
};
export default FollowButton;
