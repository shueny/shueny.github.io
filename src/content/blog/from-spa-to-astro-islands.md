---
title: '實戰筆記：從 SPA 到 Astro Islands 架構的遷移挑戰與解決方案'
description: '深入探討 Astro 與 React 整合時最容易遇到的架構問題：Context 丟失、檔案策略選擇以及 TypeScript 型別定義。'
pubDate: 2025-01-05
cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
category: 'Engineering & Insights'
draft: false
---

**為什麼要做這件事？** 當我決定將作品集從傳統的 SPA（Single Page Application）架構遷移到 Astro Islands 架構時，我面臨了一個關鍵挑戰：如何在保持 React 互動性的同時，獲得 Astro 的極致效能優勢？這個決定背後有強烈的動機：傳統 SPA 雖然開發體驗流暢，但在 SEO 和初始載入效能上存在明顯短板。作為一名前端工程師，我深知在競爭激烈的職場中，作品集的載入速度和 SEO 表現直接影響第一印象。更重要的是，Astro Islands 架構代表了前端效能優化的新方向，掌握這項技術不僅能提升作品集品質，更能證明我具備解決複雜架構問題的能力。然而，遷移過程遠比預期複雜，特別是當 React Context 在 Astro 的孤島架構中「消失」時，我意識到這是一個值得深入探討的技術問題。

最近我正在將個人作品集網站進行改版，從原本的 V1 風格（暗色工程師風）升級為更具雜誌質感的 V2 版本。在過程中，我選擇繼續使用 **Astro** 搭配 **React**，但在處理「全域狀態管理（Context）」與「頁面架構」時，遇到了一些傳統 React 開發者容易忽視的整合陷阱。

這篇文章將分享我在遷移過程中遇到的三個關鍵架構問題，以及如何優雅地解決它們。

## 1. 消失的 Context：Astro Island 的陷阱

### 🛑 問題緣由

在傳統的 React 單頁應用（SPA）或 Next.js 中，我們習慣在最外層（如 `App.tsx` 或 `Layout.tsx`）包裹一個 Context Provider，這樣整個應用程式樹下的任何組件都能讀取到狀態。

但在 Astro 中，這行不通。Astro 採用的是 **「孤島架構 (Island Architecture)」**。

當你使用 `client:load` 指令時，React 組件是被「獨立」掛載到 HTML 上的。這意味著 `Navbar` 和 `Footer` 是兩個完全獨立的 React 實例，它們與外層的 Astro Layout 並沒有共享同一個 React Component Tree，因此**無法讀取上層的 Provider**。

**錯誤的架構嘗試：**

```astro
---
// src/layouts/Layout.astro
import Navbar from '../components/Navbar';
---
<LanguageProvider>
  <Navbar client:load />
  <slot />
</LanguageProvider>
```

這會導致常見的錯誤訊息：Error: useLanguage must be used within a LanguageProvider。

✅ 解決方案：自我包裹 (Self-Wrapping)
最穩定的解法是讓這些獨立的 Island 組件「自給自足」。我們不依賴外層 Layout 提供 Context，而是將 Provider 直接寫進組件檔案內部。

修正後的 src/components/Navbar.tsx：

我們將邏輯拆分為 Content，並匯出一個已經包裹好 Provider 的組件。

```
TypeScript

import React from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

// 1. 內部組件：負責實際的 UI 與邏輯
const NavbarContent: React.FC = () => {
  // 因為被下方的 Provider 包裹，這裡可以安全使用 hook
  const { language, setLanguage } = useLanguage();

  return (
    <nav>
      {/* Navbar UI... */}
      Current Language: {language}
    </nav>
  );
};
```

// 2. 匯出組件：負責提供 Context 環境
// 這樣無論 Astro 把這個組件放在哪裡，它都有自己的 Context

```
const Navbar: React.FC = () => {
return (
<LanguageProvider>
<NavbarContent />
</LanguageProvider>
);
};

export default Navbar;
```

2. 頁面檔案策略：保留 .astro 還是全面轉向 .tsx？
   🛑 抉擇困境
   在重構部落格 (src/pages/blog/[...slug].astro) 時，因為需要大量的資料處理與 UI 渲染，我曾猶豫是否該將整個頁面改寫為 React (.tsx) 檔案，以便統一開發體驗。

✅ 架構分析
經過評估，我決定保留 .astro 作為頁面骨架。理由如下：

Zero JavaScript (效能)：Astro 檔案預設輸出純 HTML。如果改成 .tsx，整個頁面都會進入 React 的 Hydration 流程，增加不必要的 JS 體積。

資料獲取 (Data Fetching)：Astro 的 getStaticPaths 和 getCollection API 在 .astro 檔案中使用最為直觀且強大。

混合模式 (Best of both worlds)：將靜態內容（如文章排版、SEO Meta）交給 Astro，將互動內容（如導航列、按鈕）交給 React。

最終採用的架構：

程式碼片段

---

// src/pages/blog/[...slug].astro
// 1. 在 Server Side 處理資料與路由 (Zero JS)

```
import { getCollection } from 'astro:content';
import Navbar from '@/components/Navbar'; // React Component

export async function getStaticPaths() {
const posts = await getCollection('blog');
return posts.map(post => ({
params: { slug: post.slug },
props: post,
}));
}

const post = Astro.props;
const { Content } = await post.render();

---

<html lang="en">
  <body class="bg-surface">
    <Navbar client:load />

    <main class="pt-32">
       <article class="prose">
         <Content />
       </article>
    </main>

  </body>
</html>
```

3. TypeScript 與 JSX 的嚴格模式挑戰
   🛑 語法錯誤
   在處理部落格列表迴圈時，遇到了兩個常見的 TS/JSX 錯誤：

post 參數隱含 any 類型。

JSX expressions must have one parent element。

錯誤的程式碼：

```TypeScript

{/* 錯誤 1: TS 不知道 post 是什麼，顯示紅色波浪底線 */}
{posts.map((post) => (
  <a href={`/blog/${post.slug}`}>
    {/* 錯誤 2: 三元運算子回傳了多個兄弟節點，JSX 報錯 */}
    {hasCategory ? (
       <span>Icon</span>
       <span>Category Name</span>
    ) : null}
  </a>
))}
```

✅ 程式碼修正
我們引入 Astro 的 CollectionEntry 型別來解決 TS 問題，並使用 React Fragment (<>...</>) 來解決 JSX 結構問題。

修正後的程式碼：

```TypeScript

import type { CollectionEntry } from 'astro:content'; // 引入型別

// ...

{/* ✅ 1. 明確定義型別，解決 any error */}
{posts.map((post: CollectionEntry<'blog'>) => (
  <a href={`/blog/${post.slug}`}>
    {hasCategory ? (
       <> {/* ✅ 2. 使用 Fragment 包裹兄弟節點，解決 Parent Element error */}
         <span>Icon</span>
         <span>Category Name</span>
       </>
    ) : null}
  </a>
))}
```

總結
從這次的 V2 改版中，我深刻體會到 Astro 的核心哲學：「HTML 優先，JS 為輔」。

雖然習慣 React 的開發者可能會覺得 Context 的處理方式有些繁瑣，或者不能全站 .tsx 有點不習慣，但這些架構上的限制其實是為了換取更快的載入速度與更好的 SEO。透過「自我包裹」組件與正確的檔案分工，我們完全可以在享受 React 互動性的同時，保有 Astro 的極致效能。
