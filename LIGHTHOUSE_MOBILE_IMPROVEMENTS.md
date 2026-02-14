# Lighthouse Mobile 分數提升建議

## 📊 目前狀態

根據 `MOBILE_PAGESPEED_OPTIMIZATIONS.md`，專案已經實作了以下優化：

✅ **已完成：**
- 移除 Render-Blocking 資源（非同步字體載入）
- 修復強制自動重排（requestAnimationFrame）
- Service Worker 快取策略
- React.lazy 動態導入
- 程式碼分割與內容雜湊
- CSS 內聯

---

## 🎯 進一步優化建議

### 1. 圖片優化（高優先級）

#### 問題
- 目前圖片使用 JPG/PNG 格式，檔案較大
- 沒有使用現代圖片格式（WebP/AVIF）
- 缺少響應式圖片（srcset）
- 沒有圖片尺寸優化

#### 建議實作

**1.1 使用 Astro Image 優化**

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero image"
  formats={['avif', 'webp']}
  loading="eager"
  fetchpriority="high"
/>
```

**1.2 為現有圖片添加響應式 srcset**

```tsx
// 在 ProjectsGrid.tsx 中
<picture>
  <source
    srcSet={`${bannerImage.replace('.jpg', '.webp')}`}
    type="image/webp"
  />
  <source
    srcSet={`${bannerImage.replace('.jpg', '.avif')}`}
    type="image/avif"
  />
  <img
    src={bannerImage}
    alt={`${project.title} banner`}
    loading="lazy"
    decoding="async"
  />
</picture>
```

**1.3 使用 Sharp 自動轉換圖片格式**

在 `astro.config.mjs` 中：
```javascript
import sharp from 'sharp';

export default defineConfig({
  // Astro 會自動使用 Sharp 優化圖片
  // 確保 sharp 已安裝：pnpm add sharp
});
```

**預期改善：**
- ⬇️ 減少圖片大小 30-50%
- ⬆️ 改善 LCP 分數
- ⬆️ 減少頻寬使用

---

### 2. 字體優化（中優先級）

#### 目前狀態
- ✅ 已實作非同步載入
- ✅ 已使用 `font-display: swap`（在 Google Fonts URL 中）
- ⚠️ 可以進一步優化字體子集化

#### 建議實作

**2.1 使用字體子集化（Subsetting）**

在 Google Fonts URL 中添加 `&text=` 參數來只載入需要的字符：

```astro
<!-- 只載入需要的字符 -->
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Noto+Sans+TC:wght@400;500;700&text=ShuenyWangSeniorFrontendEngineer&display=swap"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

**2.2 預載入關鍵字體檔案**

已在 `base-head.astro` 中實作，但可以檢查是否所有關鍵字體都已預載入。

**預期改善：**
- ⬇️ 減少字體檔案大小 20-40%
- ⬆️ 改善 FCP 分數

---

### 3. 資源提示優化（中優先級）

#### 建議添加

**3.1 預載入關鍵資源**

```astro
<!-- 在 base-head.astro 中添加 -->
<!-- 預載入首屏關鍵圖片 -->
<link
  rel="preload"
  href="/images/hero-image.webp"
  as="image"
  fetchpriority="high"
/>

<!-- 預載入關鍵 JavaScript -->
<link
  rel="modulepreload"
  href="/assets/react-vendor.[hash].js"
/>
```

**3.2 預取非關鍵資源**

```astro
<!-- 預取可能需要的資源 -->
<link
  rel="prefetch"
  href="/blog"
  as="document"
/>
```

**預期改善：**
- ⬆️ 改善導航時間
- ⬆️ 減少載入延遲

---

### 4. JavaScript 優化（中優先級）

#### 建議實作

**4.1 使用 `client:visible` 或 `client:idle`**

對於非關鍵的 React 組件，使用 Astro 的 `client` 指令：

```astro
---
import MyComponent from '../components/MyComponent';
---

<MyComponent client:visible />
```

**4.2 優化第三方套件載入**

檢查是否有大型第三方套件可以延遲載入：

```typescript
// 延遲載入大型套件
const loadHeavyLibrary = () => import('heavy-library');
```

**預期改善：**
- ⬇️ 減少初始 JavaScript 大小
- ⬆️ 改善 TBT 分數

---

### 5. Service Worker 優化（低優先級）

#### 目前狀態
- ✅ 已實作基本的快取策略
- ⚠️ 可以添加預快取關鍵資源

#### 建議實作

**5.1 預快取關鍵資源**

```javascript
// 在 sw.js 的 install 事件中
const CRITICAL_ASSETS = [
  '/',
  '/fonts/calsans-semibold.woff2',
  '/images/hero-image.webp',
  // ... 其他關鍵資源
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
  self.skipWaiting();
});
```

**預期改善：**
- ⬆️ 改善離線體驗
- ⬆️ 減少重複造訪的載入時間

---

### 6. 圖片尺寸與格式檢查（高優先級）

#### 建議檢查項目

1. **檢查圖片檔案大小**
   ```bash
   # 找出大於 200KB 的圖片
   find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -size +200k
   ```

2. **壓縮現有圖片**
   - 使用工具如 `imagemin` 或線上工具壓縮圖片
   - 目標：JPG < 100KB，PNG < 200KB（視用途而定）

3. **轉換為現代格式**
   - 將 JPG 轉換為 WebP（減少 25-35% 大小）
   - 將 PNG 轉換為 AVIF（減少 50%+ 大小）

---

### 7. 移除未使用的 CSS/JavaScript（中優先級）

#### 建議實作

**7.1 使用 PurgeCSS**

Tailwind 已自動處理，但可以檢查是否有未使用的自訂 CSS。

**7.2 檢查 bundle 大小**

```bash
# 建置後檢查 bundle 大小
pnpm build
# 檢查 dist/assets 目錄中的檔案大小
```

**預期改善：**
- ⬇️ 減少 CSS/JS 大小
- ⬆️ 改善載入時間

---

### 8. 核心 Web Vitals 優化

#### LCP (Largest Contentful Paint)

1. **優化 LCP 元素**
   - 確保 Hero 圖片使用 `fetchpriority="high"`
   - 預載入 LCP 圖片
   - 使用適當的圖片尺寸（不要載入過大的圖片）

2. **減少 LCP 延遲**
   - 移除阻塞 LCP 的資源
   - 優化伺服器回應時間（使用 CDN）

#### CLS (Cumulative Layout Shift)

1. **為圖片設定尺寸**
   ```html
   <img
     src="image.jpg"
     width="800"
     height="600"
     alt="Description"
   />
   ```

2. **為動態內容預留空間**
   - 使用 skeleton loaders
   - 設定 min-height

#### TBT (Total Blocking Time)

1. **減少長時間任務**
   - 使用 Web Workers 處理複雜計算
   - 將任務分解為較小的 chunks

---

## 🚀 實作優先順序

### 高優先級（立即實作）
1. ✅ 圖片優化（轉換為 WebP/AVIF）
2. ✅ 為圖片添加 width/height 屬性
3. ✅ 檢查並壓縮大型圖片檔案

### 中優先級（近期實作）
4. ⚠️ 資源提示優化（preload/prefetch）
5. ⚠️ 字體子集化
6. ⚠️ JavaScript 延遲載入優化

### 低優先級（長期優化）
7. 📋 Service Worker 預快取
8. 📋 移除未使用的程式碼
9. 📋 進階快取策略

---

## 📈 預期改善

| 指標 | 目前 | 目標 | 改善方法 |
|------|------|------|----------|
| **Performance** | 85-95 | 95-100 | 圖片優化、資源提示 |
| **LCP** | ~2.0s | <1.5s | 圖片優化、預載入 |
| **FCP** | ~1.2s | <1.0s | 資源提示、字體優化 |
| **TBT** | ~200ms | <150ms | JavaScript 優化 |
| **CLS** | ~0.05 | <0.03 | 圖片尺寸、預留空間 |

---

## 🔧 工具與資源

### 檢查工具
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools Lighthouse

### 優化工具
- [Squoosh](https://squoosh.app/) - 圖片壓縮
- [ImageOptim](https://imageoptim.com/) - 批次圖片優化
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - 分析 bundle 大小

### 參考資源
- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Web.dev - Preload Critical Assets](https://web.dev/preload-critical-assets/)
- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)

---

**最後更新：** 2024 年 12 月
