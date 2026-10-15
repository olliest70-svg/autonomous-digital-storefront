interface StarsProps {
  rating: number; // 0–5, rounded to nearest whole star
  size?: string; // Tailwind text-size class
}

export default function Stars({ rating, size = "text-base" }: StarsProps) {
  const filled = Math.round(rating);
  return (
    <span className={`inline-flex tracking-tight ${size}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden="true" className={i <= filled ? "text-brand" : "text-slate-600"}>
          ★
        </span>
      ))}
    </span>
  );
}
