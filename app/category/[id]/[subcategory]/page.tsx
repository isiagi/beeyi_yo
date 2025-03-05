/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { axiosInstance } from "@/lib/base";
import Link from "next/link";

// This would typically come from an API or database
// const categories = [
//   {
//     name: "Electronics",
//     subcategories: ["Phones", "Computers", "Tablets", "Accessories"],
//   },
//   {
//     name: "Fashion",
//     subcategories: [
//       "Men's Clothing",
//       "Women's Clothing",
//       "Shoes",
//       "Accessories",
//     ],
//   },
//   // ... other categories
// ];

export default function CategoryPage() {
  const params = useParams();
  const { id: category, subcategory } = params;
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<any[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);

  console.log(category, subcategory);

  // Fetch sub categories from the API
  useEffect(() => {
    // Fetch subcategories for the selected category
    const fetchSubcategories = async () => {
      try {
        setSubsLoading(true);
        const response = await axiosInstance.get(
          `/categories/categories/subcategories/${cleanParams(category)}/`
        );
        console.log(response.data, "subs");
        setSubs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setSubsLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  // This would typically come from an API based on the selected category
  useEffect(() => {
    // if (category && subcategory) {
    //   router.push(`/category/${category}/${subcategory}`);
    // }
    const categoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/products/product/?category=${subcategory}`
        );
        console.log(response.data, "test");

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    categoryProducts();
  }, [category, subcategory]);

  const [selectedSubcategory, setSelectedSubcategory] = useState(
    cleanParams(subcategory)
  );

  // clean params to remove men%27s%20clothing special character
  function cleanParams(param: any) {
    return decodeURIComponent(param.replace(/\+/g, " "));
  }

  // const currentCategory = categories.find(
  //   (c) => c.name.toLowerCase() === cleanParams(category).toLowerCase()
  // );

  // This would typically come from an API based on the selected subcategory
  // const subcategoryItems = [
  //   { id: 1, name: "Item 1", price: 99.99 },
  //   { id: 2, name: "Item 2", price: 149.99 },
  //   { id: 3, name: "Item 3", price: 79.99 },
  //   { id: 4, name: "Item 4", price: 199.99 },
  // ];

  const getProductImage = (product: any) => {
    // Check if product has images array and it's not empty
    if (
      product?.images &&
      product.images.length > 0 &&
      product.images[0].image
    ) {
      return product.images[0].image;
    }
    // Return a placeholder image URL if no product image is available
    return "/placeholder.svg?height=200&width=200&text=No+Image";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {cleanParams(category)} - {cleanParams(subcategory)}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          {/* <h2 className="text-xl font-semibold mb-4">Subcategories</h2> */}
          <ul className="space-y-2">
            {subsLoading ? (
              <p>Loading subcategories...</p>
            ) : (
              subs?.map((sub, index) => (
                <li key={index} className="flex items-center gap-4 pt-3">
                  <Checkbox
                    id={`subcategory-${index}`}
                    checked={selectedSubcategory === sub.name.toLowerCase()}
                    onCheckedChange={() => {
                      setSelectedSubcategory(sub.name.toLowerCase());
                      router.push(
                        `/category/${category}/${sub.name.toLowerCase()}`
                      );
                    }}
                  />
                  <label
                    htmlFor={`subcategory-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {sub.name}
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">
            {cleanParams(subcategory)} Items
          </h2>
          {loading ? (
            <div>Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.product_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={getProductImage(item)}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="font-bold">{item.product_price} UGX</span>
                    <Button variant="outline" asChild>
                      <Link href={`/detail/${item.id}`}>View Item</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
