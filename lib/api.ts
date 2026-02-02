export const runtime = "nodejs"; // for vercel

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const BASE_URL = "https://fakestoreapi.com";

export async function searchProducts(limit?: string): Promise<Product[]> {
  const url = new URL("https://fakestoreapi.com/products");

  if (limit) url.searchParams.set("limit", limit);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // ISR for SEO + performance
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function searchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: {
      revalidate: 3600, // ISR for SEO + performance
    },
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}
