import { getCategoryClass } from "@/lib/constants";

export default function CategoryTag({ category }) {
  return (
    <span className={`tag ${getCategoryClass(category)}`}>{category}</span>
  );
}
