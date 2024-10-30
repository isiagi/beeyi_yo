/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: any) => (
  <Card className="flex flex-col justify-between">
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
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
    </CardContent>
    <CardFooter className="p-4">
      <Button className="w-full">Add to Cart</Button>
    </CardFooter>
  </Card>
);

export default ProductCard;
