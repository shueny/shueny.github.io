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
    (s) => `          <a class="social" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">${socialSvg[s.label] || ''}</svg>
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
    --line: #1c1917; --accent: #ea580c; --accent-soft: #fff1e7;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0c0a09; --card: #1c1917; --text: #f5f5f4; --muted: #a8a29e; --line: #f5f5f4; --accent: #fb923c; --accent-soft: #292017; }
  }
  html[data-theme="light"] { --bg: #fff7ed; --card: #ffffff; --text: #1c1917; --muted: #78716c; --line: #1c1917; --accent: #ea580c; --accent-soft: #fff1e7; }
  html[data-theme="dark"] { --bg: #0c0a09; --card: #1c1917; --text: #f5f5f4; --muted: #a8a29e; --line: #f5f5f4; --accent: #fb923c; --accent-soft: #292017; }
  * { box-sizing: border-box; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulseSlow { 0%,100% { opacity: .5; } 50% { opacity: .85; } }
  @keyframes ping { 75%,100% { transform: scale(2.2); opacity: 0; } }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 28px 20px; background: var(--bg); color: var(--text); position: relative; overflow-x: hidden;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .blob { position: fixed; border-radius: 50%; pointer-events: none; }
  .blob-1 { top: -15%; right: -15%; width: 60vw; height: 60vw; border: 1px solid var(--accent); opacity: .15; animation: pulseSlow 4s ease-in-out infinite; }
  .blob-2 { bottom: -10%; left: -15%; width: 45vw; height: 45vw; background: var(--accent); opacity: .08; filter: blur(60px); animation: pulseSlow 4s ease-in-out 1.5s infinite; }
  .card {
    width: 100%; max-width: 440px; background: var(--card); border: 2px solid var(--line);
    padding: 36px 32px; position: relative; z-index: 1;
    box-shadow: 10px 10px 0 0 var(--accent);
    animation: fadeInUp .8s cubic-bezier(0.16,1,0.3,1) both;
    transition: box-shadow .3s;
  }
  .card:hover { box-shadow: 14px 14px 0 0 var(--accent); }
  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }
  .pill { display: flex; align-items: center; gap: 8px; }
  .pill .dot { position: relative; width: 10px; height: 10px; }
  .pill .dot::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--accent); animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite; }
  .pill .dot::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--accent); }
  .pill b { font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); }
  .theme-btn {
    width: 38px; height: 38px; border: 2px solid var(--line); background: transparent; color: var(--text);
    cursor: pointer; display: grid; place-items: center; transition: background .2s, color .2s, transform .2s;
  }
  .theme-btn:hover { background: var(--accent); color: #fff; transform: rotate(8deg); }
  h1 { margin: 0; font-size: clamp(52px, 17vw, 68px); line-height: .9; letter-spacing: -.04em; font-weight: 800; text-transform: uppercase; }
  h1 .grad { background: linear-gradient(90deg, var(--accent), #f59e0b); -webkit-background-clip: text; background-clip: text; color: transparent; display: block; }
  .role { margin: 16px 0 0; font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 22px; }
  .role em { font-style: normal; color: var(--accent); }
  .meta { margin: 8px 0 0; font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
  .tagline { margin: 20px 0 0; padding-left: 14px; border-left: 2px solid var(--accent); font-size: 14px; line-height: 1.55; color: var(--muted); }
  .index { margin-top: 30px; border-top: 2px solid var(--line); }
  .row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 16px 4px; border-bottom: 2px solid var(--line); text-decoration: none; color: var(--text);
    font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
    transition: padding .3s, background .2s, color .2s;
  }
  .row:hover { padding-left: 14px; padding-right: 14px; }
  .row .num { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 400; font-size: 12px; color: var(--muted); margin-right: 12px; }
  .row .val { font-weight: 500; font-size: 10px; letter-spacing: 0; text-transform: none; color: var(--muted); margin-left: 10px; }
  .row svg { flex-shrink: 0; transition: transform .3s; }
  .row:hover svg { transform: translate(2px, -2px); }
  .row.primary { background: var(--accent); color: #fff; }
  .row.primary .num { color: rgba(255,255,255,.75); }
  .row.primary:hover svg { transform: translateY(2px); }
  .row:not(.primary):hover { background: var(--accent-soft); color: var(--accent); }
  .bottom { margin-top: 30px; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
  .label { font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
  .socials { display: flex; gap: 10px; }
  .social {
    width: 40px; height: 40px; border: 2px solid var(--line); color: var(--text);
    display: grid; place-items: center; transition: transform .2s, background .2s, color .2s, box-shadow .2s;
  }
  .social:hover { background: var(--accent); color: #fff; transform: translateY(-4px); box-shadow: 3px 3px 0 0 var(--line); }
  .qr { text-align: right; }
  .qr-box { display: inline-block; padding: 8px; background: #fff; border: 2px solid var(--line); transition: transform .3s; }
  .qr-box:hover { transform: rotate(2deg) scale(1.05); }
  .qr svg { width: 92px; height: 92px; display: block; }
  .qr p { margin: 8px 0 0; font-size: 9px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); }
  .icon { width: 16px; height: 16px; }
  @media (max-width: 380px) { .row .val { display: none; } }
</style>
</head>
<body>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <main class="card">
    <div class="topbar">
      <div class="pill"><span class="dot"></span><b>Open to collaborate</b></div>
      <button class="theme-btn" id="themeBtn" aria-label="Toggle theme" title="Toggle theme">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
    </div>

    <h1>${firstName}<span class="grad">${lastName}</span></h1>
    <p class="role">${card.title.toLowerCase()} <em>*</em></p>
    <p class="meta">${card.company} — ${card.location}</p>
    <p class="tagline">${card.tagline}</p>

    <div class="index">
      <a class="row primary" href="${vcardDataUri}" download="${firstName.toLowerCase()}-wang.vcf">
        <span><span class="num">01</span>Save contact</span>
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
      </a>
      <a class="row" href="mailto:${card.email}">
        <span><span class="num">02</span>Email<span class="val">${card.email}</span></span>
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </a>
      <a class="row" href="tel:${card.phone}">
        <span><span class="num">03</span>Call<span class="val">${card.phone}</span></span>
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </a>
    </div>

    <div class="bottom">
      <div>
        <p class="label">Elsewhere</p>
        <div class="socials">
${socialLinks}
        </div>
      </div>
      <div class="qr">
        <div class="qr-box">${qrLight.replace('<svg', '<svg width="92" height="92"')}</div>
        <p>Scan me</p>
      </div>
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
