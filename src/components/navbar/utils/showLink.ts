import type { NavLink } from "@/components/navbar/types/types";

export const showLink = (link: NavLink, auth: boolean): boolean => {
  if (link.authOnly && !auth) return false;
  if (link.guestOnly && auth) return false;
  return true;
};
