"use client";

import { useState, useEffect, useRef } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  PlusCircle,
  Search,
  ShoppingCart,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  BookOpen,
  Sparkles,
  Gamepad,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useFetchData from "@/hooks/useFetchData";

export function HomepageComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("no_promo");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const categories = [
    {
      name: "Electronics",
      icon: Smartphone,
      subcategories: ["Phones", "Computers", "Tablets", "Accessories"],
    },
    {
      name: "Fashion",
      icon: Shirt,
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories",
      ],
    },
    {
      name: "Home & Garden",
      icon: Home,
      subcategories: ["Furniture", "Decor", "Kitchen", "Outdoor"],
    },
    {
      name: "Sports",
      icon: Dumbbell,
      subcategories: ["Equipment", "Clothing", "Footwear", "Accessories"],
    },
    {
      name: "Books",
      icon: BookOpen,
      subcategories: ["Fiction", "Non-fiction", "Educational", "Children's"],
    },
    {
      name: "Beauty",
      icon: Sparkles,
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"],
    },
    {
      name: "Toys",
      icon: Gamepad,
      subcategories: [
        "Action Figures",
        "Board Games",
        "Outdoor Toys",
        "Educational Toys",
      ],
    },
  ];

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

  const [products, loading] = useFetchData();

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
  };

  const scrollCategories = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust this value to change scroll distance
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex items-center flex-1">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                BuySellMarket
              </span>
            </Link>
            <div className="relative flex items-center flex-1 max-w-[50%]">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10"
                onClick={() => scrollCategories("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div
                ref={scrollContainerRef}
                className="flex items-center space-x-2 overflow-x-auto scrollbar-hide px-8"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {categories.map((category, index) => (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 px-2"
                      >
                        <category.icon className="h-4 w-4" />
                        <span className="truncate max-w-[100px]">
                          {category.name}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {category.subcategories.map((subcategory, subIndex) => (
                        <DropdownMenuItem
                          key={subIndex}
                          onSelect={() =>
                            router.push(
                              `/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`
                            )
                          }
                        >
                          {subcategory}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10"
                onClick={() => scrollCategories("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
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
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((category, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="flex items-center">
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2">
                          {category.subcategories.map(
                            (subcategory, subIndex) => (
                              <Button
                                key={subIndex}
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => setIsNavOpen(false)}
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
              </nav>
            </SheetContent>
          </Sheet>
          {/* <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/sell">
                <Button variant="outline" size="sm" className="flex">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Quick Sell
                </Button>
              </Link>
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
          </div> */}
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
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
                  <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
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
              {products?.map((product) => (
                <Card key={product}>
                  <CardHeader>
                    <img
                      src={`/placeholder.svg?height=200&width=200&text=Product ${product}`}
                      alt={`Product ${product}`}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.title}</CardTitle>
                    <p className="text-sm text-gray-500 my-2 dark:text-gray-400">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-900 dark:text-gray-400 font-bold">
                      Seller:{" "}
                      <span className="font-normal text-gray-700 dark:text-gray-300">
                        {product.seller_username}
                      </span>
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="font-bold">
                      {currencyFormatter.format(product.price)}
                    </span>
                    <Link href={`/detail/${product.id}`}>
                      <Button variant="outline">Add to Cart</Button>
                    </Link>
                  </CardFooter>
                </Card>
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
