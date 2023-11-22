import { useState } from "react";
import { products } from "../utils/products";

interface SidebarProps {
  onSortChange: (sortOption: SortOption) => void;
  onCategoryChange: (category: string) => void;
}

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

const Sidebar: React.FC<SidebarProps> = ({ onSortChange, onCategoryChange }) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>("price-asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSortChange = (sortOption: SortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  // Extract unique categories from your products
  const uniqueCategories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="w-full p-2 bg-gray-200">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Sort By</label>
        <select
          className="border p-2 w-full text-sm rounded-md"
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Filter By Category</label>
        <select
          className="border p-2 w-full text-sm rounded-md"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
