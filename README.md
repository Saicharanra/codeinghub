# Coding Hub – Everything You Need to Learn, Build & Calculate

Coding Hub is a modern, high-performance web platform providing free online tools and technical tutorials for engineering students, software developers, and data learners.

![Coding Hub](https://codinghub.dev/og-image.png)

---

## 🚀 Key Features

### 🎓 1. Student Calculators
- **CGPA Calculator (`/tools/cgpa-calculator`)**: Supports multiple semesters, simple arithmetic mean vs. credit-weighted calculations, grade bracket visualization, and percentage conversion formulas.
- **Percentage Calculator (`/tools/percentage-calculator`)**: Exam marks percentage, percentage change / differences, and ratio evaluations with real-time progress bars.
- **Attendance Calculator (`/tools/attendance-calculator`)**: Current attendance percentage, calculation of consecutive classes required to reach 75%/80%/85% attendance criteria, and safe skip/bunk capacity forecasting.

### 💻 2. Developer Utilities
- **JSON Formatter & Validator (`/tools/json-formatter`)**: 100% client-side JSON formatting, indentation switching (2-space, 4-space, compact minification), line-accurate syntax error locator, and sample data loader.
- **Word & Character Counter (`/tools/word-counter`)**: Live count of words, characters (with and without whitespace), sentences, paragraphs, reading time, and speaking time estimates.
- **Text Case Converter (`/tools/text-case-converter`)**: Conversions between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, and CONSTANT_CASE with single-click clipboard copying.

### 📚 3. Comprehensive Educational Tutorials
- **Python Programming Masterclass (`/tutorials/python-programming`)**: Syntax, memory references, list comprehensions, context managers, and file operations.
- **SQL & Relational Databases (`/tutorials/sql`)**: Execution order, multi-table joins, GROUP BY aggregations, CTEs, and window functions (ROW_NUMBER, DENSE_RANK).
- **Power BI & Business Analytics (`/tutorials/power-bi`)**: Star schema data modeling, VertiPaq engine, and advanced DAX formulas (CALCULATE, FILTER).
- **Data Analytics Foundations (`/tutorials/data-analytics`)**: 5-stage analytics lifecycle, IQR outlier detection, descriptive statistics, and visualization ethics.
- **Modern Web Development (`/tutorials/web-development`)**: Semantic HTML5, responsive CSS, React component models, and Next.js App Router architecture.
- **JavaScript Deep Dive (`/tutorials/javascript`)**: Event loop, call stack, microtasks vs macrotasks, closures, and async/await orchestration.

### 🛡️ 4. Google AdSense & SEO Ready
- **AdSlot Component**: Fully compliant reusable component that gracefully collapses when environment variables are omitted, preventing blank boxes or Cumulative Layout Shift (CLS).
- **AdSense Policy Compliance**: Ads are strictly isolated from interactive controls, labeled with &quot;Advertisement&quot;, and `public/ads.txt` is prepared.
- **Dynamic SEO**: Metadata API, Open Graph images, Twitter cards, dynamic `sitemap.xml`, and `robots.txt` with JSON-LD structured data.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js version 18.17+ or 20+
- npm, yarn, or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/your-username/coding-hub.git
cd coding-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the template file:
```bash
cp .env.example .env.local
```

Open `.env.local` and optionally configure your Google AdSense Publisher ID:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=
NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=
```
*(Note: If left blank, the site runs cleanly with zero empty ad containers or layout shifts).*

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Production Build Validation

To test the production build locally and verify zero compilation or TypeScript errors:

```bash
npm run build
npm start
```

---

## 🚢 Deployment to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Coding Hub"
   git branch -M main
   git remote add origin https://github.com/your-username/coding-hub.git
   git push -u origin main
   ```

2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `coding-hub` GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: Your custom domain (e.g., `https://codinghub.dev` or `https://coding-hub.vercel.app`)
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: Your approved publisher ID (once verified by Google)
6. Click **Deploy**.

---

## 📄 License & Attribution

This project is licensed under the MIT License. Free for educational and commercial use.
Coding Hub – Built for students and developers worldwide.
