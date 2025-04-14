
import { useState, useEffect } from "react";
import { getCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(["all", ...getCategories()]);
  }, []);

  return (
    <div className="w-full py-4">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex space-x-2 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`category-pill ${
                selectedCategory === category ? "active" : ""
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
