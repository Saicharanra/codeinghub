# Coding Hub – Everything You Need to Learn, Build & Calculate

**Coding Hub** is an all-in-one, privacy-focused online platform designed for university students, software engineers, and data analytics learners. Built with Next.js App Router, TypeScript, and Tailwind CSS.

---

## 🚀 Platform Architecture & Features

### 🎓 1. Student Calculators
* **CGPA Calculator (`/tools/cgpa-calculator`):** Unweighted multi-semester averages for both 10.0 and 4.0 grading scales, with degree classifications and percentage conversion equivalents.
* **Percentage Calculator (`/tools/percentage-calculator`):** Three calculation modes: Exam marks percentage (with visual score meter), percentage of a number, and percentage change.
* **Attendance Calculator (`/tools/attendance-calculator`):** Real-time attendance rate calculation, consecutive classes required to reach 75% or 80%, and safe skip/bunk capacity forecasting.

### 💻 2. Developer Utilities
* **JSON Formatter & Validator (`/tools/json-formatter`):** Client-side formatting with 2-space or 4-space indentation, minification, precise syntax error line/column pointers, and file download.
* **Word & Character Counter (`/tools/word-counter`):** Real-time word, character (with and without spaces), sentence, and paragraph counting, with reading and speaking duration estimations.
* **Text Case Converter (`/tools/text-case-converter`):** Transform strings among UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.

### 📚 3. Educational Content Academy
Structured learning tracks across 6 technical domains with 12 in-depth starter tutorials:
* **Python Programming (`/tutorials/python`):** Foundations, dynamic typing & variables, parameter scopes & functions.
* **SQL and Databases (`/tutorials/sql`):** RDBMS fundamentals, SELECT/WHERE/ORDER BY filtering, and visual multi-table joins.
* **Power BI (`/tutorials/power-bi`):** Architecture overview and Power Query ETL data transformation.
* **Data Analytics (`/tutorials/data-analytics`):** Complete analytics lifecycle and practical spreadsheet data cleaning techniques.
* **Web Development (`/tutorials/web-development`):** Semantic HTML5, CSS Box Model, and responsive grid layouts.
* **Java Programming (`/tutorials/java`):** JVM execution model, strong typing, and core OOP pillars.

*Every tutorial includes learning objectives, interactive Table of Contents, syntax-annotated code blocks, pro tips, common mistakes to avoid, key takeaways, and FAQPage Schema.org structured data.*

---

## 🛡️ Technical SEO, Analytics & Monetization Readiness

### 1. Search Engine Optimization (SEO)
* **Metadata API:** Unique titles, meta descriptions, OpenGraph, and Twitter Cards across all 31 canonical URLs.
* **Dynamic XML Sitemap:** Automatically generated at `/sitemap.xml` using the configured production domain.
* **Robots.txt:** Generated at `/robots.txt` declaring crawler directives and sitemap location.
* **Structured Data:** JSON-LD schemas embedded for `WebSite`, `WebApplication`, `CollectionPage`, `Article`, and `FAQPage`.
* **Google Search Console:** Built-in ownership verification support via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` meta tag or HTML verification file. See [`docs/SEARCH_CONSOLE_SETUP.md`](docs/SEARCH_CONSOLE_SETUP.md).

### 2. Privacy-Conscious Google Analytics 4
* Configured via `NEXT_PUBLIC_GA_ID`.
* **Consent Gated:** GA4 scripts only initialize after the visitor grants consent on the Cookie Consent banner.
* **Zero PII or Input Tracking:** Anonymized IP addresses. Never tracks user calculation values, grades, code, or personal text inputs.
* **Next.js Client Navigation:** Accurately measures route changes without duplicate pageview events.

### 3. Google AdSense Integration
* Centralized, reusable `AdSlot` and `AdSenseScript` components supporting `NEXT_PUBLIC_ADSENSE_CLIENT`.
* **Zero Blank Boxes:** Automatically collapses completely when unconfigured.
* **CLS Prevention:** Reserves responsive layout dimensions (`min-h-[90px]`, `min-h-[250px]`) to eliminate layout shifts.
* **Policy Compliance:** Clear "Advertisement" labels; never placed over buttons or interactive inputs.
* **Authorized Digital Sellers:** Prepared `public/ads.txt` served at `/ads.txt`. See [`docs/ADSENSE_READINESS_AUDIT.md`](docs/ADSENSE_READINESS_AUDIT.md).

### 4. Core Web Vitals & Performance
* **System UI Font Stack:** Eliminates external font requests, FOIT/FOUT, and Cumulative Layout Shift.
* **Client-Side Privacy:** Calculators execute locally in the browser with zero server round-trips.
* **Security Headers:** Enforces `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## 🛠️ Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for sitemap and metadata | `http://localhost:3000` (Dev) / `https://codinghub.dev` (Prod) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console meta tag token | *(Optional)* `abc123xyz...` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | *(Optional)* `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense Publisher Account ID | *(Optional)* `ca-pub-XXXXXXXXXXXXXXXX` |
| `NEXT_PUBLIC_ADSENSE_SLOT_HEADER` | AdSense Slot ID for header banner | *(Optional)* `1234567890` |
| `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT` | AdSense Slot ID for content units | *(Optional)* `1234567890` |
| `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` | AdSense Slot ID for footer banner | *(Optional)* `1234567890` |

*Note: The website works with all optional variables left blank.*

---

## 💻 Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Run standalone calculator logic unit tests
node scripts/test-calculators.mjs

# 3. Run ESLint validation
npm run lint

# 4. Start local development server
npm run dev

# 5. Build and prerender static production output
npm run build
```

---

## 🚢 Deployment

Coding Hub is ready for one-click deployment on **Vercel**:

1. Push your repository to GitHub.
2. In Vercel, click **Add New Project** and select your repository.
3. Configure your production environment variables (`NEXT_PUBLIC_SITE_URL=https://yourdomain.com`).
4. Click **Deploy**. All 36 static pages and sitemaps will prerender automatically.
