import { useState } from "react";
import { API_BASE_URL, API_USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/authFetch";
import { getUserParams } from "@/services/helpers/getUserParams";
import type { Profile } from "@/services/api/user/types/profile";

export const useUpdateUserAvatar = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateAvatar = async (user: Profile, newAvatarUrl: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const profile = await getUserParams();
      const userId = profile.name;
      const userAvatar = user.avatar?.url;

      const avatar = {
        url: newAvatarUrl.trim() || userAvatar,
        alt: `Profile image for user: ${userId}`,
      };

      const response = await authFetch(
        `${API_BASE_URL}${API_USERS}/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify({ avatar }),
        },
      );

      if (response.ok) {
        setIsLoading(false);
        return await response.json();
      } else {
        throw new Error("Failed to update avatar");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Updating profile image failed.",
      );
      setIsLoading(false);
      throw error;
    }
  };

  return {
    updateAvatar,
    error,
    isLoading,
  };
};

// import { useState, useEffect } from "react";
// import { API_BASE_URL, API_USERS } from "@/services/api/auth/config/constants";
// import { authFetch } from "@/services/api/auth/authFetch";
// import { getUserParams } from "@/services/helpers/getUserParams";
// import type { Profile } from "@/services/api/user/types/profile";

// export const useUpdateUserAvatar = async (user: Profile) => {
//   const [error, setError] = useState<string | null>(null);

//   const profile = await getUserParams();
//   const userId = profile.name;
//   const userAvatar = user.avatar?.url;

//   const form = document.querySelector("#avatar-form");
//   if (!form) return;

//   const newAvatar = form.querySelector("#avatar").value.trim();
//   const avatar = {
//     url: newAvatar || userAvatar,
//     alt: `Profile image for user: ${userId}`,
//   };

//   try {
//     const response = await authFetch(`${API_BASE_URL}${API_USERS}/${userId}`, {
//       method: "PUT",
//       body: JSON.stringify({ avatar }),
//     });

//     if (response.ok) {
//       return await response.json();
//     }
//   } catch (error) {
//     setError(
//       error instanceof Error ? error.message : "Updating profile image failed."
//     );
//   }
// };
