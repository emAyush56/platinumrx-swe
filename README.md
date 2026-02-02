# PlatinumRx Assignment 2026

[Live - https://platinumrx-asg.vercel.app/](https://platinumrx-asg.vercel.app/?limit=5)

Project Setup:

- Clone the repository
- `pnpm i`
- `pnpm run dev`

### 3.3

Using nextjs's SSR will be generates and send a full HTML first which can be used by search engine crawlers to index the page. And improves FCP.
If we were to use SSG (or on-demand ISR), it would mean simply serving static files on build or on demand; mostly via some CDN like bunny or cloudflare. SSG would be the best for SEO and would make the website lightning fast.

### 3.4

Hero section assets, banners, large web fonts, render blocking css/js are what affects LCP of a page.
Font swapping bw the native system font and the website's font, unserved space for images affect CLS of a page.

### 3.6

I have implemented a plp-sort component to share and the application state up to the URL by changing the limit - (the api that I am using didn't have a pagination) Similar approach can be taken for pagination by lifiting the state up or searching/sorting.

### 4.1

Implementation of the following makes this page SEO friendly:

- SSR and ISR with a revalidate of of 3600 (choice of ISR can be context specific)
- Global metadata (title/description/OG/Twitter/robots) and Per-page metadata
- robots.txt + sitemap endpoints
- Semantic HTML + heading structure
- Descriptive image alt text

### 4.2

If the catalog had 100,0000 products, i would

- Switch from limit-only to real pagination (page/cursor), add canonical to the base category/PLP, and use rel="next/prev" (or metadata equivalents) and/or self-canonicals per page to avoid duplicates.
- SSG top products/categories, SSR the long tail; consider on-demand revalidation.
- Block low-value filter combinations with noindex,follow or canonicalize to the unfiltered page.
- Fetch only fields needed for PLP, cache aggressively, add CDN, and move to cursor-based pagination for stable performance.
- Use virtualization for long lists, avoid rendering huge DOMs, and ensure image loading is lazy with correct sizing.

### 4.3

- Client-side rendering without SSR fallback
- Missing alt text on images
- Blocking resources in robots.txt
- Slow LCP due to unoptimized images
- Ignoring mobile responsiveness

### 4.4

- SPA (client-only): initial HTML is usually minimal; SEO depends on Google successfully executing JS and waiting for hydration. This can be slower/less reliable for discovery, indexing, and rich previews (OG tags may not be seen by many crawlers).

- SSR/SSG: the server returns fully rendered HTML + correct metadata per URL immediately, improving crawlability, time-to-content, and consistency across crawlers. SSG is fastest for stable pages; SSR handles dynamic pages; both still benefit from good internal linking and metadata.

### 4.5

- Google Search Console metrics - indexing coverage, sitemap status, Core Web Vitals report, queries/CTR/impressions, crawl stats.
- bot hits, response codes, crawl frequency, slow endpoints.
- Periodic crawls (e.g., Screaming Frog) to detect duplicate titles, canonicals, broken links, noindex issues.
