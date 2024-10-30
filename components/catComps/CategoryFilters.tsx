/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import CollapsibleFilter from "./CollapsibleFilter";

const CategoryFilters = ({
  subcategories,
  selectedSubcategories,
  handleSubcategoryChange,
  //   locations,
  //   selectedLocation,
  //   setSelectedLocation,
  //   priceRanges,
  //   selectedPriceRange,
  //   setSelectedPriceRange,
  //   brands,
  //   selectedBrands,
  //   handleBrandChange,
  //   conditions,
  //   selectedCondition,
  //   setSelectedCondition,
  applyFilters,
}: any) => (
  <div className="space-y-4">
    <CollapsibleFilter title="Subcategories" defaultOpen={false}>
      <ScrollArea className="h-[120px] pr-4">
        {subcategories.map((subcategory: any) => (
          <div key={subcategory} className="flex items-center">
            <Checkbox
              id={`subcategory-${subcategory}`}
              checked={selectedSubcategories.includes(subcategory)}
              onCheckedChange={() => handleSubcategoryChange(subcategory)}
            />
            <Label
              htmlFor={`subcategory-${subcategory}`}
              className="ml-2 flex-grow py-2"
            >
              {subcategory}
            </Label>
          </div>
        ))}
      </ScrollArea>
    </CollapsibleFilter>
    {/* Add similar CollapsibleFilters for locations, price ranges, brands, and conditions */}
    <div className="text-center font-semibold">
      Click below to submit filter
    </div>
    <Button className="w-full" onClick={applyFilters}>
      Apply Filters
    </Button>
  </div>
);

export default CategoryFilters;
