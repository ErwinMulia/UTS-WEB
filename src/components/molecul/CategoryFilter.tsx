import { useState } from "react";
import CategoryButton from "../atom/Categorybutton";

const categories = ["All", "Music", "Sport", "Theatre"];

type CategoryFilterProps = {
  onFilterChange: (category: string) => void;
};

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [active, setActive] = useState("All");

  const handleClick = (category: string) => {
    setActive(category);
    onFilterChange(category);
  };

  return (
    <div className="flex justify-center flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <CategoryButton
          key={cat}
          label={cat}
          isActive={cat === active}
          onClick={() => handleClick(cat)}
        />
      ))}
    </div>
  );
}