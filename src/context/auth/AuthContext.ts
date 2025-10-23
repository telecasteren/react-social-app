import { createContext } from "react";
import type { AuthContextType } from "@/utils/types/auth/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
