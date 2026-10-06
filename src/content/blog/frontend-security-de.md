---
title: 'Frontend-Sicherheit verstehen: Häufige Angriffe und ihre Abwehr, erklärt mit Animationen'
description: 'Von XSS und CSRF über Token-Speicherung bis CSP: die häufigsten Sicherheitsprobleme im Frontend, aufgeschlüsselt in „Wie denkt der Angreifer → Grundursache → richtige Lösung", jeweils mit einer interaktiven Schritt-für-Schritt-Animation.'
pubDate: 2026-10-06
cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
category: 'Engineering & Insights'
lang: 'de'
draft: false
---

# Frontend-Sicherheit verstehen: Häufige Angriffe und ihre Abwehr, erklärt mit Animationen

Viele Frontend-Entwickler halten Sicherheit für „Sache des Backends". In der Praxis passieren die meisten Angriffe aber **im Browser**: Ein bösartiges Skript läuft im Tab des Nutzers, der Browser schickt Cookies von sich aus mit, oder ein API-Schlüssel landet im Bundle und wird an jeden Besucher ausgeliefert.

Das hier sind meine Lernnotizen zur Frontend-Sicherheit. Ich habe die häufigsten Probleme als interaktive Animationen umgesetzt, und alle folgen derselben Struktur:

1. **Fünf Schritte**: Schritt für Schritt sehen, wie der Angriff abläuft, mit einer „Hacker-Sicht" pro Schritt, die erklärt, was der Angreifer gerade denkt.
2. **Grundursache**: warum das überhaupt möglich ist.
3. **Die richtige Lösung**: Code, den man tatsächlich einsetzen kann.

Hier ist die Übersicht aller Animationen. Einfach auf eine Karte klicken. (Die Animationen selbst sind auf traditionellem Chinesisch; dieser Beitrag behandelt dieselben Inhalte auf Deutsch.)

<iframe
  src="/security/index.html"
  title="Übersicht der Frontend-Sicherheitsanimationen"
  style="width:100%;aspect-ratio:960/680;border:0"
  loading="lazy"
></iframe>

---

## Zuerst ein Denkmodell: vier Arten von Problemen

Diese Probleme wirken verstreut, lassen sich aber auf vier Grundursachen zurückführen. Wer diese vier kennt, kann auch neue Schwachstellen leichter einordnen.

| Kategorie | Kernidee | Themen |
| --- | --- | --- |
| **A. Injection und Ausführung** | Der Browser kann „Daten" nicht von „Code" unterscheiden | 01 XSS, 03 Token-Speicherung, 14 CSP |
| **B. Missbrauchtes Browser-Verhalten** | Der Browser hängt „hilfsbereit" Cookies an, bettet Seiten ein und folgt Weiterleitungen | 02 CSRF, 11 CORS, 12 Clickjacking, 13 Open Redirect |
| **C. Vertrauensgrenze an der falschen Stelle** | Alles, was an den Browser geht, ist öffentlich, und jede Prüfung im Frontend lässt sich umgehen | 04 Autorisierung nur im Frontend, 07 Hartcodierte Secrets, 08 Console-Logs, 09 Source Maps |
| **D. Lieferkette und Transport** | Code, dem man vertraut, kann ausgetauscht werden, bevor er beim Nutzer ankommt | 05 Supply Chain, 06 CDN-SRI, 10 Mixed Content |

In einem Satz: **Vertraue nichts, was vom Client kommt, und gib dem Client keine Geheimnisse.**

---

## A. Injection und Ausführung

### 01 XSS (Cross-Site Scripting)

> Ein Kommentarfeld filtert die Eingabe nicht, und bösartiger Code läuft in den Browsern anderer Nutzer.

**Ablauf des Angriffs**

1. Der Angreifer gibt ein `<script>` ins Kommentarfeld ein und schickt es ganz normal ab.
2. Der Server filtert nichts und speichert es in der Datenbank. Das ist „Stored XSS".
3. Ein anderer Nutzer öffnet die Seite. Der Browser interpretiert den Kommentar als HTML und führt das Skript aus.
4. Das Skript liest `document.cookie` und schickt es unbemerkt an den Server des Angreifers.
5. Der Angreifer meldet sich mit der Session als das Opfer an und umgeht dabei sogar die Zwei-Faktor-Authentifizierung.

**Grundursache**: Der Server gibt Nutzereingaben unverändert als HTML aus, und der Browser kann „Inhalt" nicht von „Code" unterscheiden.

**Die Lösung**

```js
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
res.send('<div>' + escapeHtml(comment) + '</div>');
```

Ergänzungen:

- Es gibt drei Arten von XSS: **Stored** (in der Datenbank gespeichert), **Reflected** (in einem URL-Parameter versteckt) und **DOM-based** (das Frontend-JS schreibt Daten selbst in `innerHTML`).
- React und Vue escapen `{value}`-Bindings standardmäßig. Gefährlich sind `dangerouslySetInnerHTML`, `v-html`, `innerHTML` und `<a href={userInput}>` (URLs, die mit `javascript:` beginnen, werden trotzdem ausgeführt).
- Wenn wirklich nutzergeneriertes HTML angezeigt werden muss (z. B. aus einem Rich-Text-Editor), mit einer Bibliothek wie [DOMPurify](https://github.com/cure53/DOMPurify) bereinigen. Keine eigenen Regex schreiben.

▶ [Zur XSS-Animation](/security/01-xss.html)

### 03 Token-Speicherung: localStorage vs. httpOnly-Cookie

> Dasselbe bösartige Skript, völlig unterschiedliche Ergebnisse, je nachdem wo der Token liegt.

Diese Animation ist ein direkter Vergleich. Bei derselben XSS-Lücke wird ein Token in `localStorage` mit einem einzigen `localStorage.getItem('token')` ausgelesen. Ein Token in einem `httpOnly`-Cookie ist für JavaScript überhaupt nicht lesbar.

**Grundursache**: `localStorage` steht jedem Skript auf der Seite offen. Eine einzige XSS-Lücke, und der Token ist weg.

**Die Lösung**

```js
res.cookie('token', jwt, {
  httpOnly: true,    // für JS nicht lesbar
  secure: true,      // nur über HTTPS
  sameSite: 'strict' // nicht bei Cross-Site-Requests mitsenden (hilft auch gegen CSRF)
});
```

Ergänzung: `httpOnly` **begrenzt den Schaden**, verhindert aber kein XSS. Das Skript kann den Token nicht stehlen, aber während es läuft, trotzdem Requests im Namen des Nutzers senden. Deshalb gehört es immer zusammen mit XSS-Schutz und CSP. Und wer auf Cookies umsteigt, muss an CSRF denken (siehe 02).

▶ [Zur Animation Token-Speicherung](/security/03-token-storage.html)

### 14 CSP (Content Security Policy)

> CSP ist die wirksamste zweite Verteidigungslinie gegen XSS, und viele Projekte setzen sie gar nicht.

Selbst wenn irgendwo das Escaping fehlt und ein bösartiges Skript auf die Seite gelangt, sagt CSP dem Browser: „Führe nur die Skripte aus, die ich erlaube, und verbinde dich nur mit den Domains, die ich erlaube." Ohne CSP schränkt der Browser nicht ein, wohin Skripte Daten senden dürfen.

**Die Lösung**

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-r4nd0mBase64'
```

Ergänzungen:

- Für jede Response eine neue zufällige `nonce` erzeugen und an legitime `<script nonce="...">`-Tags hängen. Eingeschleuste Skripte haben keine Nonce und werden nicht ausgeführt.
- `'unsafe-inline'` und `'unsafe-eval'` vermeiden. Damit steht die Tür halb offen.
- Vor dem Livegang eine Weile als `Content-Security-Policy-Report-Only` laufen lassen, um sicherzugehen, dass keine echten Funktionen blockiert werden.
- `connect-src` beschränkt, wohin `fetch` sich verbinden darf. Selbst wenn ein Skript läuft, kommt es so kaum an Daten heraus.

▶ [Zur CSP-Animation](/security/14-csp.html)

---

## B. Missbrauchtes Browser-Verhalten

### 02 CSRF (Cross-Site Request Forgery)

> Anmeldedaten, die der Browser automatisch mitschickt, werden von einer anderen Seite für gefälschte Requests genutzt.

**Ablauf des Angriffs**

1. Der Nutzer meldet sich bei seiner Bank an, der Browser speichert ein Session-Cookie.
2. In einem anderen Tab öffnet der Nutzer die Seite des Angreifers (eine Anzeige oder eine Phishing-Mail reicht).
3. Die Seite enthält ein verstecktes, automatisch abgeschicktes Überweisungsformular mit Ziel `bank.com/transfer`.
4. Der Browser schickt das Cookie der Bank wie immer mit. Das ist **normales Browserverhalten**, kein Bug.
5. Die Bank sieht ein gültiges Cookie, nimmt an, der Nutzer hat den Request selbst gestellt, und führt die Überweisung aus.

**Grundursache**: Der Server prüft nur „Gibt es ein Session-Cookie?", aber nicht, ob der Nutzer den Request tatsächlich auf der Seite der Bank ausgelöst hat.

**Die Lösung**

```js
// SameSite am Cookie setzen
res.cookie('session', token, { httpOnly: true, sameSite: 'strict', secure: true });

// Für kritische Aktionen zusätzlich einen zufälligen Token prüfen
app.post('/transfer', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('CSRF-Token stimmt nicht');
  }
  doTransfer(req.body);
});
```

Ergänzung: Moderne Browser verwenden standardmäßig `SameSite=Lax`, wenn nichts gesetzt ist. Das blockiert die meisten Cross-Site-POSTs. **GET-Requests mit Seiteneffekten** (z. B. `GET /delete?id=1`) sind aber weiterhin angreifbar. Die Regel: Nichts, was Daten ändert, über GET abwickeln, und auf dem Server den `Origin`-Header prüfen.

▶ [Zur CSRF-Animation](/security/02-csrf.html)

### 11 Zu großzügiges CORS

> `Access-Control-Allow-Origin: *` öffnet jeder Website die Tür.

**Ablauf des Angriffs**

1. Der Nutzer ist auf deiner Seite angemeldet.
2. Im selben Browser öffnet er eine bösartige Seite.
3. Die bösartige Seite ruft deine API cross-origin mit `fetch(url, { credentials: 'include' })` auf.
4. Dein Server erlaubt Requests von jedem Origin.
5. Die bösartige Seite bekommt private Daten mit der Identität des Nutzers.

**Grundursache**: CORS dient dazu, die Same-Origin-Policy zu **lockern**. Ist es zu locker konfiguriert, kann jede Seite deine API im Namen des Nutzers auslesen.

**Die Lösung**: eine Allowlist statt einer Wildcard.

```js
const allowedOrigins = ['https://yourapp.com', 'https://admin.yourapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Origin nicht erlaubt'));
  },
  credentials: true,
}));
```

Ergänzung (die Animation vereinfacht hier): Browser **lehnen** `Allow-Origin: *` in Kombination mit `Allow-Credentials: true` tatsächlich ab; diese Kombination wird direkt blockiert. Was in der Praxis wirklich zu Vorfällen führt, ist das **unveränderte Zurückspiegeln des `Origin`-Headers** zusammen mit `credentials: true`. Das wirkt wie eine Wildcard, und der Browser blockiert es nicht. Außerdem Vorsicht beim Erlauben des `null`-Origins und bei Prüfungen wie `endsWith('yourapp.com')`, die `evil-yourapp.com` bestehen würde.

▶ [Zur CORS-Animation](/security/11-cors-wildcard.html)

### 12 Clickjacking

> Der Button, den du siehst, und der Button, den du tatsächlich klickst, sind vielleicht nicht derselbe.

**Ablauf des Angriffs**

1. Der Angreifer baut eine Köderseite mit einem Button „Jetzt Prämie sichern".
2. Ein komplett transparentes (`opacity: 0`) iframe liegt genau über dem Button. Darin befindet sich der Button „Überweisung bestätigen" der Bank.
3. Der Nutzer klickt auf den Prämien-Button.
4. Der Klick geht an die darunterliegende Ebene und trifft den unsichtbaren Überweisungs-Button.
5. Die Überweisung wird ausgeführt, ohne dass der Nutzer etwas merkt.

**Grundursache**: Die Seite schränkt nicht ein, ob andere Seiten sie per iframe einbetten dürfen.

**Die Lösung**

```http
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
```

Ergänzung: `frame-ancestors` ist der moderne Standard, `X-Frame-Options` der Fallback für ältere Browser; beide zu setzen ist am sichersten. `frame-ancestors` **funktioniert nur als HTTP-Header**; in einem `<meta>`-Tag hat es keine Wirkung.

▶ [Zur Clickjacking-Animation](/security/12-clickjacking.html)

### 13 Open Redirect

> Erst auf der echten Seite landen und Vertrauen aufbauen, dann unbemerkt woandershin geleitet werden.

**Ablauf des Angriffs**

1. Der Nutzer bekommt eine E-Mail, deren Link mit der echten offiziellen Domain beginnt.
2. Die URL enthält ein Weiterleitungsziel als Parameter: `?redirect=https://evil-fake-bank.com`.
3. Nach dem Klick landet der Nutzer kurz auf der echten Seite, was Vertrauen schafft.
4. Die Seite prüft das Ziel nicht und leitet den Nutzer weiter.
5. Der Nutzer gibt seine Zugangsdaten auf einer identischen gefälschten Login-Seite ein.

**Grundursache**: Das Weiterleitungsziel vertraut einem vom Nutzer übergebenen Parameter vollständig.

**Die Lösung**: nur Pfade aus einer Allowlist zulassen.

```js
const allowedPaths = ['/dashboard', '/profile', '/settings'];

app.get('/login', (req, res) => {
  const target = req.query.redirect;
  if (allowedPaths.includes(target)) return res.redirect(target);
  return res.redirect('/dashboard'); // alles Unbekannte geht zur Standardseite
});
```

Ergänzung: Ist keine Allowlist möglich, zumindest mit `new URL(target, location.origin)` parsen und den `origin` vergleichen. Nur zu prüfen, „beginnt es mit `/`", reicht nicht: Browser behandeln sowohl `//evil.com` als auch `/\evil.com` als externe URLs.

▶ [Zur Open-Redirect-Animation](/security/13-open-redirect.html)

---

## C. Vertrauensgrenze an der falschen Stelle

### 04 Autorisierung nur im Frontend geprüft

> Einen Button zu verstecken, macht nichts sicher.

**Ablauf des Angriffs**

1. Das Frontend erkennt, dass der Nutzer kein Admin ist, und blendet den Button „Nutzer löschen" aus.
2. Der Nutzer öffnet die DevTools und sieht den API-Pfad.
3. Er umgeht die Oberfläche und ruft die API direkt mit `fetch` auf.
4. Das Backend prüft die Berechtigung nicht erneut und löscht.
5. Eine Schleife wiederholt das massenhaft von `/api/users/1` bis `/api/users/999`.

**Grundursache**: Die Berechtigungsprüfung existiert nur im Frontend, und das Backend vertraut jedem Request.

**Die Lösung**

```js
app.delete('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Keine Berechtigung');
  deleteUser(req.params.id);
});
```

Ergänzung: Neben „Bist du Admin?" auch prüfen: „**Gehört dieser Datensatz dir?**". Wer nur den Login und nicht die Eigentümerschaft prüft, zeigt fremde Daten an, sobald jemand die ID in der URL ändert. Das nennt sich IDOR (Insecure Direct Object Reference) und ist die häufigste Form von „Broken Access Control", Platz eins der OWASP Top 10. Berechtigungsprüfungen im Frontend dienen nur der Nutzerfreundlichkeit.

▶ [Zur Animation Frontend-Autorisierung](/security/04-frontend-only-authz.html)

### 07 Secrets hartcodiert im Frontend-Code

> Alles, was an den Browser geht, kann jeder haben.

**Ablauf des Angriffs**

1. Ein Entwickler schreibt `const API_KEY = "sk-live-..."` in den Frontend-Code.
2. Der Code wird gebündelt, minifiziert und deployt. Minifizierung kürzt nur Variablennamen; sie **verschlüsselt keine Strings**.
3. Jemand öffnet den Sources-Tab in den DevTools.
4. Der Schlüssel steht dort im Klartext und kann kopiert werden.
5. Der Angreifer verbraucht mit deinem Schlüssel dein API-Kontingent.

**Grundursache**: Frontend-Code wird vollständig an den Browser ausgeliefert, also ist jeder String darin faktisch öffentlich.

**Die Lösung**: Das Frontend ruft dein eigenes Backend auf, und der Schlüssel bleibt in einer Umgebungsvariable auf dem Server.

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

Ergänzungen:

- Umgebungsvariablen mit dem Präfix `VITE_`, `NEXT_PUBLIC_` oder `PUBLIC_` **landen im Frontend-Bundle** und dürfen nie Secrets enthalten.
- Manche Schlüssel sind bewusst öffentlich (Stripe Publishable Key, Firebase-Config). Ihre Sicherheit beruht auf Backend-Regeln und Domain-Einschränkungen.
- Ist ein Schlüssel einmal geleakt, hilft Löschen aus dem Code nicht, denn er steht noch in der Git-Historie. **Sofort widerrufen und neu ausstellen.**

▶ [Zur Animation Hartcodierte Secrets](/security/07-hardcoded-secrets.html)

### 08 Sensible Daten in Console-Logs

> Ein vergessenes Debug-Log wird in Produktion zum öffentlichen Datenfenster.

Ein `console.log('user data:', userData)` aus der Entwicklung bleibt drin und wird ausgeliefert. Wer die Console öffnet, sieht persönliche Daten, Rollen und interne Notizen und kann daraus die Datenstruktur des Backends ableiten, als Hinweis für den nächsten Angriff.

**Grundursache**: Debug-Ausgaben passen sich nicht an die Umgebung an.

**Die Lösung**: beim Build automatisch entfernen.

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

Ergänzung: Besser als nachträgliches Entfernen ist ein Logger mit Log-Leveln (Debug-Ausgaben nur in der Entwicklung) plus die ESLint-Regel `no-console`, die es schon vor dem Code-Review abfängt.

▶ [Zur Console-Log-Animation](/security/08-console-log.html)

### 09 Source Maps legen den Originalcode offen

> Der Code sieht minifiziert und verschleiert aus, aber eine einzige `.map`-Datei stellt ihn komplett wieder her.

**Ablauf des Angriffs**

1. Das Build-Tool minifiziert den Code zu `function a(b){return b.c+b.d}`.
2. `main.abc123.js.map` wird mit deployt.
3. Die DevTools laden `.map`-Dateien nativ; es braucht keine zusätzlichen Tools.
4. Der Code wird zu `calculateDiscount(price, rate)` wiederhergestellt, inklusive Kommentaren.
5. Der Angreifer versteht die Logik und findet eine Lücke (z. B. keine Obergrenze für den Rabatt).

**Grundursache**: Eine `.map`-Datei ist eine vollständige Zuordnungstabelle zwischen Original- und minifiziertem Code.

**Die Lösung**

```js
// webpack
module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};

// Vite (false ist bereits der Standard)
export default defineConfig({ build: { sourcemap: false } });
```

Ergänzung: Wer in einem Error-Tracker wie Sentry die Originalzeilen braucht, erzeugt Source Maps mit `'hidden'` (ohne Verweis im JS), lädt sie zum Error-Tracker hoch und löscht sie aus den deployten Dateien. Und nicht vergessen: Auch ohne Source Maps lässt sich Frontend-Code lesen. **Sicherheit nicht darauf aufbauen, dass „es eh keiner versteht".**

▶ [Zur Source-Map-Animation](/security/09-source-map.html)

---

## D. Lieferkette und Transport

### 05 Supply-Chain-Angriffe über Drittanbieter-Pakete

> Das Paket, dem du vertraust, hängt vielleicht von einem Paket ab, das du nicht kennst und das bereits kompromittiert ist.

**Ablauf des Angriffs**

1. Dein Projekt installiert `popular-lib`, das Dutzende Ebenen an Abhängigkeiten mitbringt.
2. Das Maintainer-Konto einer unbekannten, aber weit verbreiteten tiefen Abhängigkeit wird übernommen.
3. Der Angreifer veröffentlicht eine neue Version mit Code, der Daten abgreift und nur in Produktion auslöst.
4. Du führst `npm install` aus, und der `^`-Versionsbereich aktualisiert dein Projekt auf die bösartige Version.
5. Der bösartige Code kommt mit deinem Build heraus und läuft im Browser jedes Nutzers.

**Grundursache**: Das Projekt vertraut der gesamten Abhängigkeitskette, kann aber nicht jedes Update jeder Ebene prüfen.

**Die Lösung**

```bash
# Exakt nach Lockfile installieren, keine automatischen Versionssprünge
npm ci

# Automatischer Scan in der CI
npm audit
# Oder GitHub Dependabot aktivieren (.github/dependabot.yml), der automatisch Fix-PRs öffnet
```

Ergänzung: Das Lockfile immer committen. Vor dem Hinzufügen eines Pakets Downloadzahlen, Wartungsstatus und Anzahl der Abhängigkeiten prüfen. `npm install --ignore-scripts` in Betracht ziehen, damit `postinstall`-Skripte nicht schon bei der Installation laufen. Echte Vorfälle wie `event-stream` (2018) und `ua-parser-js` (2021) folgten genau diesem Muster.

▶ [Zur Supply-Chain-Animation](/security/05-supply-chain.html)

### 06 CDN-Ressourcen ohne SRI

> Wird ein CDN kompromittiert und eine Datei ausgetauscht, ist SRI die letzte Verteidigungslinie.

Diese Animation ist ein direkter Vergleich. Dieselbe Datei auf dem CDN wird ersetzt. Die Seite ohne `integrity` übernimmt sie einfach. Bei der Seite mit SRI erkennt der Browser, dass der Hash nicht passt, und verweigert die Ausführung.

**Grundursache**: Ohne das `integrity`-Attribut prüft der Browser den Inhalt der Datei nicht.

**Die Lösung**

```html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-..."
  crossorigin="anonymous">
</script>
```

Ergänzung: Den Hash erzeugt man so:

```bash
openssl dgst -sha384 -binary lib.js | openssl base64 -A
```

`crossorigin="anonymous"` ist Pflicht, sonst kann der Browser nicht prüfen. SRI funktioniert nur für Dateien mit **fester Version**. Für `lib@latest` oder Ressourcen, die je nach Browser unterschiedliche Inhalte liefern, klappt es nicht; dann ist es besser, die Datei herunterzuladen und selbst zu hosten.

▶ [Zur CDN-SRI-Animation](/security/06-cdn-sri.html)

### 10 Kein erzwungenes HTTPS / Mixed Content

> Die Seite selbst ist verschlüsselt, aber eine einzige unverschlüsselte Ressource kann abgefangen werden.

**Ablauf des Angriffs**

1. Der Nutzer surft im öffentlichen WLAN eines Cafés auf einer HTTPS-Seite.
2. Ein Bild auf der Seite wird über `http://` geladen (das „s" fehlt).
3. Ein Angreifer im selben WLAN fängt den unverschlüsselten Request ab.
4. Der Angreifer liest mit oder ersetzt den Inhalt komplett.
5. Eine einzige Lücke hebt die Verschlüsselung der ganzen Seite auf.

**Grundursache**: Geht auch nur eine Ressource über HTTP, wird genau diese Ressource völlig unverschlüsselt übertragen.

**Die Lösung**

```http
Content-Security-Policy: upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Ergänzung: `upgrade-insecure-requests` stuft `http://`-Requests auf der Seite automatisch auf `https://` hoch. `Strict-Transport-Security` (HSTS) sorgt dafür, dass sich der Browser „diese Seite nur über HTTPS" merkt, sodass selbst ein beim ersten Mal getipptes `http://` über HTTPS geht. Moderne Browser blockieren gemischte Skripte direkt, aber die eigentliche Lösung bleibt, alle Ressourcen-URLs auf `https://` umzustellen.

▶ [Zur Mixed-Content-Animation](/security/10-mixed-content.html)

---

## Zusammenfassung: alle Probleme in einer Tabelle

| # | Thema | Grundursache | Erste Abwehrmaßnahme |
| --- | --- | --- | --- |
| 01 | XSS | Eingabe wird als HTML ausgeführt | Bei der Ausgabe escapen, kein `innerHTML` |
| 02 | CSRF | Browser hängt Cookies automatisch an | `SameSite` + CSRF-Token |
| 03 | Token-Speicherung | `localStorage` ist für JS offen | `httpOnly`-Cookie |
| 04 | Frontend-Autorisierung | Backend prüft keine Berechtigungen | Rolle und Eigentümerschaft bei jeder API prüfen |
| 05 | Supply Chain | Automatisches Update auf kompromittierte Version | `npm ci` + Lockfile + Dependabot |
| 06 | CDN-SRI | Inhalt externer Dateien wird nicht geprüft | `integrity` + `crossorigin` |
| 07 | Hartcodierte Secrets | Frontend-Code ist öffentlich | Schlüssel nur in Backend-Umgebungsvariablen |
| 08 | Console-Logs | Debug-Ausgaben landen in Produktion | `drop_console` beim Build |
| 09 | Source Maps | `.map`-Dateien werden mit deployt | Source Maps in Produktion deaktivieren |
| 10 | Mixed Content | Einzelne Ressourcen über HTTP | `upgrade-insecure-requests` + HSTS |
| 11 | CORS | Jeder Origin ist erlaubt | Origin-Allowlist |
| 12 | Clickjacking | Seite kann überall eingebettet werden | `frame-ancestors 'none'` |
| 13 | Open Redirect | Vertrauen in eine vom Nutzer übergebene URL | Allowlist für Weiterleitungspfade |
| 14 | CSP | Browser schränkt Skriptquellen nicht ein | `script-src` + Nonce |

## Checkliste vor dem Livegang

- [ ] Alle Nutzereingaben werden bei der Ausgabe escaped; kein direktes `innerHTML` / `dangerouslySetInnerHTML` / `v-html`
- [ ] Anmeldedaten liegen in `httpOnly`-, `Secure`-, `SameSite`-Cookies, nicht in `localStorage`
- [ ] Nichts, was Daten ändert, läuft über GET, und es gibt CSRF-Schutz
- [ ] Jede API prüft im Backend „Wer ist das?" und „Darf er diesen Datensatz anfassen?"
- [ ] Keine geheimen Schlüssel im Frontend-Code oder in öffentlichen `.env`-Variablen
- [ ] Kein `console.log` und keine Source Maps in Produktion
- [ ] Lockfile ist committet, die CI nutzt `npm ci` und führt `npm audit` aus
- [ ] Externe CDN-Ressourcen haben SRI oder werden selbst gehostet
- [ ] Alle Ressourcen laufen über HTTPS, und HSTS ist gesetzt
- [ ] CORS nutzt eine Allowlist und spiegelt keine beliebigen `Origin`-Werte zurück
- [ ] `frame-ancestors` ist gesetzt, um Einbettung zu verhindern
- [ ] Weiterleitungsparameter werden validiert
- [ ] CSP ist gesetzt, zuerst im Report-Only-Modus, dann scharf geschaltet

## Spickzettel: Security-Header

Die oben genannten Header an einem Ort. Die meisten lassen sich direkt in die Server- oder CDN-Konfiguration übernehmen:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

Danach mit [securityheaders.com](https://securityheaders.com) oder dem [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory) prüfen.

---

## Fazit

Meine wichtigste Erkenntnis aus diesen Problemen: **Frontend-Sicherheit ist kein Haufen unzusammenhängender Tricks, sondern ein paar Prinzipien, die immer wiederkehren.**

- Was der Nutzer hereinschickt, ist nicht vertrauenswürdig (XSS, Open Redirect, Frontend-Autorisierung).
- Was an den Nutzer geht, ist öffentlich (Schlüssel, Console-Logs, Source Maps).
- Die Komfortfunktionen des Browsers sind auch für Angreifer bequem (CSRF, CORS, Clickjacking).
- Jede Ebene sollte davon ausgehen, dass die vorherige versagen kann (`httpOnly`, CSP und SRI sind alles Defense in Depth).

Wer das systematischer lernen möchte, startet am besten mit den [OWASP Top 10](https://owasp.org/www-project-top-ten/) und [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security). Oder einfach zurück zur Animationsübersicht oben, eine auswählen und aus Sicht des Angreifers durchspielen.
