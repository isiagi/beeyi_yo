import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const SortDropdown = () => (
  <Select defaultValue="featured">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="featured">Featured</SelectItem>
      <SelectItem value="price-low-high">Price: Low to High</SelectItem>
      <SelectItem value="price-high-low">Price: High to Low</SelectItem>
      <SelectItem value="newest">Newest Arrivals</SelectItem>
    </SelectContent>
  </Select>
);

export default SortDropdown;
