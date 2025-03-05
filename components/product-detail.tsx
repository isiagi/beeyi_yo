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
import { axiosInstance } from "@/lib/base";

export function ProductDetailComponent({ id }: any) {
  // const images = [
  //   "https://images.unsplash.com/file-1719664968387-83d5a3f4d758image?w=416&dpr=2&auto=format&fit=crop&q=60",
  //   "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhZ3N8ZW58MHx8MHx8fDA%3D",
  // ];
  const [product, setProduct] = useState<any>(null);

  const [products, loading] = useFetchData();

  useEffect(() => {
    // Find the product with the matching ID from server
    const foundProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    foundProduct();
  }, [products, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Still Loading.
      </div>
    );
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
            {product.images.map((src: any, index: any) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative">
                  <img
                    src={src.image}
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
              <p className="font-semibold">{product.seller_username}</p>
              <p className="text-sm text-gray-600">
                Contact: {product.contact_phone}
              </p>
              <p className="text-sm text-gray-600">
                Email: {product.contact_email}
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
              {/* <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger> */}
            </TabsList>
            <TabsContent value="description">
              <p>{product.product_description}</p>
            </TabsContent>
            {/* <TabsContent value="specifications">
              <ul className="list-disc list-inside">
                <li>Weight capacity: 300 lbs</li>
                <li>Seat height: 17&quot; - 21&quot; (adjustable)</li>
                <li>Armrest: 3D adjustable</li>
                <li>Back material: Breathable mesh</li>
                <li>Base: 5-star with smooth-rolling casters</li>
              </ul>
            </TabsContent> */}
            {/* <TabsContent value="shipping">
              <p>
                Free shipping on orders over $500. Standard delivery takes 3-5
                business days. Express shipping options are available at
                checkout.
              </p>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
