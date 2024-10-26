"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function HomepageComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const carouselItems = [
    {
      title: "New Arrivals",
      description: "Check out the latest products",
      image: "/placeholder.svg?height=400&width=600&text=New+Arrivals",
    },
    {
      title: "Best Sellers",
      description: "Our most popular items",
      image: "/placeholder.svg?height=400&width=600&text=Best+Sellers",
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

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-12 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Tunda ku Beeyi Yo, Gula ku Beeyi Yo
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Your one-stop marketplace for buying unique items and
                    selling your own products.
                  </p>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button size="lg">Start Shopping</Button>
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
                      <Accordion type="single" collapsible className="w-full">
                        {categories.map((category, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{category.name}</AccordionTrigger>
                            <AccordionContent>
                              <div className="grid gap-2">
                                {category.subcategories.map(
                                  (subcategory, subIndex) => (
                                    <Link
                                      href={`/category/${category.name}}`}
                                      key={subIndex}
                                    >
                                      <Button
                                        key={subIndex}
                                        variant="ghost"
                                        className="w-full justify-start"
                                      >
                                        {subcategory}
                                      </Button>
                                    </Link>
                                  )
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
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
                        src={`https://images.unsplash.com/photo-1521316730702-829a8e30dfd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWlzc2lvbiUyMGFuZCUyMGdvYWx8ZW58MHx8MHx8fDA%3D`}
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
