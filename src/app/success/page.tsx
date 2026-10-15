import Link from 'next/link';
import products from '../../data/products.json';

interface SuccessProps {
  searchParams: {
    session_id?: string;
    product_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessProps) {
  const productId = searchParams.product_id;
  const product = products.find((p) => p.id === productId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          ✓
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-sm text-slate-600 mb-6">
          Thank you for your purchase. Your digital product is ready for download below.
        </p>

        {product ? (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-slate-900">{product.title}</h3>
            <p className="text-xs text-slate-500 mt-1">Instant Access Package</p>
            
            <a
              href={product.fileUrl}
              download
              className="mt-4 block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-medium py-2.5 rounded-lg text-sm transition"
            >
              Download File Now
            </a>
          </div>
        ) : (
          <p className="text-sm text-amber-600 mb-6">
            Product details couldn't be loaded automatically, but your order was processed successfully. Check your email for files.
          </p>
        )}

        <Link
          href="/"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
        >
          ← Return to Storefront
        </Link>
      </div>
    </div>
  );
}
