import PLPSort from "@/components/plp-sort";
import { searchProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const runtime = "nodejs"; // for vercel

export default async function PLPPage(props: {
  searchParams?: Promise<{
    limit?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const limit = searchParams?.limit?.trim();

  // Canonicalize: ensure default limit is present in URL (so UI + server agree).
  if (!limit) redirect("/?limit=5");

  const products = await searchProducts(limit);

  return (
    <section className="mt-8 min-h-[75dvh]" aria-labelledby="plp-title">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1
            id="plp-title"
            className="text-xl sm:text-3xl font-medium cursor-default text-secondary"
          >
            All products
          </h1>
          <p className="text-sm text-secondary mt-1">
            Browse our catalog. Use the limit setting to control how many items
            are loaded.
          </p>
        </div>
        <PLPSort limit={limit} />
      </header>

      <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-5" role="list">
        {products.map((product, index) => (
          <li key={product.id}>
            <article className="group bg-white overflow-clip cursor-pointer">
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full aspect-square border border-border-1 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain group-hover:scale-105 transition-all p-5 sm:p-8"
                    priority={index <= 6}
                    quality={60}
                  />
                </div>

                <div className="flex flex-col mt-3 gap-1">
                  <h2 className="text-stone-800 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-accent-1 text-sm font-medium">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "All products",
    description:
      "Browse our catalog of vitamins and supplements. Discover premium health products and wellness essentials.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "All products",
      description:
        "Browse our catalog of vitamins and supplements. Discover premium health products and wellness essentials.",
      url: "/",
    },
  };
}
