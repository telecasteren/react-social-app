import React, { useState } from "react";
import { clearUserBio } from "@/services/api/user/bio/clearUserBio";
import { updateUserBio } from "@/services/api/user/bio/updateBio";
import type { Profile } from "@/utils/types/user/profile";

interface BioFormProps {
  user: Profile;
  currentBio: string;
  onCancel: () => void;
  onSuccess: (newBio: string) => void;
}

const BioForm: React.FC<BioFormProps> = ({
  user,
  currentBio,
  onCancel,
  onSuccess,
}) => {
  const [bio, setBio] = useState(currentBio);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const username = user.name;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateUserBio(username, bio.trim());
      onSuccess(bio.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update bio");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBio = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteBio = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await clearUserBio(username);
      onSuccess("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete bio");
    } finally {
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

  const denyDeleteBio = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <form
      id="bio-form"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 mt-4 mb-4 w-full max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[40%] justify-self-center"
    >
      <div>
        <div className="flex items-center justify-between mb-2 flex-wrap gap-x-2">
          <label htmlFor="bio" className="text-sm font-medium dark:text-white">
            Biography:
          </label>

          <span
            onClick={onCancel}
            className="close-modal text-[var(--accent)] text-[28px] font-bold cursor-pointer hover:text-black ml-4"
          >
            &times;
          </span>
        </div>

        <textarea
          name="bio"
          id="bio"
          maxLength={180}
          rows={4}
          placeholder="No bio here yet"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full sm:w-[320px] md:w-[360px] lg:w-[100%] rounded p-2 bg-gray-100 text-black text-sm mt-2 mb-2 justify-self-center border border-gray-800"
          disabled={isSubmitting}
        />
      </div>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <button
        id="submit-btn"
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
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>

      <button
        id="delete-btn"
        type="button"
        onClick={handleDeleteBio}
        disabled={isSubmitting}
        className="text-white inline-flex items-center justify-center bg-[#181438e3] hover:brightness-150 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="me-1 -ms-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Delete bio
      </button>

      {showDeleteConfirm && (
        <div className="max-w-[100%] rounded bg-red-100 mt-2 p-2 border border-red-600 text-red-600">
          <div>Are you sure you want to delete this bio?</div>

          <p
            onClick={confirmDeleteBio}
            className="mt-2 max-w-content text-sm text-red-600 hover:underline hover:font-bold cursor-pointer"
          >
            Yes
          </p>

          <p
            onClick={denyDeleteBio}
            className="mt-2 max-w-content text-sm text-red-600 hover:underline hover:font-bold cursor-pointer"
          >
            No
          </p>
        </div>
      )}
    </form>
  );
};
export default BioForm;
