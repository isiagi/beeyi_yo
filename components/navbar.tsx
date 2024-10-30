/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useAuthStore from "@/lib/authstore";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/base";
import Image from "next/image";
import img from "@/app/beeyi.jpeg";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [openSell, setOpenSell] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState("no_promo");
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    product_location: "",
    product_image: "",
    product_condition: "",
    product_brand: "",
    product_category: "",
    product_promotion: "",
    product_sub_category: "",
  } as any);
  const [data, setData] = useState<any>([]);

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

  const promotionOptions = [
    { id: "no_promo", label: "No promo", price: "Free", duration: "" },
    { id: "top_7", label: "TOP", price: "USh 10,000", duration: "7 days" },
    { id: "top_30", label: "TOP", price: "USh 30,000", duration: "30 days" },
    {
      id: "boost_premium",
      label: "Boost Premium promo",
      price: "USh 137,699",
      duration: "1 month (28 days)",
    },
  ];

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

  const conditions = ["new", "used", "refurbished"];

  const user = useAuthStore((state: any) => state.user);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { id, files, value } = e.target;

    if (id === "product_image" && files) {
      setFormData((prev: any) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev: any) => ({ ...prev, [id]: value }));
    }
  };

  console.log("data", data);

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const response = await axiosInstance.get("/categories/categories/");
        setData(response.data);

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategorys();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // TODO: Integrate backend submission logic here, e.g.:
    // await fetch('/api/list-product', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    // empty the form data after submission
    try {
      const response = await axiosInstance.post(
        "/products/product/",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setFormData({
        product_name: "",
        product_price: "",
        product_description: "",
        product_location: "",
        product_image: "",
        product_condition: "",
        product_brand: "",
        product_category: "",
        product_promotion: "",
        product_sub_category: "",
      });
      setSelectedCategory("");
      setSelectedSubcategory("");
      setOpenSell(false);
    } catch (error) {
      console.log(error);
      setOpenSell(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 ml-6 flex items-center space-x-2" href="/">
            <Image
              src={img}
              alt="beeyi_yo image"
              width={50}
              height={50}
              className="rounded-sm"
            />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {/* <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/products"
            >
              Products
            </Link> */}
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
            {/* <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </Link> */}
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
              {/* <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/products"
                onClick={() => setIsNavOpen(false)}
              >
                Products
              </Link> */}
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
              {/* <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/about"
                onClick={() => setIsNavOpen(false)}
              >
                About
              </Link> */}
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
            <Dialog open={openSell} onOpenChange={setOpenSell}>
              <DialogTrigger
                asChild
                onClick={() => !user && router.push("/signin")}
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Quick Sell
                </Button>
              </DialogTrigger>
              {user && (
                <DialogContent className="sm:max-w-[525px] overflow-y-scroll max-h-screen">
                  <DialogHeader>
                    <DialogTitle>List Your Product</DialogTitle>
                    <DialogDescription>
                      Fill out the details to list your product for sale.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    className="grid gap-4 py-4"
                    encType="multipart/form-data"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="product_name">Product Name</Label>
                      <Input
                        id="product_name"
                        placeholder="Enter product name"
                        onChange={handleChange}
                        value={formData.product_name}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product_description">Description</Label>
                      <Textarea
                        id="product_description"
                        placeholder="Describe your product"
                        onChange={handleChange}
                        value={formData.product_description}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product_category">Category</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          setSelectedSubcategory("");
                          setFormData({ ...formData, product_category: value });
                        }}
                      >
                        <SelectTrigger id="product_category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((category: any) => (
                            <SelectItem
                              key={category.name}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedCategory && (
                      <div className="grid gap-2">
                        <Label htmlFor="product_sub_category">
                          Subcategory
                        </Label>
                        <Select
                          value={selectedSubcategory}
                          onValueChange={(value) => {
                            setSelectedSubcategory(value);
                            setFormData({
                              ...formData,
                              product_sub_category: value,
                            });
                          }}
                        >
                          <SelectTrigger id="product_sub_category">
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {data
                              .find((cat: any) => cat.name === selectedCategory)
                              ?.subcategories.map((subcat: any) => (
                                <SelectItem key={subcat.id} value={subcat.name}>
                                  {subcat.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="grid gap-2">
                      <Label htmlFor="product_price">Price</Label>
                      <Input
                        id="product_price"
                        type="number"
                        placeholder="Enter price"
                        onChange={handleChange}
                        value={formData.product_price}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product_condition">Condition</Label>
                      <Select
                        onValueChange={(value) => {
                          setFormData({
                            ...formData,
                            product_condition: value,
                          });
                        }}
                      >
                        <SelectTrigger id="product_condition">
                          <SelectValue placeholder="Select a condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product_brand">Brand</Label>
                      <Input
                        id="product_brand"
                        type="text"
                        placeholder="Enter brand"
                        onChange={handleChange}
                        value={formData.product_brand}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product_location">Location</Label>
                      <Input
                        id="product_location"
                        type="text"
                        placeholder="Enter location"
                        onChange={handleChange}
                        value={formData.product_location}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product_image">Product Image</Label>
                      <Input
                        id="product_image"
                        onChange={handleChange}
                        type="file"
                        accept="image/*"
                        value={formData.product_image}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Promote your ad</Label>
                      <RadioGroup
                        value={selectedPromotion}
                        onValueChange={setSelectedPromotion}
                      >
                        {promotionOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="flex-1">
                              <span className="font-medium">
                                {option.label}
                              </span>
                              {option.duration && (
                                <span className="ml-2 text-sm text-gray-500">
                                  ({option.duration})
                                </span>
                              )}
                            </Label>
                            <span className="text-sm font-medium">
                              {option.price}
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <Button type="submit">List Product</Button>
                  </form>
                </DialogContent>
              )}
            </Dialog>
            {/* <Button variant="ghost" size="icon">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Cart</span>
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10 cursor-pointer">
                  <Avatar className="h-6 w-6">
                    <AvatarImage alt="User" src="/placeholder-user.jpg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shop">Shop</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signin">Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
