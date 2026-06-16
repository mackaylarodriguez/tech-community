/**
 * Shared constants used across the frontend.
 * Categories match the Tech Community apprenticeship requirements.
 */
export const CATEGORIES = [
  "Software Engineering",
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "UX/UI",
  "AI/ML",
  "DevOps",
];

export function getCategoryClass(category) {
  const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `tag-${slug}`;
}
