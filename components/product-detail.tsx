'use client'

import { Star, Phone, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function ProductDetailComponent() {
  const images = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <Carousel className="w-full max-w-xs mx-auto md:max-w-md">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative">
                  <img
                    src={src}
                    alt={`Product Image ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Ergonomic Office Chair</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">(128 reviews)</span>
          </div>
          <p className="text-xl font-bold">$299.99</p>
          <p className="text-gray-600">
            Experience ultimate comfort with our ergonomic office chair. Designed to support your body during long work hours, this chair features adjustable lumbar support, breathable mesh back, and customizable armrests.
          </p>

          {/* Seller Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">John's Office Supplies</p>
              <p className="text-sm text-gray-600">Member since: January 2020</p>
              <p className="text-sm text-gray-600">Rating: 4.8/5 (203 reviews)</p>
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
              <p>Our ergonomic office chair is designed to provide maximum comfort and support during long work hours. It features a breathable mesh back, adjustable lumbar support, and customizable armrests to fit your body perfectly.</p>
            </TabsContent>
            <TabsContent value="specifications">
              <ul className="list-disc list-inside">
                <li>Weight capacity: 300 lbs</li>
                <li>Seat height: 17" - 21" (adjustable)</li>
                <li>Armrest: 3D adjustable</li>
                <li>Back material: Breathable mesh</li>
                <li>Base: 5-star with smooth-rolling casters</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping">
              <p>Free shipping on orders over $500. Standard delivery takes 3-5 business days. Express shipping options are available at checkout.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}