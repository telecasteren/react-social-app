// General
export const SITE_NAME = "Foodiegram";
export const SITE_LOGO_PIZZA = "/logo/logo-pizza.png";
export const SITE_LOGO_NAME = "/logo/foodiegram-logo.png";
export const NO_IMG_URL = "/icons/no-image-icon.webp";

// Elements
export const MENU_ICON = "/icons/hamburger-icon-f.png";
export const endDot = `<span style="color: var(--accent); font-size: 25px;">.</span>`;

// Styles
export const sharedStyles = `block w-[80%] cursor-pointer text-sm text-gray-900 border 
border-gray-300 rounded-lg bg-gray-50 placeholder-gray-800
focus:ring-blue-500 focus:border-blue-500`;

// Meta descriptions
export const defaultPostDesc = `${SITE_NAME}: stories from the cultural corners of the world!`;
export const defaultDescFallback =
  "Login or create you account to connect with fellow Foodies.";
export const defaultDescriptions = {
  "/user/profile/": "Follow and you might make a new friend.",
  "/user/post/": "Post. Like and comment.",
  "/user/feed/": "Explore for tips and recommendations.",
};

//========================
// BRANDING CONFIG
//========================

interface BrandingConfig {
  appName: string;
  appVersion: string;
  appDescription: string;
  companyName: string;

  meta?: {
    titleTemplate?: string;
    defaultTitle?: string;
    description?: string;
    keywords?: string[];
  };

  logo: {
    light: string;
    dark: string;
    favicon: string;
    alt: string;
  };

  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };

  typography: {
    fontFamily: string;
    fontWeights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    fontSizes: {
      [key: string]: string;
    };
  };

  links: {
    homepage: string;
    support: string;
    terms: string;
    faq: string;
  };
}

export const defaultBranding: BrandingConfig = {
  appName: "Foodiegram",
  appVersion: "1.0.0",
  appDescription: "A social platform for food enthusiasts.",
  companyName: "FOODIEGRAM",

  meta: {
    titleTemplate: "FOODIEGRAM",
    defaultTitle: "FOODIEGRAM",
    description: "A social platform for food enthusiasts.",
    keywords: ["food", "social", "community"],
  },

  logo: {
    light: "",
    dark: "",
    favicon: "",
    alt: "Site logo",
  },

  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#f59e0b",
    background: "#ffffff",
    foreground: "#0f172a",
  },

  typography: {
    fontFamily: "Tomatogrotesk, sans-serif",
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },

  links: {
    homepage: "",
    support: "",
    terms: "",
    faq: "",
  },
};
