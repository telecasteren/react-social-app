export interface AuthContextType {
  auth: {
    user: unknown | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<unknown | null>;
    register: (
      name: string,
      email: string,
      password: string,
    ) => Promise<unknown | null>;
    logout: () => void;
  };
}
