import { Product } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section
      aria-label="Product list"
      className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <article
          key={product.id}
          className="group border rounded-xl p-4 hover:shadow-md transition"
        >
          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square w-full mb-4 bg-white">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 25vw,
                   (min-width: 640px) 33vw,
                   50vw"
                className="object-contain"
                priority={product.id <= 4}
              />
            </div>

            <h2 className="font-medium line-clamp-2">{product.title}</h2>

            <p className="text-sm text-gray-500 mt-1">${product.price}</p>
          </Link>
        </article>
      ))}
    </section>
  );
}
