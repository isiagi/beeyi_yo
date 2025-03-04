/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useFetchedDataStore = create<any>((set) => ({
  fetchedData: null,
  setFetchedData: (data: any) => set({ fetchedData: data }),
}));
