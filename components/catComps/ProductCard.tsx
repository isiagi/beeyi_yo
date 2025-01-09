/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Ugx = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "UGX",
});

const ProductCard = ({ product }: any) => (
  <Card className="flex flex-col justify-between">
    <CardContent className="p-4">
      <div className="aspect-square relative mb-4">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <h2 className="text-lg font-semibold">{product.product_name}</h2>
      <p className="text-sm text-muted-foreground mb-2">
        Condition: {product.product_condition}
      </p>
      <p className="text-sm text-muted-foreground mb-2">
        Brand: {product.product_brand}
      </p>
      <p className="text-lg font-bold">{Ugx.format(product.product_price)}</p>
    </CardContent>
  </Card>
);

export default ProductCard;
