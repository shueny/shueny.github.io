/**
 * Generates the digital business card's static assets from a single source
 * of truth (src/config/card.data.json):
 *
 *   - public/shueny.vcf   downloadable vCard (3.0) for "save to contacts"
 *   - public/card-qr.svg  QR code pointing at the card URL
 *   - public/card.html    fully self-contained, offline-portable card
 *
 * Run with: pnpm run card:gen
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import QRCode from 'qrcode';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const card = JSON.parse(
  readFileSync(resolve(root, 'src/config/card.data.json'), 'utf8'),
);

const [firstName, ...rest] = card.name.split(' ');
const lastName = rest.join(' ');
const [city, country] = card.location.split(',').map((s) => s.trim());

/* ------------------------------------------------------------------ vCard */
const vcard = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${lastName};${firstName};;;`,
  `FN:${card.name}`,
  card.company ? `ORG:${card.company}` : null,
  card.title ? `TITLE:${card.title}` : null,
  `EMAIL;TYPE=INTERNET,PREF:${card.email}`,
  `TEL;TYPE=CELL:${card.phone}`,
  `ADR;TYPE=WORK:;;;${city || ''};;;${country || ''}`,
  `URL:${card.website}`,
  ...card.social.map((s) => `URL;TYPE=${s.label}:${s.href}`),
  card.tagline ? `NOTE:${card.tagline}` : null,
  `REV:${new Date().toISOString()}`,
  'END:VCARD',
  '',
]
  .filter(Boolean)
  .join('\r\n');

writeFileSync(resolve(root, 'public/shueny.vcf'), vcard, 'utf8');

/* ----------------------------------------------------------------- QR code */
const qrLight = await QRCode.toString(card.url, {
  type: 'svg',
  margin: 1,
  color: { dark: '#1c1917', light: '#00000000' },
});
writeFileSync(resolve(root, 'public/card-qr.svg'), qrLight, 'utf8');

/* ---------------------------------------------------- standalone card.html */
const vcardDataUri = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;

const socialSvg = {
  GitHub:
    '<path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>',
  LinkedIn:
    '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V10.4H5.67v7.94h2.67ZM7 9.24a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.1v-4.36c0-2.33-1.25-3.42-2.92-3.42-1.35 0-1.95.74-2.29 1.26V10.4h-2.67c.04.75 0 7.94 0 7.94h2.67v-4.43c0-.24.02-.48.09-.65.19-.48.62-.97 1.35-.97.96 0 1.34.72 1.34 1.78v4.27h2.43Z"/>',
  Instagram:
    '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.41a1.16 1.16 0 1 1-2.33 0 1.16 1.16 0 0 1 2.33 0Z"/>',
};

const socialLinks = card.social
  .map(
    (s) => `        <a class="social" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">${socialSvg[s.label] || ''}</svg>
        </a>`,
  )
  .join('\n');

const initials = card.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
<title>${card.name} — Digital Card</title>
<meta name="description" content="${card.title} · ${card.tagline}" />
<meta property="og:title" content="${card.name} — ${card.title}" />
<meta property="og:description" content="${card.tagline}" />
<meta property="og:type" content="profile" />
<meta property="og:url" content="${card.url}" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%23ea580c'/%3E%3Ctext x='50' y='68' font-size='52' font-family='Arial' font-weight='bold' fill='white' text-anchor='middle'%3E${initials}%3C/text%3E%3C/svg%3E" />
<style>
  :root {
    --bg: #fff7ed; --card: #ffffff; --text: #1c1917; --muted: #78716c;
    --border: #e7e5e4; --accent: #ea580c; --accent-soft: #fff1e7;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0c0a09; --card: #1c1917; --text: #f5f5f4; --muted: #a8a29e; --border: #292524; --accent: #fb923c; --accent-soft: #292017; }
  }
  html[data-theme="light"] { --bg: #fff7ed; --card: #ffffff; --text: #1c1917; --muted: #78716c; --border: #e7e5e4; --accent: #ea580c; --accent-soft: #fff1e7; }
  html[data-theme="dark"] { --bg: #0c0a09; --card: #1c1917; --text: #f5f5f4; --muted: #a8a29e; --border: #292524; --accent: #fb923c; --accent-soft: #292017; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px; background: var(--bg); color: var(--text);
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    width: 100%; max-width: 400px; background: var(--card); border: 1px solid var(--border);
    border-radius: 24px; padding: 32px 28px; box-shadow: 0 20px 50px -20px rgba(0,0,0,.25); position: relative;
  }
  .theme-btn {
    position: absolute; top: 18px; right: 18px; width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid var(--border); background: transparent; color: var(--text); cursor: pointer;
    display: grid; place-items: center; transition: border-color .2s;
  }
  .theme-btn:hover { border-color: var(--accent); }
  .avatar {
    width: 92px; height: 92px; border-radius: 50%; margin: 4px auto 16px; display: grid; place-items: center;
    font-size: 34px; font-weight: 700; color: #fff;
    background: linear-gradient(135deg, var(--accent), #f59e0b);
  }
  h1 { font-size: 24px; margin: 0; text-align: center; }
  .title { text-align: center; color: var(--accent); font-weight: 600; margin: 4px 0 2px; font-size: 14px; }
  .meta { text-align: center; color: var(--muted); font-size: 13px; margin: 0; }
  .tagline { text-align: center; color: var(--muted); font-size: 14px; margin: 14px 4px 22px; line-height: 1.5; }
  .actions { display: grid; gap: 10px; margin-bottom: 18px; }
  .btn {
    display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;
    padding: 12px 16px; border-radius: 14px; font-weight: 600; font-size: 14px; border: 1px solid var(--border);
    color: var(--text); background: transparent; transition: transform .08s, border-color .2s, background .2s;
  }
  .btn:active { transform: scale(.98); }
  .btn.primary { background: var(--accent); color: #fff; border-color: var(--accent); }
  .btn:not(.primary):hover { border-color: var(--accent); background: var(--accent-soft); }
  .socials { display: flex; justify-content: center; gap: 14px; margin: 6px 0 20px; }
  .social {
    width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--border); color: var(--text);
    display: grid; place-items: center; transition: border-color .2s, color .2s, transform .08s;
  }
  .social:hover { border-color: var(--accent); color: var(--accent); }
  .social:active { transform: scale(.94); }
  .qr { text-align: center; padding-top: 18px; border-top: 1px dashed var(--border); }
  .qr svg { width: 132px; height: 132px; }
  .qr p { color: var(--muted); font-size: 12px; margin: 8px 0 0; }
  .icon { width: 18px; height: 18px; }
</style>
</head>
<body>
  <main class="card">
    <button class="theme-btn" id="themeBtn" aria-label="Toggle theme" title="Toggle theme">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>

    <div class="avatar">${initials}</div>
    <h1>${card.name}</h1>
    <p class="title">${card.title}</p>
    <p class="meta">${card.company} · ${card.location}</p>
    <p class="tagline">${card.tagline}</p>

    <div class="actions">
      <a class="btn primary" href="${vcardDataUri}" download="${firstName.toLowerCase()}-wang.vcf">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
        Save to contacts
      </a>
      <a class="btn" href="mailto:${card.email}">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
        ${card.email}
      </a>
      <a class="btn" href="tel:${card.phone}">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
        ${card.phone}
      </a>
    </div>

    <div class="socials">
${socialLinks}
    </div>

    <div class="qr">
      ${qrLight.replace('<svg', '<svg width="132" height="132"')}
      <p>Scan to open this card</p>
    </div>
  </main>

  <script>
    (function () {
      var btn = document.getElementById('themeBtn');
      var saved = localStorage.getItem('card-theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
      btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme');
        if (!cur) cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('card-theme', next);
      });
    })();
  </script>
</body>
</html>
`;

writeFileSync(resolve(root, 'public/card.html'), html, 'utf8');

console.log('✓ Generated public/shueny.vcf');
console.log('✓ Generated public/card-qr.svg');
console.log('✓ Generated public/card.html');
