import type { NavLink } from "@/utils/types/navbar/types";

export const showLink = (link: NavLink, auth: boolean): boolean => {
  if (link.authOnly && !auth) return false;
  if (link.guestOnly && auth) return false;
  return true;
};
