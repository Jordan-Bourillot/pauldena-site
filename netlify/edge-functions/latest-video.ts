// Edge Function : proxy live du flux YouTube RSS de Paul Dena.
// Permet au composant LatestVideo de se rafraîchir côté client sans rebuild.
// URL publique : https://pauldena-preview.netlify.app/api/latest-video

const CHANNEL_ID = "UCJMvCyy_DqvyedtQOJm4tvQ";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

export default async () => {
  try {
    const res = await fetch(RSS_URL, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "rss_unavailable", status: res.status }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1, 6);
    const items = entries.map((e) => {
      const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
      const title = decode(e.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
      const published = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      return { id, title, published, url: `https://www.youtube.com/watch?v=${id}`, thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` };
    }).filter((v) => v.id);
    return new Response(JSON.stringify({ items, fetched_at: new Date().toISOString() }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=600, s-maxage=600",
        "access-control-allow-origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "fetch_failed", message: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = { path: "/api/latest-video" };
