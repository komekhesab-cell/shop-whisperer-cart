import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import searchProducts from "./tools/search-products";
import getProduct from "./tools/get-product";
import listCategories from "./tools/list-categories";

export default defineMcp({
  name: "brendsport-mcp",
  title: "BrendSport Store",
  version: "0.1.0",
  instructions:
    "Tools for browsing the BrendSport clothing & shoe catalog. Use `list_categories` to see available product categories, `list_products` to browse products (optionally filtered by category), `search_products` to find products by keyword, and `get_product` to fetch full details of a specific product.",
  tools: [listProducts, searchProducts, getProduct, listCategories],
});
