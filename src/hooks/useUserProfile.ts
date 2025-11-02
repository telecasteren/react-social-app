import { useQuery } from "@tanstack/react-query";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => getSingleUserProfile(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });
};
