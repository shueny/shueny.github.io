---
title: 'Frontend Security Notes: 14 Common Attacks and Fixes, Explained with Animations'
description: 'From XSS and CSRF to token storage and CSP, the 14 most common frontend security issues broken down into "how the attacker thinks → root cause → the right fix", each with an interactive step-by-step animation.'
pubDate: 2026-10-06
cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
category: 'Engineering & Insights'
lang: 'en'
draft: false
---

# Frontend Security Notes: 14 Common Attacks and Fixes, Explained with Animations

Frontend engineers often think of security as "the backend's job". In practice, most attacks end up happening **inside the browser**: a malicious script runs in the user's tab, the browser sends cookies along on its own, or an API key gets bundled and shipped to every visitor.

These are my study notes on frontend security. I turned the 14 most common issues into interactive animations, and each one follows the same structure:

1. **Five steps**: walk through how the attack happens, with a "hacker's view" note at each step explaining what the attacker is thinking.
2. **Root cause**: why this is possible in the first place.
3. **The right fix**: code you can actually use.

Here is the index of all 14 animations. Click any card to play it. (The animations themselves are in Traditional Chinese; this post covers the same content in English.)

<iframe
  src="/security/index.html"
  title="Frontend security animations index"
  style="width:100%;aspect-ratio:960/680;border:0"
  loading="lazy"
></iframe>

---

## A mental model first: four kinds of problems

The 14 issues look scattered, but they come down to four root causes. Once you know these four, it gets much easier to place a new vulnerability.

| Category | Core idea | Topics |
| --- | --- | --- |
| **A. Injection and execution** | The browser can't tell "data" from "code" | 01 XSS, 03 Token storage, 14 CSP |
| **B. Abused browser defaults** | The browser "helpfully" attaches cookies, embeds pages and follows redirects | 02 CSRF, 11 CORS, 12 Clickjacking, 13 Open redirect |
| **C. Trust boundary in the wrong place** | Everything sent to the browser is public, and every frontend check can be bypassed | 04 Frontend-only authz, 07 Hardcoded secrets, 08 Console logs, 09 Source maps |
| **D. Supply chain and transport** | Code you trust may be swapped before it reaches the user | 05 Supply chain, 06 CDN SRI, 10 Mixed content |

In one sentence: **never trust anything that comes from the client, and never hand secrets to the client.**

---

## A. Injection and execution

### 01 XSS (Cross-Site Scripting)

> A comment board doesn't sanitize input, so malicious code runs in other people's browsers.

**How the attack works**

1. The attacker types a `<script>` into the comment box and submits it normally.
2. The server doesn't filter it and stores it in the database. This is "stored XSS".
3. Another user opens the page. The browser parses the comment as HTML and runs the script.
4. The script reads `document.cookie` and quietly sends it to the attacker's server.
5. The attacker uses the session to log in as the victim, even bypassing two-factor authentication.

**Root cause**: the server outputs user input as raw HTML, so the browser can't tell "content" from "code".

**The fix**

```js
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
res.send('<div>' + escapeHtml(comment) + '</div>');
```

Notes:

- There are three kinds of XSS: **stored** (saved in the database), **reflected** (hidden in a URL parameter) and **DOM-based** (frontend JS puts data into `innerHTML` itself).
- React and Vue escape `{value}` bindings by default. The dangerous parts are `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, and `<a href={userInput}>` (URLs starting with `javascript:` still execute).
- If you really need to render user-provided HTML (for example from a rich text editor), sanitize it with a library like [DOMPurify](https://github.com/cure53/DOMPurify). Don't write your own regex.

▶ [Open the XSS animation](/security/01-xss.html)

### 03 Token storage: localStorage vs httpOnly cookies

> The same malicious script gets completely different results depending on where the token is stored.

This animation is a side-by-side comparison. With the same XSS, a token in `localStorage` is read with a single `localStorage.getItem('token')`. A token in an `httpOnly` cookie can't be read by JavaScript at all.

**Root cause**: `localStorage` is fully open to every script on the page. One XSS gap and the token is gone.

**The fix**

```js
res.cookie('token', jwt, {
  httpOnly: true,    // not readable from JS
  secure: true,      // HTTPS only
  sameSite: 'strict' // not sent with cross-site requests (also helps against CSRF)
});
```

Note: `httpOnly` **limits the damage**; it doesn't prevent XSS. The script can't steal the token, but it can still send requests as the user while it runs. So it has to be combined with XSS protection and CSP. And once you move to cookies, you need to think about CSRF (see 02).

▶ [Open the token storage animation](/security/03-token-storage.html)

### 14 CSP (Content Security Policy)

> CSP is the most effective second line of defense against XSS, and many projects don't set it at all.

Even if escaping is missed somewhere and a malicious script ends up on the page, CSP tells the browser: "only run the scripts I allow, and only connect to the domains I allow". Without CSP, the browser places no limit on where scripts can send data.

**The fix**

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-r4nd0mBase64'
```

Notes:

- Generate a new random `nonce` for every response and add it to legitimate `<script nonce="...">` tags. Injected scripts don't have the nonce, so they won't run.
- Avoid `'unsafe-inline'` and `'unsafe-eval'`. Adding them leaves the door half open.
- Before going live, run it as `Content-Security-Policy-Report-Only` for a while to make sure it doesn't block real features.
- `connect-src` limits where `fetch` can connect, so even if a script runs, it's hard to get data out.

▶ [Open the CSP animation](/security/14-csp.html)

---

## B. Abused browser defaults

### 02 CSRF (Cross-Site Request Forgery)

> Login credentials the browser attaches automatically are used by another site to forge requests.

**How the attack works**

1. The user logs in to their bank, and the browser stores a session cookie.
2. In another tab, the user opens the attacker's page (an ad or a phishing email is enough).
3. The page contains a hidden, auto-submitting transfer form that targets `bank.com/transfer`.
4. The browser sends the bank's cookie along, as it always does. This is **normal browser behavior**, not a bug.
5. The bank sees a valid cookie, assumes the user made the request, and executes the transfer.

**Root cause**: the server only checks "is there a session cookie?" and not whether the user actually made the request from the bank's own site.

**The fix**

```js
// Add SameSite to the cookie
res.cookie('session', token, { httpOnly: true, sameSite: 'strict', secure: true });

// Verify a random token for sensitive actions
app.post('/transfer', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('CSRF token mismatch');
  }
  doTransfer(req.body);
});
```

Note: modern browsers default to `SameSite=Lax` when nothing is set, which blocks most cross-site POSTs. But **GET requests with side effects** (like `GET /delete?id=1`) are still exposed. The rule: never use GET for anything that changes data, and check the `Origin` header on the server.

▶ [Open the CSRF animation](/security/02-csrf.html)

### 11 Overly permissive CORS

> `Access-Control-Allow-Origin: *` opens the door to every website.

**How the attack works**

1. The user is logged in to your site.
2. In the same browser, the user opens a malicious site.
3. The malicious site calls your API cross-origin with `fetch(url, { credentials: 'include' })`.
4. Your server allows requests from any origin.
5. The malicious site gets private data tied to the user's identity.

**Root cause**: CORS exists to **relax** the same-origin policy. Configure it too loosely and any site can read your API as the user.

**The fix**: use an allowlist, not a wildcard.

```js
const allowedOrigins = ['https://yourapp.com', 'https://admin.yourapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Origin not allowed'));
  },
  credentials: true,
}));
```

Note (the animation simplifies this): browsers actually **refuse** `Allow-Origin: *` combined with `Allow-Credentials: true`; that combination is blocked outright. The setup that really causes incidents is **echoing back the request's `Origin`** together with `credentials: true`. It has the same effect as a wildcard, and the browser won't block it. Also watch out for allowing the `null` origin, and for checks like `endsWith('yourapp.com')`, which `evil-yourapp.com` passes.

▶ [Open the CORS animation](/security/11-cors-wildcard.html)

### 12 Clickjacking

> The button you see and the button you actually click may not be the same.

**How the attack works**

1. The attacker builds a bait page with a "Claim your reward" button.
2. A fully transparent (`opacity: 0`) iframe is placed exactly over the button. Inside it is the bank's "Confirm transfer" button.
3. The user clicks the reward button.
4. The click goes through to the layer underneath and hits the invisible transfer button.
5. The transfer completes without the user knowing.

**Root cause**: the site doesn't restrict whether other sites can embed it in an iframe.

**The fix**

```http
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
```

Note: `frame-ancestors` is the modern standard and `X-Frame-Options` is the fallback for older browsers; setting both is the safest option. `frame-ancestors` **only works as an HTTP header**; it has no effect in a `<meta>` tag.

▶ [Open the clickjacking animation](/security/12-clickjacking.html)

### 13 Open redirect

> First land on the real site to build trust, then get quietly sent somewhere else.

**How the attack works**

1. The user gets an email whose link starts with the real official domain.
2. The URL carries a redirect target in a parameter: `?redirect=https://evil-fake-bank.com`.
3. After clicking, the user briefly lands on the real site, which builds trust.
4. The site doesn't validate the target and sends the user away.
5. The user enters their credentials on an identical fake login page.

**Root cause**: the redirect target fully trusts a parameter supplied by the user.

**The fix**: only allow paths on an allowlist.

```js
const allowedPaths = ['/dashboard', '/profile', '/settings'];

app.get('/login', (req, res) => {
  const target = req.query.redirect;
  if (allowedPaths.includes(target)) return res.redirect(target);
  return res.redirect('/dashboard'); // anything untrusted goes to the default page
});
```

Note: if an allowlist isn't possible, at least parse it with `new URL(target, location.origin)` and compare the `origin`. Checking "does it start with `/`" isn't enough: browsers treat both `//evil.com` and `/\evil.com` as external URLs.

▶ [Open the open redirect animation](/security/13-open-redirect.html)

---

## C. Trust boundary in the wrong place

### 04 Authorization checked only in the frontend

> Hiding a button doesn't make it secure.

**How the attack works**

1. The frontend sees that the user isn't an admin and hides the "Delete user" button.
2. The user opens DevTools and sees the API path.
3. They skip the UI and call the API directly with `fetch`.
4. The backend doesn't check permissions again and runs the delete.
5. A loop runs it in bulk from `/api/users/1` to `/api/users/999`.

**Root cause**: the permission check only exists in the frontend, and the backend trusts every request.

**The fix**

```js
app.delete('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
  deleteUser(req.params.id);
});
```

Note: besides "are you an admin?", also check "**does this record belong to you?**". If you only verify login and not ownership, changing the id in the URL shows someone else's data. This is called IDOR (Insecure Direct Object Reference), the most common form of "Broken Access Control", which is number one on the OWASP Top 10. Permission checks in the frontend are only there for user experience.

▶ [Open the frontend authorization animation](/security/04-frontend-only-authz.html)

### 07 Secrets hardcoded in frontend code

> Anything sent to the browser is available to anyone.

**How the attack works**

1. A developer writes `const API_KEY = "sk-live-..."` in frontend code.
2. It gets bundled, minified and deployed. Minification only shortens variable names; it **does not encrypt strings**.
3. Anyone opens the Sources tab in DevTools.
4. The key is right there and can be copied.
5. The attacker uses your key to burn through your API quota.

**Root cause**: frontend code is delivered to the user's browser in full, so every string in it is effectively public.

**The fix**: the frontend calls your own backend, and the key stays in a server environment variable.

```js
// ✅ Frontend
fetch('/api/ask');

// ✅ Backend
app.get('/api/ask', async (req, res) => {
  const r = await fetch('https://api.openai.com/v1/...', {
    headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
  });
  res.json(await r.json());
});
```

Notes:

- Environment variables prefixed with `VITE_`, `NEXT_PUBLIC_` or `PUBLIC_` are **bundled into the frontend** and must never hold secrets.
- Some keys are designed to be public (Stripe publishable keys, Firebase config). Their security relies on backend rules and domain restrictions.
- Once a key leaks, deleting it from the code doesn't help, because it's still in the Git history. **Revoke and rotate it immediately.**

▶ [Open the hardcoded secrets animation](/security/07-hardcoded-secrets.html)

### 08 Sensitive data in console logs

> A debug log left behind becomes a public data window in production.

A `console.log('user data:', userData)` left over from development gets shipped. Anyone who opens the Console sees personal data, roles and internal notes, and can infer the backend's data structure as a lead for the next attack.

**Root cause**: debug output doesn't change with the environment.

**The fix**: strip it automatically at build time.

```js
// webpack (Terser)
optimization: {
  minimizer: [new TerserPlugin({
    terserOptions: { compress: { drop_console: true } },
  })],
}

// Vite (esbuild)
export default defineConfig({
  esbuild: { drop: ['console', 'debugger'] },
});
```

Note: better than stripping after the fact is a logger with levels (debug output only in development), plus the ESLint `no-console` rule to catch it before code review.

▶ [Open the console log animation](/security/08-console-log.html)

### 09 Source maps exposing the original code

> The code looks minified and obfuscated, but one `.map` file restores all of it.

**How the attack works**

1. The build tool minifies the code into `function a(b){return b.c+b.d}`.
2. `main.abc123.js.map` gets deployed along with it.
3. DevTools loads `.map` files natively; no extra tools needed.
4. The code is restored to `calculateDiscount(price, rate)`, comments included.
5. The attacker reads the logic and finds a flaw (for example, no upper limit on the discount).

**Root cause**: a `.map` file is a complete lookup table between the original and the minified code.

**The fix**

```js
// webpack
module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};

// Vite (false is already the default)
export default defineConfig({ build: { sourcemap: false } });
```

Note: if you need original line numbers in an error tracker like Sentry, use `'hidden'` to generate source maps without referencing them in the JS, upload them to the error tracker, and delete them from the deployed files. And remember: even without source maps, frontend code can still be read. **Don't build security on "nobody can understand it".**

▶ [Open the source map animation](/security/09-source-map.html)

---

## D. Supply chain and transport

### 05 Third-party supply chain attacks

> The package you trust may depend on a package you've never heard of that has already been compromised.

**How the attack works**

1. Your project installs `popular-lib`, which pulls in dozens of layers of dependencies.
2. The maintainer account of an obscure but widely used deep dependency gets taken over.
3. The attacker publishes a new version with data-stealing code that only triggers in production.
4. You run `npm install`, and the `^` version range upgrades your project to the malicious version.
5. The malicious code ships with your build and runs in every user's browser.

**Root cause**: the project trusts the entire dependency chain but can't review every update of every layer.

**The fix**

```bash
# Install exactly what the lockfile says, no automatic version bumps
npm ci

# Scan automatically in CI
npm audit
# Or enable GitHub Dependabot (.github/dependabot.yml) to open fix PRs automatically
```

Note: always commit the lockfile. Before adding a package, check its download count, maintenance status and number of dependencies. Consider `npm install --ignore-scripts` so `postinstall` scripts can't run during install. Real incidents like `event-stream` (2018) and `ua-parser-js` (2021) followed exactly this pattern.

▶ [Open the supply chain animation](/security/05-supply-chain.html)

### 06 CDN resources without SRI

> When a CDN is compromised and a file is swapped, SRI is the last line of defense.

This animation is a side-by-side comparison. The same file on the CDN is replaced. The page without `integrity` accepts it as is. On the page with SRI, the browser sees the hash doesn't match and refuses to run it.

**Root cause**: without the `integrity` attribute, the browser doesn't check the file's contents.

**The fix**

```html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-..."
  crossorigin="anonymous">
</script>
```

Note: you can generate the hash like this:

```bash
openssl dgst -sha384 -binary lib.js | openssl base64 -A
```

`crossorigin="anonymous"` is required, otherwise the browser can't do the check. SRI only works for files with **pinned versions**. It doesn't work for things like `lib@latest` or resources that return different content per browser; in those cases it's better to download the file and host it yourself.

▶ [Open the CDN SRI animation](/security/06-cdn-sri.html)

### 10 No enforced HTTPS / mixed content

> The page itself is encrypted, but one unencrypted resource can be intercepted.

**How the attack works**

1. The user browses an HTTPS site on public Wi-Fi in a café.
2. One image on the page loads over `http://` (missing the "s").
3. An attacker on the same Wi-Fi intercepts the unencrypted request.
4. The attacker eavesdrops or replaces the content entirely.
5. One gap undoes the encryption of the whole page.

**Root cause**: if even one resource goes over HTTP, that resource travels completely unencrypted.

**The fix**

```http
Content-Security-Policy: upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Note: `upgrade-insecure-requests` automatically upgrades `http://` requests on the page to `https://`. `Strict-Transport-Security` (HSTS) makes the browser remember "this site is HTTPS only", so even typing `http://` the first time goes over HTTPS. Modern browsers block mixed scripts outright, but the real fix is still changing every resource URL to `https://`.

▶ [Open the mixed content animation](/security/10-mixed-content.html)

---

## Summary: all 14 issues in one table

| # | Topic | Root cause | First defense to add |
| --- | --- | --- | --- |
| 01 | XSS | Input runs as HTML | Escape on output, avoid `innerHTML` |
| 02 | CSRF | Browser attaches cookies automatically | `SameSite` + CSRF token |
| 03 | Token storage | `localStorage` is open to JS | `httpOnly` cookie |
| 04 | Frontend authz | Backend doesn't check permissions | Check role and ownership on every API |
| 05 | Supply chain | Auto-upgrade to a compromised version | `npm ci` + lockfile + Dependabot |
| 06 | CDN SRI | External file contents aren't verified | `integrity` + `crossorigin` |
| 07 | Hardcoded secrets | Frontend code is public | Keys only in backend env vars |
| 08 | Console logs | Debug output ships to production | `drop_console` at build time |
| 09 | Source maps | `.map` files deployed | Disable source maps in production |
| 10 | Mixed content | Some resources over HTTP | `upgrade-insecure-requests` + HSTS |
| 11 | CORS | Any origin allowed | Origin allowlist |
| 12 | Clickjacking | Page can be embedded anywhere | `frame-ancestors 'none'` |
| 13 | Open redirect | Trusting a user-supplied URL | Redirect path allowlist |
| 14 | CSP | Browser doesn't restrict script sources | `script-src` + nonce |

## Pre-launch checklist

- [ ] All user input is escaped on output; no direct `innerHTML` / `dangerouslySetInnerHTML` / `v-html`
- [ ] Credentials are in `httpOnly`, `Secure`, `SameSite` cookies, not in `localStorage`
- [ ] Nothing that changes data uses GET, and there is CSRF protection
- [ ] Every API checks on the backend "who is this" and "can they touch this record"
- [ ] No secret keys in frontend code or public `.env` variables
- [ ] No `console.log` and no source maps in production
- [ ] Lockfile is committed, CI uses `npm ci` and runs `npm audit`
- [ ] External CDN resources have SRI, or are self-hosted
- [ ] Every resource uses HTTPS, and HSTS is set
- [ ] CORS uses an allowlist and doesn't echo arbitrary `Origin` values
- [ ] `frame-ancestors` is set to prevent embedding
- [ ] Redirect parameters are validated
- [ ] CSP is set, starting in Report-Only mode before enforcing

## Security headers cheat sheet

The headers mentioned above, in one place. Most can go straight into your server or CDN config:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

After setting them, check with [securityheaders.com](https://securityheaders.com) or [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory).

---

## Closing thoughts

My biggest takeaway from going through these 14 issues: **frontend security isn't a pile of unrelated tricks. It's a few principles that keep coming back.**

- Anything the user sends in can't be trusted (XSS, open redirect, frontend authz).
- Anything sent to the user is public (keys, console logs, source maps).
- The browser's convenience features are convenient for attackers too (CSRF, CORS, clickjacking).
- Every layer should assume the one before it might fail (`httpOnly`, CSP and SRI are all defense in depth).

If you want to learn this more systematically, start with the [OWASP Top 10](https://owasp.org/www-project-top-ten/) and [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security). Or go back to the animation index above, pick one, and walk through it from the attacker's side.
