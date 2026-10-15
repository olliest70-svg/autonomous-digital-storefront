import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import ReviewsSection from "@/components/ReviewsSection";
import products from "@/data/products.json";
import type { Product } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy">
      <HeroBanner />
      <section id="products" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
          <p className="mt-3 text-slate-400">Instant download. Lifetime access. Built for remote professionals.</p>
        </div>
        <ProductGrid products={products as Product[]} />
      </section>
      <ReviewsSection />
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Autonomous Digital Storefront. All rights reserved.
      </footer>
    </main>
  );
}
