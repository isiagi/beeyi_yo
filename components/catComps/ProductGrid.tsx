/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {products?.map((product: any) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductGrid;
