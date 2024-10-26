"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function HomepageComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [isNavOpen, setIsNavOpen] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Toys",
    "Automotive",
    "Books",
  ];

  const carouselItems = [
    {
      title: "New Arrivals",
      description: "Check out the latest products",
      image:
        "https://images.unsplash.com/photo-1718124530808-2740e8f97d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWlzc2lvbiUyMGFuZCUyMGdvYWx8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Best Sellers",
      description: "Our most popular items",
      image:
        "https://images.unsplash.com/photo-1599345585307-91babe6535a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1pc3Npb24lMjBhbmQlMjBnb2FsfGVufDB8fDB8fHww",
    },
    {
      title: "Special Offers",
      description: "Limited time deals",
      image: "/placeholder.svg?height=400&width=600&text=Special+Offers",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Searching for:", searchQuery);
  //   // Implement actual search logic here
  // };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                BuySellMarket
              </span>
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
                  <div className="grid gap-4 py-4">
                    {categories.map((category, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
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
                <Button
                  variant="link"
                  className="justify-start p-0 transition-colors hover:text-foreground/80 text-foreground/60"
                  onClick={() => setIsNavOpen(false)}
                >
                  Categories
                </Button>
                <Link
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="/about"
                  onClick={() => setIsNavOpen(false)}
                >
                  About
                </Link>
              </nav>
              <div className="mt-6">
                <SheetTitle className="mb-4">Categories</SheetTitle>
                <div className="grid gap-4">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
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
            <nav className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Cart</span>
              </Button>
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
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-12  bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Buy, Sell, and Connect on BuySellMarket
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Your one-stop marketplace for buying unique items and
                    selling your own products.
                  </p>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button size="lg">Start Shopping</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg">
                        Quick Sell
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>List Your Product</DialogTitle>
                        <DialogDescription>
                          Fill out the details to list your product for sale.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="product-name">Product Name</Label>
                          <Input
                            id="product-name"
                            placeholder="Enter product name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="product-description">
                            Description
                          </Label>
                          <Textarea
                            id="product-description"
                            placeholder="Describe your product"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="product-category">Category</Label>
                          <Select>
                            <SelectTrigger id="product-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category, index) => (
                                <SelectItem
                                  key={index}
                                  value={category.toLowerCase()}
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="product-price">Price</Label>
                          <Input
                            id="product-price"
                            type="number"
                            placeholder="Enter price"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="product-image">Product Image</Label>
                          <Input
                            id="product-image"
                            type="file"
                            accept="image/*"
                          />
                        </div>
                        <Button type="submit">List Product</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="lg">
                        Browse Categories
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Categories</SheetTitle>
                        <SheetDescription>
                          Explore our wide range of product categories
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        {categories.map((category, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-xl overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full sm:h-80 lg:h-96">
                    {carouselItems.map((item, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">
                              {item.title}
                            </h2>
                            <p className="text-white">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((product) => (
                <Link key={product} href={`/detail/${product}`}>
                  <Card key={product}>
                    <CardHeader>
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=Product ${product}`}
                        alt={`Product ${product}`}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>Product {product}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="font-bold">$99.99</span>
                      <Button variant="outline">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <ShoppingCart className="h-6 w-6" />
              <p className="text-center text-sm leading-loose md:text-left">
                © 2023 BuySellMarket. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link className="text-sm underline" href="/terms">
                Terms
              </Link>
              <Link className="text-sm underline" href="/privacy">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
