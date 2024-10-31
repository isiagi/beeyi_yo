import { axiosInstance } from "./base";

async function fetchSubCategory() {
  const response = await axiosInstance.get(
    "/subcategories/subcategories/by-category-name/Electronics/"
  );
  return response.data;
}

export default fetchSubCategory;
