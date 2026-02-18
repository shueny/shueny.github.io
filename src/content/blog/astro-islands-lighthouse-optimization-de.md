---
title: 'Von 60 auf 100: Wie ich mein Astro-Portfolio auf perfekte Lighthouse-Werte optimiert habe'
description: 'Eine praxisnahe Fallstudie zur Optimierung einer Astro + React Islands Portfolio-Website. Erfahren Sie, wie Self-Hosting von Schriftarten, statisches Hero-Rendering, Islands Code-Splitting und kritisches CSS-Inlining den FCP von 2,9s auf 0,4s verbesserten und einen perfekten Desktop-Lighthouse-Score erzielten.'
pubDate: 2026-02-18
cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
category: 'Engineering & Insights'
draft: false
---

# Von 60 auf 100: Wie ich mein Astro-Portfolio auf perfekte Lighthouse-Werte optimiert habe

Als Frontend-Entwickler ist deine Portfolio-Website dein Lebenslauf in Aktion. Als mein Lighthouse-Performance-Score auf dem Handy bei etwa 60 lag — orange, mittelmäßig, peinlich — wusste ich, dass ich es beheben muss. Nach einer systematischen Optimierung erreichte ich **96 auf Mobile** und **100 auf Desktop**, wobei der FCP von 2,9s auf 0,2s sank.

Hier ist genau, was ich diagnostiziert, analysiert und behoben habe.

---

## Der Ausgangspunkt: Was war das Problem?

Lighthouse markierte drei große Engpässe auf meiner Astro + React Islands Website:

### Engpass 1: Render-blockierende Google Fonts (750ms Verzögerung)

Die Website lud Schriftarten über ein synchrones `<link>`-Tag vom Google CDN. Dies erzeugte eine **dreistufige Cross-Origin-Anfragekette**:

```
HTML → fonts.googleapis.com (CSS) → fonts.gstatic.com (woff2) → Rendering
```

Allein die CSS-Datei brauchte 750ms. Die 28 Schriftdateien (für mehrere Sprach-Subsets) fügten weitere ~300ms hinzu. Diese einzelne Ressource machte fast 1 Sekunde Render-Blocking-Zeit aus.

### Engpass 2: JavaScript-abhängiger Hero (465KB+ vor dem First Paint)

Der Hero-Bereich — das größte Above-the-Fold-Element und das **LCP-Element** — war als React Island mit `client:load` implementiert. Das bedeutete, der Browser musste die gesamte JS-Abhängigkeitskette herunterladen und ausführen, bevor er Hero-Inhalte anzeigen konnte:

```
Islands.js (45KB) → react-dom (373KB) → LanguageContext (47KB) → Hero-Rendering
```

Auf einer 4G-Verbindung dauerte diese Kette über 2,5 Sekunden. Der Nutzer starrte auf einen leeren Bildschirm und wartete darauf, dass JavaScript im Grunde statischen Text renderte.

### Engpass 3: Barrel-Datei zerstört Code-Splitting

Alle 11 React-Komponenten wurden über eine einzelne `Islands.tsx` Barrel-Datei exportiert:

```tsx
export const Navbar = withIsland(NavbarComp);
export const Hero = withIsland(HeroComp);
export const Services = withIsland(ServicesComp);
// ... insgesamt 11 Komponenten
```

Vite bündelte sie in einen einzigen 45KB großen gemeinsamen Chunk. Selbst wenn eine Seite nur die Navbar brauchte, wurde der Code für alle 11 Komponenten heruntergeladen.

---

## Die Optimierungen

### 1. Self-Hosted Schriftarten (Cross-Origin-Verzögerung eliminiert)

**Problem:** Google Fonts CDN = 750ms Render-Blocking + 300ms Schriftarten-Download.

**Lösung:** Das CDN-Link durch `@fontsource`-Pakete für Self-Hosting ersetzt und nur das `latin`-Subset beibehalten.

```diff
- <link href="https://fonts.googleapis.com/css2?family=Outfit..." rel="stylesheet" />
+ import '@fontsource/outfit/latin-400.css';
+ import '@fontsource/outfit/latin-700.css';
```

**Ergebnis:** 28 Schriftdateien → 8 Dateien. Null Cross-Origin-Anfragen. Die Schriftarten werden jetzt von derselben Domain wie das HTML geladen, wodurch DNS-Lookups, TCP-Verbindungen und TLS-Handshakes vollständig entfallen.

---

### 2. Statisches Hero-Rendering (Der größte Gewinn ⭐)

**Problem:** Hero benötigte 465KB+ JS, um statischen Text zu rendern.

**Lösung:** Hero von einem React Island (`client:load`) in eine reine Astro-Komponente (`.astro`) umgewandelt. Da Hero keine Interaktivität hat — keinen State, keine Click-Handler — ist es rein präsentativer Inhalt, der in statisches HTML gehört.

```diff
- <Hero client:load />           <!-- Braucht 465KB JS -->
+ <HeroStatic />                 <!-- Null JS, direktes HTML -->
```

Die Herausforderung war i18n. Der React-Hero nutzte `useLanguage()` für Übersetzungen. Für die statische Version habe ich alle Übersetzungen über `data-i18n`-Attribute eingebettet und ein winziges Inline-Skript (<1KB) hinzugefügt, das auf ein `language-changed` Custom Event von der Navbar Island lauscht:

```html
<h1>
  <span data-i18n="hero.title1" data-i18n-en="Senior Frontend Engineer"
        data-i18n-zh="資深前端工程師" data-i18n-de="Senior Frontend-Entwickler">
    Senior Frontend Engineer
  </span>
</h1>
```

**Ergebnis:** Hero-HTML erscheint in der initialen Server-Antwort. FCP hängt überhaupt nicht mehr von JavaScript ab.

---

### 3. Islands Code-Splitting (Individuelle Einstiegspunkte)

**Problem:** Barrel-Datei erzeugt einen gemeinsamen Chunk für alle Komponenten.

**Lösung:** Individuelle Island-Wrapper-Dateien erstellt, die jeweils nur ihre eigene Komponente importieren:

```diff
- import { Navbar, Services, ... } from "@/components/Islands";
+ import NavbarIsland from '@/components/islands/NavbarIsland';
+ import ServicesIsland from '@/components/islands/ServicesIsland';
```

Jede Datei ist jetzt ein unabhängiger Vite-Einstiegspunkt, der korrektes Tree-Shaking und paralleles Laden ermöglicht.

**Ergebnis:** Der 45KB große gemeinsame `Islands.js`-Chunk wurde vollständig eliminiert.

---

### 4. CSS Code-Splitting (Blog-Styles extrahiert)

**Problem:** Eine einzelne 90KB CSS-Datei enthielt Blog-`.prose`-Styles, die die Homepage nie verwendet.

**Lösung:** ~300 Zeilen `.prose`-Styles in eine separate `prose.css`-Datei extrahiert, die nur in Blog-Layouts importiert wird.

```diff
  /* globals.css — ~300 Zeilen Prose-Styles entfernt */
- .prose pre { ... } .prose h1 { ... } ...
+ /* Verschoben nach src/styles/prose.css */
```

**Ergebnis:** Homepage-CSS von 90KB auf 86KB reduziert. Blog-Styles werden nur auf Blog-Seiten geladen.

---

### 5. Kritisches CSS Inlining (Weißen Blitz eliminiert)

**Problem:** Der First Paint zeigte einen weißen Bildschirm, bis CSS geladen war.

**Lösung:** Drei Änderungen in `BaseLayout.astro`:

**A. Kritisches Theme-Skript** — Läuft synchron im `<head>` vor jedem Rendering:
```javascript
(function() {
  var t = localStorage.getItem('theme');
  var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && d))
    document.documentElement.classList.add('dark');
})();
```

**B. Inline kritisches CSS** — CSS-Variablen und Hintergrundfarben sofort verfügbar:
```css
:root { --bg-critical: #fff7ed; }
.dark { --bg-critical: #0c0a09; }
html, body { background-color: var(--bg-critical) !important; }
```

**C. Theme-color Meta-Tags** — Mobile Browser-UI passt sich dem Theme an:
```html
<meta name="theme-color" content="#fff7ed" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#0c0a09" media="(prefers-color-scheme: dark)" />
```

**Ergebnis:** Der First Paint zeigt jetzt sofort die richtige Hintergrundfarbe (warmes Creme oder Dunkel), ohne weißen Blitz.

---

## Die Ergebnisse

![Lighthouse Mobilgerät Score — 96](/images/blog/lighthouse-de-mobile.png)

![Lighthouse Computer Score — 100](/images/blog/lighthouse-de-desktop.png)

| Metrik | Vorher | Nachher (Mobile) | Nachher (Desktop) | Verbesserung |
|--------|:------:|:-:|:-:|:-:|
| **Score** | ~60 🔴 | **96** 🟢 | **100** 🟢 | +40 |
| **FCP** | 2,9s | **2,2s** | **0,2s** | **14,5×** (Desktop) |
| **LCP** | 3,2s | **2,3s** | **0,3s** | **10,7×** (Desktop) |
| **Speed Index** | 2,9s | **3,2s** | **0,4s** | **7,3×** (Desktop) |
| **TBT** | 0ms | 0ms | 0ms | — |
| **CLS** | — | 0,001 | 0,007 | — |

### Ressourcen-Änderungen

| Ressource | Vorher | Nachher | Änderung |
|-----------|--------|---------|----------|
| Schriftdateien | 28 (CDN) | 8 (self-hosted) | **-71%** |
| Hero JS-Abhängigkeit | 465KB+ | 0KB | **-100%** |
| Islands gemeinsamer Chunk | 45KB | Eliminiert | **-100%** |
| Homepage CSS | 90KB | 86KB | **-4,4%** |
| Render-blockierende Ressourcen | 2 | 1 | **-50%** |

---

## Wichtigste Erkenntnisse

1. **Dein Hero ist dein LCP — blockiere ihn nicht mit JavaScript.** Wenn der Inhalt rein präsentativ ist, rendere ihn als statisches HTML. Diese einzelne Änderung hatte mehr Wirkung als alles andere zusammen.

2. **Barrel-Dateien sind der Feind des Code-Splittings.** Eine einzelne `export *`-Datei macht Vites Tree-Shaking zunichte. Gib jeder Island ihren eigenen Einstiegspunkt.

3. **Self-Hosted Schriftarten >> CDN.** Die Eliminierung von Cross-Origin-Hops ist wichtiger als die Komprimierung von Dateigrößen. Drei DNS/TCP/TLS-Roundtrips summieren sich auf dem Handy schnell.

4. **Inline dein kritisches CSS.** Der Browser muss keine CSS-Datei herunterladen, um die Hintergrundfarbe zu kennen. Schreib es in den `<head>` und der First Paint ist sofort da.

5. **Astro Islands sind mächtig — aber nur bei korrekter Verwendung.** `client:load` sollte Komponenten vorbehalten sein, die beim First Paint wirklich JavaScript benötigen. Alles andere sollte `client:visible`, `client:idle` oder einfach statisch sein.

---

*Performance-Optimierung bedeutet nicht, eine große Sache zu machen — sondern jeden unnötigen Schritt zwischen der Server-Antwort und dem Moment zu eliminieren, in dem der Nutzer den Inhalt sieht. Jede Optimierung in diesem Artikel hat ein Glied aus dieser Kette entfernt.*
