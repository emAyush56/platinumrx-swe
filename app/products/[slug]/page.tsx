import { searchProductById } from "@/lib/api";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await searchProductById(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `${product.title}`,
    description: product.description,

    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 640,
          height: 640,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },

    alternates: {
      canonical: `/products/${slug}`,
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await searchProductById(slug);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 sm:min-h-screen mt-12">
      <div className="relative w-full aspect-square border border-border-1">
        <Image
          src={product.image}
          alt={product.title}
          fill
          preload
          loading="eager"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-contain p-8"
        />
      </div>

      <div>
        <h1 className="text-2xl font-medium">{product.title}</h1>
        <p className="text-accent-1 text-lg font-semibold mt-2">
          ₹{product.price}
        </p>
        <p className="mt-4">{product.description}</p>

        <button className="mt-8 w-full sm:w-1/2 px-4 py-4 bg-primary text-primary-foreground">
          Buy Now
        </button>
      </div>
    </div>
  );
}
