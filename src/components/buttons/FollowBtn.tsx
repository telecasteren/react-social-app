import React, { useState, useEffect } from "react";
import { submitFollow } from "@/services/api/user/actions/submitFollow";
import { submitUnfollow } from "@/services/api/user/actions/submitUnfollow";
import { checkIfAlreadyFollowing } from "@/services/api/user/checkIfAlreadyFollowing";
import type { Profile } from "@/services/api/user/types/profile";
import { loadKey } from "@/services/helpers/storage";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { toast } from "react-hot-toast";

interface FollowButtonProps {
  user: Profile;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = loadKey("profile") as Profile | null;
  const visitedUserName = user.name;

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        const followingStatus = await checkIfAlreadyFollowing(user.name);
        setIsFollowing(followingStatus);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to check follow status";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    checkFollowingStatus();
  }, [currentUser, visitedUserName, user.name]);

  const handleToggleFollow = async () => {
    if (!currentUser || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!isFollowing) {
        await submitFollow(user);
        setIsFollowing(true);
        toast.success(`Started following: ${visitedUserName}`);
      } else {
        await submitUnfollow(user);
        setIsFollowing(false);
        toast(`Stopped following: ${visitedUserName}`);
      }
    } catch (error) {
      toast.error("There was an error updating the follow state.");
      const errorMessage =
        error instanceof Error ? error.message : "Failed to toggle follow";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

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
