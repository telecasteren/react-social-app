import React, { useState } from "react";
import type { Profile } from "@/utils/types/user/profile";
import { NO_IMG_URL } from "@/utils/branding/config";
import { useUpdateUserAvatar } from "@/hooks/useUpdateUserAvatar";

interface AvatarFormProps {
  user: Profile;
  onCancel: () => void;
  onSuccess?: (updatedUser: Profile) => void;
}

const AvatarForm: React.FC<AvatarFormProps> = ({
  user,
  onCancel,
  onSuccess,
}) => {
  const [avatarUrl, setAvatarUrl] = useState(user.avatar?.url || NO_IMG_URL);
  const { updateAvatar, error: hookError } = useUpdateUserAvatar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const displayError = error || hookError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("User data is required to update avatar");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedUser = await updateAvatar(user, avatarUrl);
      onSuccess?.(updatedUser);
      onCancel();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update avatar",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-x-2">
        <label htmlFor="avatar" className="text-sm font-medium dark:text-white">
          Enter profile image:
        </label>

        <button
          type="button"
          onClick={onCancel}
          className="close-modal text-accent-light dark:text-accent-dark text-[12px] font-bold cursor-pointer hover:text-black dark:hover:text-white ml-4"
        >
          Cancel
        </button>
      </div>

      <input
        type="text"
        name="avatar"
        id="avatar"
        placeholder="No image uploaded"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className="w-full sm:w-[320px] md:w-[360px] lg:w-[100%] rounded p-2 text-black text-sm mt-2 mb-2 justify-self-center border border-gray-800"
        disabled={isSubmitting}
      />

      {displayError && (
        <div className="text-red-500 text-sm mb-2">{displayError}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-text-light inline-flex items-center mb-2 justify-center bg-accent-light dark:bg-accent-dark hover:brightness-110 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="me-1 -ms-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AvatarForm;
