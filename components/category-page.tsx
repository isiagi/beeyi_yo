"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data for products with consistent ratings
const products = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 30 + i * 2,
    rating: 4.5, // Fixed rating to avoid hydration errors
    category: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "Cameras",
      "Audio",
      "Wearables",
    ][Math.floor(Math.random() * 6)],
    brand: ["Apple", "Samsung", "Sony", "LG", "Dell", "Bose"][
      Math.floor(Math.random() * 6)
    ],
    condition: ["New", "Like New", "Good", "Fair", "Poor"][
      Math.floor(Math.random() * 5)
    ],
    location: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][
      Math.floor(Math.random() * 5)
    ],
  }));

const subcategories = [
  "Smartphones",
  "Laptops",
  "Tablets",
  "Cameras",
  "Audio",
  "Wearables",
];

const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

const brands = ["Apple", "Samsung", "Sony", "LG", "Dell", "Bose"];

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500 and above", min: 500, max: Infinity },
];

export function CategoryPageComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<
    string[]
  >([]);
  const [selectedLocation, setSelectedLocation] = React.useState<
    string | undefined
  >();
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = React.useState<
    string | undefined
  >();
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<
    string | undefined
  >();
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      if (
        selectedSubcategories.length &&
        !selectedSubcategories.includes(product.category)
      )
        return false;
      if (selectedLocation && product.location !== selectedLocation)
        return false;
      if (selectedBrands.length && !selectedBrands.includes(product.brand))
        return false;
      if (selectedCondition && product.condition !== selectedCondition)
        return false;
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        if (product.price < min || product.price > max) return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const CollapsibleFilter = ({
    title,
    children,
    defaultOpen = false,
  }: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-semibold">
          {title}
          <span>{isOpen ? "-" : "+"}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    );
  };

  const CategoryFilters = () => (
    <div className="space-y-4">
      <CollapsibleFilter title="Subcategories" defaultOpen={true}>
        <ScrollArea className="h-[120px] pr-4">
          {subcategories.map((subcategory) => (
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

      <CollapsibleFilter title="Location">
        <ScrollArea className="h-[120px] pr-4">
          <RadioGroup
            value={selectedLocation}
            onValueChange={setSelectedLocation}
            className="space-y-0"
          >
            {locations.map((location) => (
              <div key={location} className="flex items-center">
                <RadioGroupItem value={location} id={`location-${location}`} />
                <Label
                  htmlFor={`location-${location}`}
                  className="ml-2 flex-grow py-2"
                >
                  {location}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </CollapsibleFilter>

      <CollapsibleFilter title="Price Range">
        <RadioGroup
          value={selectedPriceRange}
          onValueChange={setSelectedPriceRange}
          className="space-y-0"
        >
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center">
              <RadioGroupItem
                value={`${range.min}-${range.max}`}
                id={`price-${range.label}`}
              />
              <Label
                htmlFor={`price-${range.label}`}
                className="ml-2 flex-grow py-2"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CollapsibleFilter>

      <CollapsibleFilter title="Brand">
        <ScrollArea className="h-[120px] pr-4">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="ml-2 flex-grow py-2">
                {brand}
              </Label>
            </div>
          ))}
        </ScrollArea>
      </CollapsibleFilter>

      <CollapsibleFilter title="Condition">
        <ScrollArea className="h-[120px] pr-4">
          <RadioGroup
            value={selectedCondition}
            onValueChange={setSelectedCondition}
            className="space-y-0"
          >
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center">
                <RadioGroupItem
                  value={condition}
                  id={`condition-${condition}`}
                />
                <Label
                  htmlFor={`condition-${condition}`}
                  className="ml-2 flex-grow py-2"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </CollapsibleFilter>

      <div className="text-center font-semibold">
        Click below to submit filter
      </div>
      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Electronics</h1>

      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <CategoryFilters />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 hidden lg:block">
          <CategoryFilters />
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProducts
              .slice(
                (currentPage - 1) * productsPerPage,
                currentPage * productsPerPage
              )
              .map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col justify-between"
                >
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-4">
                      <img
                        src={`/placeholder.svg?height=300&width=300&text=Product+${product.id}`}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      Rating: {product.rating}/5
                    </p>
                    <p className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
