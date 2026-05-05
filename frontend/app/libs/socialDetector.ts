export const detectPlatform = (url: string) => {
  if (!url) return null;

  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("github.com")) return "github";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("linkedin.com")) return "linkedin";

  return "website";
};
