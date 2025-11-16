import type { Profile } from "@/utils/types/user/profile";

export interface AuthContextType {
  auth: {
    // user: unknown | null;
    user: Profile | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<Profile>;
    register: (
      name: string,
      email: string,
      password: string,
    ) => Promise<unknown | null>;
    logout: () => void;
  };
}
