/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";

export function ProductDetailComponent({ id }: any) {
  const images = [
    "https://images.unsplash.com/file-1719664968387-83d5a3f4d758image?w=416&dpr=2&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhZ3N8ZW58MHx8MHx8fDA%3D",
  ];
  const [product, setProduct] = useState<any>(null);

  const [products, loading] = useFetchData();

  useEffect(() => {
    console.log("Fetched products:", products);
    const foundProduct = products?.find(
      (product: any) => product.id === Number(id)
    );
    setProduct(foundProduct);
  }, [products, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  console.log(product, "product");

  const Ugx = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {/* Product Image Carousel */}
        <Carousel className="w-full md:h-[400px] max-w-xs mx-auto md:max-w-md">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative">
                  <img
                    src={product.image_url}
                    alt={`Product Image ${index + 1}`}
                    className="object-cover h-full rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.product_name}</h1>
          {/* <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(128 reviews)</span>
          </div> */}
          <p className="text-xl font-bold">
            {Ugx.format(product.product_price)}
          </p>
          <p className="text-gray-600">{product.product_description}</p>

          {/* Seller Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">John&apos;s Office Supplies</p>
              <p className="text-sm text-gray-600">
                Member since: January 2020
              </p>
              <p className="text-sm text-gray-600">
                Rating: 4.8/5 (203 reviews)
              </p>
              <div className="mt-4 space-y-2">
                <Button className="w-full" variant="outline">
                  <Phone className="mr-2 h-4 w-4" /> Contact Seller
                </Button>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>
                Our ergonomic office chair is designed to provide maximum
                comfort and support during long work hours. It features a
                breathable mesh back, adjustable lumbar support, and
                customizable armrests to fit your body perfectly.
              </p>
            </TabsContent>
            <TabsContent value="specifications">
              <ul className="list-disc list-inside">
                <li>Weight capacity: 300 lbs</li>
                <li>Seat height: 17&quot; - 21&quot; (adjustable)</li>
                <li>Armrest: 3D adjustable</li>
                <li>Back material: Breathable mesh</li>
                <li>Base: 5-star with smooth-rolling casters</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping">
              <p>
                Free shipping on orders over $500. Standard delivery takes 3-5
                business days. Express shipping options are available at
                checkout.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
