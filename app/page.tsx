"use client"

export const revalidate = 0;

import { useState } from "react";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products } from "./utils/products";
import ProductCard from "./components/product/ProductCard";
import Sidebar from "./components/Sidebar";

export default function Home() {

  const [sortedProducts, setSortedProducts] = useState(products);
  const [filteredCategory, setFilteredCategory] = useState("");
  

  const handleSortChange = (sortOption: string) => {
  
    let sortedProductsCopy = [...products];

    switch (sortOption) {
      case "price-asc":
        sortedProductsCopy.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProductsCopy.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProductsCopy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setSortedProducts(sortedProductsCopy);
  };

  const handleCategoryChange = (category: string) => {
    setFilteredCategory(category);
  };

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className=" w-[70%] md:w-[20%]">
            <Sidebar onSortChange={handleSortChange} onCategoryChange={handleCategoryChange} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {sortedProducts .filter((product) => !filteredCategory || product.category.includes(filteredCategory)).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
