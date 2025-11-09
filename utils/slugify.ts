// utils/slugify.ts
export const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
