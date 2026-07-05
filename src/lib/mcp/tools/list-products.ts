import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

function sb() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List products in the BrendSport catalog. Optionally filter by category (shoes, cloth, sport-cloth, sport-shoes).",
  inputSchema: {
    category: z
      .enum(["shoes", "cloth", "sport-cloth", "sport-shoes"])
      .optional()
      .describe("Optional category filter"),
    limit: z.number().int().min(1).max(100).default(50),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }) => {
    let q = sb().from("products").select("*").limit(limit);
    if (category) q = q.eq("category", category);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { products: data },
    };
  },
});
