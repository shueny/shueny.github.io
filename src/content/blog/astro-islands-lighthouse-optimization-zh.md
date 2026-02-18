---
title: '從 60 分到 100 分：我如何將 Astro 作品集網站優化到 Lighthouse 滿分'
description: '一個真實案例，記錄如何優化 Astro + React Islands 作品集網站。透過自託管字型、Hero 靜態渲染、Islands 程式碼分割和關鍵 CSS 內聯，將 FCP 從 2.9 秒降至 0.4 秒，Desktop Lighthouse 達到滿分 100。'
pubDate: 2026-02-18
cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
category: 'Engineering & Insights'
draft: false
---

# 從 60 分到 100 分：我如何將 Astro 作品集網站優化到 Lighthouse 滿分

身為前端工程師，你的作品集網站就是你的行動履歷。當我的 Lighthouse 行動版效能分數停在 60 分左右——橘色、平庸、尷尬——我知道必須修好它。經過一輪系統性的優化，我達到了**行動版 96 分**和**桌面版 100 分**，FCP 從 2.9 秒降至 0.2 秒。

以下是我診斷、分析和修復的完整過程。

---

## 起點：問題在哪裡？

Lighthouse 在我的 Astro + React Islands 網站上標記了三個主要瓶頸：

### 瓶頸一：Render-Blocking Google Fonts（750 毫秒延遲）

網站透過同步 `<link>` 標籤從 Google CDN 載入字型，這產生了**三次跨域請求鏈**：

```
HTML → fonts.googleapis.com（CSS）→ fonts.gstatic.com（woff2）→ 渲染
```

光是 CSS 檔案就花了 750 毫秒。28 個字型檔案（涵蓋多語言子集）又增加了約 300 毫秒。這個單一資源就佔了將近 1 秒的渲染阻塞時間。

### 瓶頸二：Hero 依賴 JavaScript（首次繪製前需 465KB+）

Hero 區塊——首屏最大的元素，也是 **LCP 元素**——被實作為使用 `client:load` 的 React Island。這意味著瀏覽器必須下載並執行整段 JS 依賴鏈才能顯示任何 Hero 內容：

```
Islands.js (45KB) → react-dom (373KB) → LanguageContext (47KB) → Hero 渲染
```

在 4G 網路下，這條鏈路耗時超過 2.5 秒。使用者只能盯著空白畫面，等 JavaScript 渲染本質上就是靜態文字的內容。

### 瓶頸三：Barrel File 破壞了程式碼分割

全部 11 個 React 組件都透過一個 `Islands.tsx` barrel file 匯出：

```tsx
export const Navbar = withIsland(NavbarComp);
export const Hero = withIsland(HeroComp);
export const Services = withIsland(ServicesComp);
// ... 共 11 個組件
```

Vite 將它們打包成一個 **45KB 的共享 chunk**。即使頁面只需要 Navbar，也會下載全部 11 個組件的程式碼。

---

## 優化方案

### 一、自託管字型（消除跨域延遲）

**問題：** Google Fonts CDN = 750ms 渲染阻塞 + 300ms 字型下載。

**解法：** 用 `@fontsource` 套件取代 CDN，只保留 `latin` 子集。

```diff
- <link href="https://fonts.googleapis.com/css2?family=Outfit..." rel="stylesheet" />
+ import '@fontsource/outfit/latin-400.css';
+ import '@fontsource/outfit/latin-700.css';
```

**結果：** 28 個字型檔 → 8 個。零跨域請求。字型從同域載入，完全消除了 DNS 查詢、TCP 連線和 TLS 握手。

---

### 二、Hero 靜態渲染（最大的改善 ⭐）

**問題：** Hero 需要 465KB+ 的 JS 才能渲染靜態文字。

**解法：** 將 Hero 從 React Island（`client:load`）轉為純 Astro 組件（`.astro`）。由於 Hero 沒有互動性——沒有狀態、沒有點擊事件——它純粹是展示性內容，屬於靜態 HTML。

```diff
- <Hero client:load />           <!-- 需要 465KB JS -->
+ <HeroStatic />                 <!-- 零 JS，直接 HTML -->
```

難點在於 i18n。React 版 Hero 使用 `useLanguage()` 做翻譯。靜態版改用 `data-i18n` 屬性嵌入所有翻譯，加上一個極小的 inline script（<1KB），監聽 Navbar Island 發出的 `language-changed` 自定義事件：

```html
<h1>
  <span data-i18n="hero.title1" data-i18n-en="Senior Frontend Engineer"
        data-i18n-zh="資深前端工程師" data-i18n-de="Senior Frontend-Entwickler">
    Senior Frontend Engineer
  </span>
</h1>
```

**結果：** Hero HTML 直接出現在伺服器回應中。FCP 完全不依賴 JavaScript。

---

### 三、Islands 程式碼分割（獨立進入點）

**問題：** Barrel file 為所有組件產生一個共享 chunk。

**解法：** 建立獨立的 island 包裝檔案，每個只匯入自己的組件：

```diff
- import { Navbar, Services, ... } from "@/components/Islands";
+ import NavbarIsland from '@/components/islands/NavbarIsland';
+ import ServicesIsland from '@/components/islands/ServicesIsland';
```

每個檔案成為獨立的 Vite 進入點，實現真正的 tree-shaking 和平行載入。

**結果：** 45KB 的共享 `Islands.js` chunk 完全消除。

---

### 四、CSS 程式碼分割（Blog 樣式提取）

**問題：** 90KB 的單一 CSS 檔案包含首頁根本不用的 blog `.prose` 樣式。

**解法：** 將約 300 行 `.prose` 樣式提取至獨立的 `prose.css`，只在 blog 版面匯入。

```diff
  /* globals.css — 移除約 300 行 prose 樣式 */
- .prose pre { ... } .prose h1 { ... } ...
+ /* 搬移至 src/styles/prose.css */
```

**結果：** 首頁 CSS 從 90KB 降至 86KB。Blog 樣式只在 blog 頁面載入。

---

### 五、關鍵 CSS 內聯（消除白色閃爍）

**問題：** 第一幀顯示白色畫面，直到 CSS 載入完成。

**解法：** 在 `BaseLayout.astro` 做三個修改：

**A. 關鍵主題 script** — 在 `<head>` 中同步執行，渲染前完成：
```javascript
(function() {
  var t = localStorage.getItem('theme');
  var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && d))
    document.documentElement.classList.add('dark');
})();
```

**B. 內聯關鍵 CSS** — CSS 變數和背景色立即可用：
```css
:root { --bg-critical: #fff7ed; }
.dark { --bg-critical: #0c0a09; }
html, body { background-color: var(--bg-critical) !important; }
```

**C. Theme-color meta 標籤** — 手機瀏覽器 UI 配色匹配主題：
```html
<meta name="theme-color" content="#fff7ed" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#0c0a09" media="(prefers-color-scheme: dark)" />
```

**結果：** 第一幀立即顯示正確的背景色（暖米色或深色），完全沒有白色閃爍。

---

## 最終成果

![Lighthouse 行動版分數 — 96 分](/images/blog/lighthouse-zh-mobile.png)

![Lighthouse 桌面版分數 — 100 分](/images/blog/lighthouse-zh-desktop.png)

| 指標 | 優化前 | 優化後（行動版）| 優化後（桌面版）| 改善 |
|------|:------:|:-:|:-:|:-:|
| **分數** | ~60 🔴 | **96** 🟢 | **100** 🟢 | +40 |
| **FCP** | 2.9 秒 | **2.2 秒** | **0.2 秒** | **14.5 倍**（桌面版）|
| **LCP** | 3.2 秒 | **2.3 秒** | **0.3 秒** | **10.7 倍**（桌面版）|
| **Speed Index** | 2.9 秒 | **3.2 秒** | **0.4 秒** | **7.3 倍**（桌面版）|
| **TBT** | 0ms | 0ms | 0ms | — |
| **CLS** | — | 0.001 | 0.007 | — |

### 資源變化

| 資源 | 優化前 | 優化後 | 變化 |
|------|--------|--------|------|
| 字型檔案 | 28 個（CDN）| 8 個（自託管）| **-71%** |
| Hero JS 依賴 | 465KB+ | 0KB | **-100%** |
| Islands 共享 chunk | 45KB | 已消除 | **-100%** |
| 首頁 CSS | 90KB | 86KB | **-4.4%** |
| 渲染阻塞資源 | 2 個 | 1 個 | **-50%** |

---

## 關鍵心得

1. **Hero 就是你的 LCP——不要讓它被 JavaScript 擋住。** 如果內容是展示性的，就用靜態 HTML 渲染。這個單一改動的效果比其他所有優化加起來還大。

2. **Barrel file 是程式碼分割的死敵。** 一個 `export *` 就足以摧毀 Vite 的 tree-shaking。給每個 island 自己的進入點。

3. **自託管字型 >> CDN。** 消除跨域 hop 比壓縮檔案大小更有效。在行動網路上，三次 DNS/TCP/TLS 往返累積起來非常可觀。

4. **內聯你的關鍵 CSS。** 瀏覽器不需要下載一個 CSS 檔案才知道背景色。把它放在 `<head>` 裡，第一幀就是即時的。

5. **Astro Islands 很強大——但前提是你要正確使用。** `client:load` 應該保留給第一幀就真正需要 JavaScript 的組件。其他一切都應該用 `client:visible`、`client:idle`，或乾脆做成靜態的。

---

*效能優化不是做一件大事——而是消除伺服器回應和使用者看到內容之間的每一個多餘步驟。這篇文章中的每個優化方案，都移除了那條鏈路上的一個環節。*
