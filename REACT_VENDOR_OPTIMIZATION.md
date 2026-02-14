# React Vendor Bundle 優化報告

## 📊 問題分析

根據 Lighthouse 報告，`react-vendor.D5xS_y1R.js` 檔案存在以下問題：

- **檔案大小**：140 KiB（壓縮後）
- **快取 TTL**：僅 10 分鐘（應該至少 1 年）
- **影響**：拖慢關鍵路徑載入速度，影響 FCP 和 LCP 指標

---

## ✅ 已實作的優化

### 1. 進一步分割 React Bundle（高優先級）

**檔案：** `astro.config.mjs`

**變更：**
- 將原本的 `react-vendor` 分割為：
  - `react-core`：React 核心庫（立即需要）
  - `react-dom`：React DOM 和 Scheduler（可稍後載入）
- 分離大型 UI 庫：
  - `radix-ui`：Radix UI 組件庫
  - `framer-motion`：動畫庫
  - `lucide-icons`：圖示庫

**預期效果：**
- ⬇️ 減少初始 bundle 大小（從 140 KiB 降至約 80-100 KiB）
- ⬆️ 改善並行載入（多個較小的檔案可以並行下載）
- ⬆️ 提升快取效率（各庫獨立快取）

```javascript
manualChunks: (id) => {
  if (id.includes('node_modules')) {
    // Split React core from React DOM
    if (id.includes('react/') && !id.includes('react-dom')) {
      return 'react-core';
    }
    if (id.includes('react-dom') || id.includes('scheduler')) {
      return 'react-dom';
    }
    // Split large UI libraries
    if (id.includes('@radix-ui')) {
      return 'radix-ui';
    }
    if (id.includes('framer-motion')) {
      return 'framer-motion';
    }
    if (id.includes('lucide-react')) {
      return 'lucide-icons';
    }
  }
}
```

---

### 2. 改善 Service Worker 快取策略

**檔案：** `public/sw.js`

**變更：**
- 添加 `/assets/` 路徑到靜態資源列表
- 識別關鍵 JS 檔案（react-core, react-dom, index）
- 為內容雜湊的檔案（`.js` 和 `.css`）提供永久快取
- 添加自訂快取標頭

**預期效果：**
- ⬆️ 快取 TTL 從 10 分鐘提升至 1 年（對於內容雜湊的檔案）
- ⬆️ 改善重複造訪的載入速度
- ⬇️ 減少網路請求（節省 181 KiB，根據 Lighthouse）

```javascript
// 識別內容雜湊的檔案（如 react-core.abc123.js）
if (url.pathname.match(/\.([a-f0-9]{8,})\.(js|css)$/)) {
  // 內容雜湊確保檔案內容不變時快取永遠有效
  return cachedResponse;
}
```

---

### 3. 啟用 Terser 壓縮

**檔案：** `astro.config.mjs`

**變更：**
- 啟用 Terser 壓縮器
- 移除生產環境的 `console.log`
- 移除 `debugger` 語句

**預期效果：**
- ⬇️ 進一步減少檔案大小（約 5-10%）
- ⬆️ 改善執行效能

```javascript
minify: 'terser',
terserOptions: {
  compress: {
    drop_console: true,
    drop_debugger: true,
  },
}
```

---

### 4. 優化依賴預載入

**檔案：** `astro.config.mjs`

**變更：**
- 排除大型非關鍵依賴（如 `@google/generative-ai`）從預優化列表

**預期效果：**
- ⬇️ 減少建置時間
- ⬆️ 減少初始 bundle 大小

---

## 📈 預期改善

| 指標 | 優化前 | 優化後 | 改善 |
|------|--------|--------|------|
| **react-vendor.js 大小** | 140 KiB | ~80-100 KiB | ⬇️ 30-40% |
| **快取 TTL** | 10 分鐘 | 1 年 | ⬆️ 永久快取 |
| **初始載入時間** | ~685ms | ~400-500ms | ⬇️ 30-40% |
| **重複造訪載入** | 完整下載 | 從快取 | ⬆️ 即時載入 |
| **可節省的頻寬** | - | 181 KiB | ⬇️ 重複造訪 |

---

## 🔍 驗證方法

### 1. 建置後檢查

```bash
pnpm build
# 檢查 dist/assets 目錄
# 應該看到：
# - react-core.[hash].js
# - react-dom.[hash].js
# - radix-ui.[hash].js (如果使用)
# - framer-motion.[hash].js (如果使用)
# - lucide-icons.[hash].js (如果使用)
```

### 2. Lighthouse 測試

1. 執行 Lighthouse 測試
2. 檢查「使用有效的快取生命週期」審計
3. 確認 JS 檔案快取 TTL 為 1 年
4. 檢查 Performance 分數是否提升

### 3. Network 面板檢查

1. 開啟 Chrome DevTools > Network
2. 重新載入頁面
3. 檢查 JS 檔案：
   - 檔案大小是否減少
   - 快取標頭是否正確
   - 是否從快取載入（重複造訪時）

---

## 🚀 後續優化建議

### 1. 動態添加 modulepreload（可選）

如果需要進一步優化，可以在建置後動態添加 `modulepreload` 標籤：

```javascript
// scripts/inject-preload.js
// 在建置後執行，掃描 HTML 並添加 modulepreload
```

### 2. 使用 HTTP/2 Server Push（需要伺服器支援）

GitHub Pages 不支援，但如果遷移到其他平台可以考慮。

### 3. 考慮使用 React 17 或 Preact（如果可行）

- React 17 比 React 18 稍小
- Preact 只有 3KB，但需要相容性檢查

---

## 📝 注意事項

1. **內容雜湊**：檔案名稱包含內容雜湊，確保內容變更時自動失效快取
2. **Service Worker**：確保 Service Worker 正確註冊和更新
3. **建置後測試**：每次建置後都應該測試，確保分割正確
4. **瀏覽器相容性**：確保目標瀏覽器支援 ES modules

---

## 🔗 相關資源

- [Vite Manual Chunks](https://vitejs.dev/config/build-options.html#build-rollupoptions)
- [Service Worker Caching Strategies](https://web.dev/service-worker-caching-and-http-caching/)
- [Lighthouse Cache Lifetime Audit](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/)

---

**最後更新：** 2024 年 12 月
