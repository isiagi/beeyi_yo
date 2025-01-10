"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

// This would typically come from an API or database
const categories = [
  {
    name: "Electronics",
    subcategories: ["Phones", "Computers", "Tablets", "Accessories"],
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
  // ... other categories
];

export default function CategoryPage() {
  const params = useParams();
  const { id: category, subcategory } = params;
  const router = useRouter();

  console.log(category, subcategory);

  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory);

  const currentCategory = categories.find(
    (c) => c.name.toLowerCase() === category
  );

  // This would typically come from an API based on the selected subcategory
  const subcategoryItems = [
    { id: 1, name: "Item 1", price: 99.99 },
    { id: 2, name: "Item 2", price: 149.99 },
    { id: 3, name: "Item 3", price: 79.99 },
    { id: 4, name: "Item 4", price: 199.99 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {category} - {subcategory}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
          <ul className="space-y-2">
            {currentCategory?.subcategories.map((sub, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`subcategory-${index}`}
                  checked={selectedSubcategory === sub.toLowerCase()}
                  onCheckedChange={() => {
                    setSelectedSubcategory(sub.toLowerCase());
                    router.push(`/category/${category}/${sub.toLowerCase()}`);
                  }}
                />
                <label
                  htmlFor={`subcategory-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {sub}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">{subcategory} Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategoryItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={`https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzc2lvbiUyMGFuZCUyMGdvYWx8ZW58MHx8MHx8fDA%3D`}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  <Button variant="outline">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
