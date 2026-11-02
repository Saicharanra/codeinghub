# Google Search Console Setup & Maintenance Guide

This document outlines the step-by-step procedures for indexing, verifying, and monitoring **Coding Hub** on Google Search Console.

---

## 1. Creating a Search Console Property

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your primary Google account.
3. In the property dropdown (top left), click **+ Add property**.
4. Select between two property types:
   * **Domain Property (Recommended if DNS access is available):** Enter `codinghub.dev`. Covers all subdomains (`www`, `tools`, etc.) and both `http`/`https` protocols. Requires a DNS TXT record.
   * **URL prefix Property:** Enter `https://codinghub.dev`. Useful if you only have web-level access or prefer meta-tag/HTML file verification.

---

## 2. Verifying Website Ownership

Coding Hub natively supports multiple standard Google verification mechanisms:

### Method A: HTML Meta Tag (Recommended for URL prefix)
1. In Search Console, select **HTML tag** under "Other verification methods".
2. Copy the content token inside the meta tag:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN" />
   ```
3. In your environment configuration (or Vercel Project Settings > Environment Variables):
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YOUR_VERIFICATION_TOKEN
   ```
4. Deploy the site, return to Search Console, and click **Verify**.

### Method B: HTML Verification File
1. In Search Console, download the provided verification file (e.g., `google1234567890abcdef.html`).
2. Place this file inside the `public/` directory of Coding Hub:
   `public/google1234567890abcdef.html`
3. Commit and deploy. The file will be publicly served at `https://codinghub.dev/google1234567890abcdef.html`.
4. Click **Verify** in Search Console.

### Method C: DNS TXT Record (For Domain Properties)
1. Copy the TXT record provided by Google.
2. Sign in to your domain registrar (Namecheap, Cloudflare, Google Domains, GoDaddy).
3. Add a TXT record with Host `@` and Value `google-site-verification=...`.
4. Wait for DNS propagation (typically 2–15 minutes) and click **Verify**.

---

## 3. Submitting the XML Sitemap

Coding Hub automatically generates a standards-compliant XML sitemap dynamically at `/sitemap.xml`.

1. In Search Console, navigate to **Indexing > Sitemaps** in the left sidebar.
2. Under "Add a new sitemap", enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. Status will change to **Success**. Search Console will report the total count of discovered URLs (currently 31 canonical URLs: 7 static core pages, 6 tools, 6 category hubs, and 12 in-depth tutorials).

---

## 4. Inspecting URLs & Requesting Indexing

To test how Googlebot renders individual pages:

1. Use the **URL Inspection** bar at the very top of Search Console.
2. Enter any production URL (e.g. `https://codinghub.dev/tools/cgpa-calculator` or `https://codinghub.dev/tutorials/python/what-is-python`).
3. Click **Test Live URL** to verify:
   * **Page availability:** HTTP 200 OK.
   * **Mobile friendliness:** Responsive viewport detected.
   * **Structured data:** `WebApplication`, `Article`, `FAQPage`, or `WebSite` schema parsed without errors.
   * **Canonical link:** Correct self-referencing canonical URL reported.
4. Click **Request Indexing** to prioritize initial crawling.

---

## 5. Monitoring Indexing & Coverage

1. Check **Indexing > Pages**:
   * **Indexed:** Confirmed pages in Google's search index.
   * **Not indexed:** Pages discovered but not yet indexed, or intentionally excluded (e.g. redirects, 404s).
2. Review **Page Experience** and **Core Web Vitals**:
   * Coding Hub is engineered with lightweight system fonts, minimal bundle sizes, and reserved ad dimensions to ensure all URLs attain **Good** status across LCP, INP, and CLS.

---

## 6. Identifying & Resolving Indexing Errors

Common Search Console notices and how Coding Hub addresses them:

| Notice | Reason | Coding Hub Resolution |
|---|---|---|
| *Discovered – currently not indexed* | Google knows the URL exists, but has not yet crawled it due to crawl budget. | Normal for brand new domains. Ensure high internal linking and submit sitemap. |
| *Crawled – currently not indexed* | Google crawled the page but decided not to index it yet. | Our 12 starter tutorials each have over 100 lines of original content, code blocks, and FAQs to prevent thin content flags. |
| *Page with redirect* | Google encountered an old route (e.g. `/tutorials/python-programming`). | Expected. Permanent HTTP 308 redirects in `next.config.mjs` cleanly forward bots to `/tutorials/python`. |
| *Duplicate without user-selected canonical* | Google detected duplicate content across URLs. | All Coding Hub pages output strict `canonical` tags matching their canonical URL. |
| *Not found (404)* | An invalid URL was requested. | Custom `not-found.tsx` outputs an HTTP 404 header and guides users back to the tool/tutorial directory. |
