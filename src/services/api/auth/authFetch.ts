import { headers } from "@/services/api/auth/config/headers";

export const authFetch = (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
};
