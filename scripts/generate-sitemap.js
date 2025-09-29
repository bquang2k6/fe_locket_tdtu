const fs = require('fs');
const path = require('path');

// Basic sitemap generator. Edit `pages` to include any static routes your app uses.
const pages = ['/', '/login', '/home'];
const baseUrl = process.env.SITE_URL || 'https://locket-tdtu.wangtech.top';

const urls = pages.map((p) => ({
  loc: `${baseUrl.replace(/\/$/, '')}${p}`,
  changefreq: 'daily',
  priority: p === '/' ? 1.0 : 0.8,
}));

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}\n</urlset>`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Wrote sitemap to', outPath);
