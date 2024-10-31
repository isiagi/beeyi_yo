/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CategoryFilters from "./CategoryFilters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
// import SortDropdown from "./SortDropdown";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  // products,
  // subcategories,
  locations,
  brands,
  conditions,
  priceRanges,
} from "@/lib/data"; // Assume mock data is in a separate file
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import useFetchData from "@/hooks/useFetchData";
import fetchSubCategory from "@/lib/fetchSubCategory";

const CategoryPageComponent = () => {
  const [products, loading] = useFetchData();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  const [selectedSubcategories, setSelectedSubcategories] = React.useState<any>(
    []
  );
  const [selectedLocation, setSelectedLocation] =
    React.useState<any>(undefined);
  const [selectedBrands, setSelectedBrands] = React.useState<any>([]);
  const [selectedCondition, setSelectedCondition] =
    React.useState<any>(undefined);
  const [selectedPriceRange, setSelectedPriceRange] =
    React.useState<any>(undefined);

  const applyFilters = () => {
    const filtered = products.filter((product: any) => {
      // Filter by subcategories if any are selected
      if (
        selectedSubcategories.length &&
        !selectedSubcategories.includes(product.product_sub_category)
      ) {
        return false;
      }

      // Filter by location if one is selected
      if (selectedLocation && product.location !== selectedLocation) {
        return false;
      }

      // Filter by brands if any are selected
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Filter by condition if one is selected
      if (selectedCondition && product.condition !== selectedCondition) {
        return false;
      }

      // Filter by price range if one is selected
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      return true;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after applying filters
  };

  const handleSubcategoryChange = (subcategory: any) => {
    setSelectedSubcategories((prev: any) =>
      prev.includes(subcategory)
        ? prev.filter((item: any) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleBrandChange = (brand: any) => {
    setSelectedBrands((prev: any) =>
      prev.includes(brand)
        ? prev.filter((item: any) => item !== brand)
        : [...prev, brand]
    );
  };

  useEffect(() => {
    if (products?.length > 0) {
      applyFilters();
    }
  }, [
    products,
    selectedSubcategories,
    selectedLocation,
    selectedBrands,
    selectedCondition,
    selectedPriceRange,
  ]);

  useEffect(() => {
    const fetchSub = async () => {
      const response = await fetchSubCategory();
      setCategory(response);
    };

    fetchSub();
  }, []);

  const filterProps = {
    subcategories: category, // array of subcategory options (e.g., Smartphones, Laptops)
    locations, // array of location options (e.g., New York, Los Angeles)
    brands, // array of brand options (e.g., Apple, Samsung)
    conditions, // array of condition options (e.g., New, Like New)
    priceRanges, // array of price range options (e.g., $0-$50, $50-$100)
    handleSubcategoryChange, // function to handle subcategory selection
    handleBrandChange, // function to handle brand selection
    selectedSubcategories, // state for selected subcategories
    selectedLocation, // state for selected location
    setSelectedLocation, // function to set selected location
    selectedBrands, // state for selected brands
    selectedCondition, // state for selected condition
    setSelectedCondition, // function to set selected condition
    selectedPriceRange, // state for selected price range
    setSelectedPriceRange, // function to set price range
    applyFilters, // function to apply all selected filters
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  if (products?.length === 0) {
    return <div>No products available.</div>; // Handle the case where no products are available
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#322D68]">Electronics</h1>

      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <CategoryFilters {...filterProps} applyFilters={applyFilters} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 hidden lg:block">
          <CategoryFilters {...filterProps} applyFilters={applyFilters} />
        </aside>
        <main className="flex-1">
          {/* <div className="flex justify-between items-center mb-6">
            <SortDropdown />
          </div> */}
          <ProductGrid
            products={filteredProducts?.slice(
              (currentPage - 1) * productsPerPage,
              currentPage * productsPerPage
            )}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default CategoryPageComponent;
