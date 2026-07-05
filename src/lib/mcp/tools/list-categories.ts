import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description:
    "List the product categories available in the BrendSport catalog and the sizes each category uses.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const categories = [
      { value: "shoes", label: "Shoes", sizes: ["36","37","38","39","40","41","42","43","44"] },
      { value: "cloth", label: "Cloth", sizes: ["XS","S","M","L","XL","2XL","3XL"] },
      { value: "sport-cloth", label: "Sport Cloth", sizes: ["XS","S","M","L","XL","2XL","3XL"] },
      { value: "sport-shoes", label: "Sport Shoes", sizes: ["36","37","38","39","40","41","42","43","44"] },
    ];
    // z.unused suppress
    void z;
    return {
      content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
      structuredContent: { categories },
    };
  },
});
