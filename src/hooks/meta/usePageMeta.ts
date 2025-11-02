import { useHead } from "@unhead/react";
import { SITE_NAME } from "@/utils/branding/config";

export const usePageMeta = (title: string, description?: string) => {
  useHead({
    title: `${title} | ${SITE_NAME}`,
    meta: [
      {
        name: "description",
        content:
          description ||
          `${SITE_NAME}: stories from the cultural corners of the world!`,
      },
      // Else
    ],
  });
};
