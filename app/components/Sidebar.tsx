"use client"
import { useState } from "react";

interface SidebarProps {
  onSortChange: (sortOption: SortOption) => void;
}

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

const Sidebar: React.FC<SidebarProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>("price-asc");

  const handleSortChange = (sortOption: SortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-200">
      <h2 className="text-lg font-semibold mb-4">Sort</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Sort By</label>
        <select
          className="border p-2 w-full"
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
