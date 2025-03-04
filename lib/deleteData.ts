/* eslint-disable @typescript-eslint/no-explicit-any */

import { axiosInstance } from "./base";

async function deleteData(id: any): Promise<any> {
  const response = await axiosInstance.delete(`/products/product/${id}`);

  return response.data;
}

export default deleteData;
