"use client";

import React from "react";
import Link from "next/link";
import { Menu, PlusCircle, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // const categories = [
  //   "Electronics",
  //   "Fashion",
  //   "Home & Garden",
  //   "Sports",
  //   "Beauty",
  //   "Toys",
  //   "Automotive",
  //   "Books",
  // ];

  const categories = [
    {
      name: "Electronics",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"],
    },
    {
      name: "Fashion",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories",
      ],
    },
    {
      name: "Home & Garden",
      subcategories: ["Furniture", "Decor", "Kitchen", "Outdoor"],
    },
    {
      name: "Sports",
      subcategories: ["Equipment", "Clothing", "Footwear", "Accessories"],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">Beeyi Yo</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/products"
            >
              Products
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="link"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Categories
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Categories</SheetTitle>
                  <SheetDescription>
                    Explore our wide range of product categories
                  </SheetDescription>
                </SheetHeader>
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((category, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{category.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2">
                          {category.subcategories.map(
                            (subcategory, subIndex) => (
                              <Button
                                key={subIndex}
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                {subcategory}
                              </Button>
                            )
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </SheetContent>
            </Sheet>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </Link>
          </nav>
        </div>
        <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/products"
                onClick={() => setIsNavOpen(false)}
              >
                Products
              </Link>
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{category.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsNavOpen(false)}
                          >
                            {subcategory}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/about"
                onClick={() => setIsNavOpen(false)}
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <nav className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Quick Sell
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] overflow-y-scroll max-h-screen">
                <DialogHeader>
                  <DialogTitle>List Your Product</DialogTitle>
                  <DialogDescription>
                    Fill out the details to list your product for sale.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                      id="product-description"
                      placeholder="Describe your product"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select onValueChange={handleCategoryChange}>
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedCategory && (
                    <div className="grid gap-2">
                      <Label htmlFor="product-subcategory">Subcategory</Label>
                      <Select
                        value={selectedSubcategory}
                        onValueChange={setSelectedSubcategory}
                      >
                        <SelectTrigger id="product-subcategory">
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .find((cat) => cat.name === selectedCategory)
                            ?.subcategories.map((subcat) => (
                              <SelectItem key={subcat} value={subcat}>
                                {subcat}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="product-price">Price</Label>
                    <Input
                      id="product-price"
                      type="number"
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-price">Location</Label>
                    <Input
                      id="product-location"
                      type="text"
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-image">Product Image</Label>
                    <Input id="product-image" type="file" accept="image/*" />
                  </div>
                  <Button type="submit">List Product</Button>
                </form>
              </DialogContent>
            </Dialog>
            {/* <Button variant="ghost" size="icon">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Cart</span>
            </Button> */}
            <Button variant="ghost" size="icon">
              <Avatar className="h-6 w-6">
                <AvatarImage alt="User" src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="sr-only">User</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
