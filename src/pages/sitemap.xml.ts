import type { APIRoute } from "astro";

const pages = [
  { path: "/",                  priority: 1.0, changefreq: "weekly" },
  { path: "/parcours",          priority: 0.8, changefreq: "monthly" },
  { path: "/le-code",           priority: 0.7, changefreq: "yearly" },
  { path: "/combats",           priority: 0.9, changefreq: "weekly" },
  { path: "/videos",            priority: 0.8, changefreq: "weekly" },
  { path: "/galerie",           priority: 0.7, changefreq: "monthly" },
  { path: "/media-kit",         priority: 0.8, changefreq: "monthly" },
  { path: "/sponsors",          priority: 0.9, changefreq: "monthly" },
  { path: "/contact",           priority: 0.7, changefreq: "monthly" },
  { path: "/mentions-legales",  priority: 0.2, changefreq: "yearly" },
  { path: "/confidentialite",   priority: 0.2, changefreq: "yearly" },
];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://pauldena.fr")).toString().replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${base}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
