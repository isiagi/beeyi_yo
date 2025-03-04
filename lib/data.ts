const subcategories = [
  "Smartphones",
  "Laptops",
  "Tablets",
  "Cameras",
  "Audio",
  "Wearables",
];

const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

const brands = ["Apple", "Samsung", "Sony", "LG", "Dell", "Bose"];

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500 and above", min: 500, max: Infinity },
];

const products = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 30 + i * 2,
    rating: 4.5,
    category: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "Cameras",
      "Audio",
      "Wearables",
    ][Math.floor(Math.random() * 6)],
    brand: ["Apple", "Samsung", "Sony", "LG", "Dell", "Bose"][
      Math.floor(Math.random() * 6)
    ],
    condition: ["New", "Like New", "Good", "Fair", "Poor"][
      Math.floor(Math.random() * 5)
    ],
    location: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][
      Math.floor(Math.random() * 5)
    ],
  }));

export { subcategories, brands, products, conditions, locations, priceRanges };
