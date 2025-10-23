export interface NavLink {
  text: string;
  href: string;
  authOnly?: boolean;
  guestOnly?: boolean;
  isDropdown?: boolean;
}

export interface NavContentProps {
  auth: boolean;
  links: NavLink[];
  className?: string;
  navRef?: React.RefObject<HTMLUListElement | null>;
}
