/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/base";
import { useFetchedDataStore } from "@/store/fetchedDataStore";
import { useEffect, useState } from "react";

export default function useFetchData() {
  const setFetchedData = useFetchedDataStore(
    (state: any) => state.setFetchedData
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch only if no data exists in the store
      const existingProducts = useFetchedDataStore.getState().fetchedData;
      if (existingProducts?.length) {
        setLoading(false);
        return; // Skip fetching if products are already available
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get("/products/product/");
        console.log("Fetched Products:", response.data);

        // Set fetched data in Zustand store
        setFetchedData(response.data); // Use Zustand to set fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setFetchedData]); // Ensure setFetchedData is stable and doesn't change

  // Return products from Zustand store instead of local state
  const products = useFetchedDataStore((state) => state.fetchedData);
  return [products, loading];
}
