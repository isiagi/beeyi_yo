/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/base";
import { useEffect, useState } from "react";

export default function useFetchData() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await axiosInstance.get("/products/product/");
      console.log("zzzz", products.data);

      setLoading(false);
      setProducts(products.data);
    };

    fetchProducts();
  }, []);
  return [products, loading];
}
