import products from '../data/products.json';

export default function Storefront() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white py-6 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Digital Vault</h1>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
          Instant Digital Delivery
        </span>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            High-Value Tools for Digital Creators
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Actionable Notion systems, business blueprints, and guides curated and continuously updated by our autonomous AI pipelines.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {product.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900">
                  ${(product.price / 100).toFixed(2)}
                </span>
                <form action="/api/checkout" method="POST">
                  <input type="hidden" name="productId" value={product.id} />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
                  >
                    Buy Now
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
