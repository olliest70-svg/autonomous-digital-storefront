# 🚀 Autonomous Digital Storefront

An AI-driven e-commerce storefront that sells **downloadable digital productivity products**: Notion systems, AI prompt libraries, and workflow blueprints for freelancers, creators, and remote teams. A team of Abacus.AI agents runs the platform. They research trending niches, write the product catalog, and push updates directly to this repository.

The current catalog has **8 products** chosen from 2026's highest-margin, lowest-saturation niches: freelancer business OS, AI prompt libraries, async remote-team workflows, creator content OS, ADHD/neurodivergent planning, solopreneur finance, client onboarding, and Personal Knowledge Management.

---

## 🛠️ Tech Stack

- **Next.js** (App Router, TypeScript), using `next.config.ts`
- **React**
- **Tailwind CSS** with no external UI library
- **Inter** font via `next/font`
- A JSON product catalog (`src/data/products.json`)

**Design:** deep navy (`#0F172A`) background, electric indigo (`#6366F1`) accents, white text, giving a premium dark SaaS look.

---

## ⚡ Local Development

Requirements: Node.js 18.18+ (Node 20+ recommended).

```bash
npm install && npm run dev
```

Then open <http://localhost:3000>.

| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Production build + type checking |
| `npm run start` | Serve the production build       |

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout: metadata, Inter font, global styles
│   │   ├── page.tsx              # Homepage: hero + product grid
│   │   ├── globals.css           # Tailwind base styles
│   │   ├── success/page.tsx      # Order confirmation / download page
│   │   └── api/checkout/route.ts # POST /api/checkout (mock order confirmation)
│   ├── components/
│   │   ├── HeroBanner.tsx        # Full-width hero with tagline + CTA
│   │   ├── ProductGrid.tsx       # Responsive 1 / 2 / 3-column grid
│   │   └── ProductCard.tsx       # Badge, title, price, clamped description, Buy Now
│   └── data/
│       └── products.json         # Product catalog
├── public/downloads/             # Downloadable product files (placeholder)
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## 🧾 Product Catalog Schema

`src/data/products.json` is a JSON **array** of product objects:

| Field         | Type     | Required | Description                                                                                 |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------- |
| `id`          | `string` | ✅       | Unique, stable identifier (convention: `prod_<snake_case_name>`). The checkout API uses it. |
| `title`       | `string` | ✅       | Product name shown on the card.                                                             |
| `price`       | `number` | ✅       | Price in the **smallest currency unit** (cents). `4700` is shown as `$47.00`.               |
| `currency`    | `string` | ✅       | ISO 4217 currency code in lowercase (e.g. `"usd"`).                                         |
| `description` | `string` | ✅       | Marketing copy. The card clamps it to 3 lines.                                              |
| `fileUrl`     | `string` | ✅       | Path to the downloadable file, relative to `public/` (e.g. `/downloads/my-product.zip`).    |
| `badge`       | `string` | ❌       | Optional label pill: `"Best Seller"` (amber), `"Trending"` (violet), `"New"` (emerald).     |

Example:

```json
{
  "id": "prod_freelancer_business_os",
  "title": "Freelancer Business OS — Complete Notion HQ",
  "price": 4700,
  "currency": "usd",
  "description": "A battle-tested Notion command centre...",
  "fileUrl": "/downloads/freelancer-business-os.zip",
  "badge": "Best Seller"
}
```

---

## ➕ Adding a New Product

1. Put the deliverable file in `public/downloads/` (e.g. `public/downloads/my-new-product.zip`).
2. Append a new object to the array in `src/data/products.json`. Give it a **unique** `id`, set `price` in cents, and point `fileUrl` to `/downloads/my-new-product.zip`.
3. Optionally set `badge` to `"Best Seller"`, `"Trending"`, or `"New"`.
4. Run `npm run build` to check that the JSON and types are valid, then commit and push.

The homepage grid and the checkout API both read from `products.json`, so you don't need to change any code.

---

## 🔌 API: `POST /api/checkout`

Request body:

```json
{ "productId": "prod_pkm_knowledge_base", "email": "buyer@example.com" }
```

`email` is optional.

| Status | Response                                                                                                         |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| `200`  | `{ "success": true, "orderId": "ord_<timestamp>", "downloadUrl": "/downloads/...", "message": "Your download is ready." }` |
| `404`  | `{ "error": "Product not found" }`                                                                               |
| `400`  | `{ "error": "..." }`: invalid JSON, missing `productId`, or a non-string `email`                                  |

> This is a **mock** checkout. No payment is taken. Connecting a payment provider such as Stripe is a planned next step.

---

## 🤖 What Makes It "Autonomous"?

1. **Product research & creation:** agents scan market trends and generate new digital inventory.
2. **Catalog & front-end updates:** a developer agent updates `products.json` and pushes to this repo.
3. **Marketing:** agents write SEO-optimized product copy and promotional content.
4. **Fulfillment:** post-purchase flows deliver download links instantly.
