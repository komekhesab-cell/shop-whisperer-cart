export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "linen-shirt-cream",
    name: "Relaxed Linen Shirt",
    price: 68,
    description: "Breathable pure linen in a relaxed fit. Perfect for warm days and layered looks.",
    details: ["100% European linen", "Relaxed fit", "Mother-of-pearl buttons", "Machine washable"],
    category: "Tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop",
  },
  {
    id: "cotton-dress-olive",
    name: "Organic Cotton Midi Dress",
    price: 112,
    description: "A fluid midi silhouette in organic cotton. Effortless elegance for any occasion.",
    details: ["100% organic cotton", "Midi length", "Side pockets", "Adjustable waist tie"],
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop",
  },
  {
    id: "wool-coat-charcoal",
    name: "Structured Wool Overcoat",
    price: 245,
    description: "A timeless overcoat in Italian wool blend. Structured shoulders, clean lines.",
    details: ["70% wool, 30% cashmere", "Fully lined", "Two-button closure", "Dry clean only"],
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=750&fit=crop",
  },
  {
    id: "knit-sweater-camel",
    name: "Cashmere Blend Crewneck",
    price: 95,
    description: "Soft cashmere blend knit with a classic crewneck. A wardrobe essential.",
    details: ["50% cashmere, 50% merino wool", "Regular fit", "Ribbed cuffs and hem", "Hand wash recommended"],
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a28?w=600&h=750&fit=crop",
  },
  {
    id: "wide-trousers-sand",
    name: "Wide-Leg Linen Trousers",
    price: 78,
    description: "High-waisted wide-leg trousers in washed linen. Relaxed yet refined.",
    details: ["100% linen", "High waist", "Elastic back waistband", "Machine washable"],
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
  },
  {
    id: "silk-blouse-ivory",
    name: "Silk Satin Blouse",
    price: 135,
    description: "Luxurious silk satin with a subtle sheen. Drapes beautifully, feels incredible.",
    details: ["100% mulberry silk", "Loose fit", "Concealed button placket", "Dry clean only"],
    category: "Tops",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=750&fit=crop",
  },
];
