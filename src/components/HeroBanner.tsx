export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-navy">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.35),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-28 text-center sm:py-36">
        <span className="mb-6 rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-300">
          Instant Digital Delivery
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Your Unfair Productivity Advantage
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
          Premium Notion templates &amp; workflow systems used by 10,000+ remote professionals
        </p>
        <a
          href="#products"
          className="mt-10 inline-flex items-center rounded-lg bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-navy"
        >
          Browse Products ↓
        </a>
      </div>
    </section>
  );
}
