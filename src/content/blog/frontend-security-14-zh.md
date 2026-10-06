---
title: '前端資安學習筆記：用 14 個動畫看懂常見攻擊與防禦'
description: '從 XSS、CSRF、Token 儲存到 CSP，把前端最常見的 14 個資安問題拆成「攻擊者怎麼想 → 根本原因 → 正確做法」，每一題都附一個可以一步步點的互動動畫。'
pubDate: 2026-10-06
cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
category: 'Engineering & Insights'
lang: 'zh'
draft: false
---

# 前端資安學習筆記：用 14 個動畫看懂常見攻擊與防禦

前端工程師很常覺得「資安是後端的事」。但實際上，大部分攻擊最後都發生在**瀏覽器裡**：惡意腳本在使用者的分頁執行、Cookie 被瀏覽器自動帶出去、金鑰被打包進 bundle 送到每個人手上。

這篇是我整理前端資安概念時的學習筆記。我把最常見的 14 個問題各做成一個互動動畫，每個動畫都用同一個結構：

1. **五個步驟**：一步步看攻擊怎麼發生，每一步附上「駭客觀點」，說明攻擊者當下在想什麼。
2. **根本原因**：為什麼這件事會發生。
3. **正確做法**：實際可以用的修正程式碼。

下面是全部 14 個動畫的目錄，可以直接點進去玩：

<iframe
  src="/security/index.html"
  title="前端資安動畫目錄"
  style="width:100%;aspect-ratio:960/680;border:0"
  loading="lazy"
></iframe>

---

## 先建立心智模型：四類問題

14 個問題看起來很雜，但歸納起來只有四種根本原因。先記住這四類，遇到新的漏洞時也比較容易判斷它屬於哪一種。

| 類別 | 核心觀念 | 包含的主題 |
| --- | --- | --- |
| **A. 注入與執行** | 瀏覽器分不出「資料」和「程式碼」 | 01 XSS、03 Token 儲存、14 CSP |
| **B. 瀏覽器的自動行為被濫用** | 瀏覽器會「好心」幫你帶 Cookie、嵌入頁面、跟著跳轉 | 02 CSRF、11 CORS、12 Clickjacking、13 Open Redirect |
| **C. 信任邊界放錯地方** | 送到瀏覽器的東西都是公開的，前端的檢查都能被繞過 | 04 前端授權、07 硬編碼機密、08 Console Log、09 Source Map |
| **D. 供應鏈與傳輸** | 你信任的程式碼，在送到使用者之前可能已經被換掉 | 05 供應鏈攻擊、06 CDN SRI、10 混合內容 |

一句話總結：**永遠不要信任來自使用者端的任何東西，也不要把秘密交給使用者端。**

---

## A. 注入與執行

### 01 XSS 跨站腳本攻擊

> 留言板沒有過濾輸入，讓惡意程式碼在別人的瀏覽器裡執行。

**攻擊流程**

1. 攻擊者在留言框輸入一段 `<script>`，正常送出。
2. 伺服器沒有過濾，整段存進資料庫（這就是「儲存型 XSS」）。
3. 其他使用者打開頁面，瀏覽器把留言當成 HTML 解析，腳本跟著執行。
4. 腳本讀取 `document.cookie`，偷偷送到攻擊者的伺服器。
5. 攻擊者拿著 session 冒充登入，連雙因素驗證都繞過了。

**根本原因**：伺服器把使用者輸入原封不動輸出成 HTML，瀏覽器分不出這是「內容」還是「程式碼」。

**正確做法**

```js
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
res.send('<div>' + escapeHtml(comment) + '</div>');
```

補充：

- XSS 有三種：**儲存型**（存進資料庫）、**反射型**（藏在網址參數裡）、**DOM 型**（前端 JS 自己把資料塞進 `innerHTML`）。
- React / Vue 的 `{value}` 綁定預設會跳脫，危險的是 `dangerouslySetInnerHTML`、`v-html`、`innerHTML`，以及 `<a href={userInput}>`（`javascript:` 開頭的網址照樣會執行）。
- 真的需要顯示使用者提供的 HTML（例如富文字編輯器），用 [DOMPurify](https://github.com/cure53/DOMPurify) 這類函式庫消毒，不要自己寫正規表達式。

▶ [看 XSS 動畫](/security/01-xss.html)

### 03 Token 儲存：localStorage vs httpOnly Cookie

> 同一段惡意腳本，遇到不同的儲存方式，結果完全不同。

這個動畫是左右對照：同樣一個 XSS，token 放在 `localStorage` 會被一行 `localStorage.getItem('token')` 直接讀走；放在 `httpOnly` Cookie 裡，JavaScript 根本讀不到。

**根本原因**：`localStorage` 對頁面上所有 JavaScript 完全開放，只要有一個 XSS 縫隙，token 就沒了。

**正確做法**

```js
res.cookie('token', jwt, {
  httpOnly: true,    // JS 讀不到
  secure: true,      // 只走 HTTPS
  sameSite: 'strict' // 不跟著跨站請求送出（同時防 CSRF）
});
```

補充：`httpOnly` 是**降低損害**，不是阻止 XSS。腳本雖然偷不走 token，但還是能在當下以使用者身分發請求。所以它要跟 XSS 防護、CSP 一起用。另外改用 Cookie 之後就要開始考慮 CSRF（見 02）。

▶ [看 Token 儲存動畫](/security/03-token-storage.html)

### 14 CSP 內容安全政策

> CSP 是防 XSS 最有效的第二道防線，但很多專案根本沒設定。

就算某個地方漏掉跳脫、讓惡意腳本混進頁面，CSP 也能告訴瀏覽器：「只執行我允許的腳本、只連線到我允許的網域」。沒有 CSP 的話，瀏覽器預設不會限制腳本能不能對外連線。

**正確做法**

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-r4nd0mBase64'
```

補充：

- `nonce` 每次回應都要重新產生一組隨機值，並加在合法的 `<script nonce="...">` 上，攻擊者注入的腳本沒有 nonce，就不會執行。
- 避免 `'unsafe-inline'` 和 `'unsafe-eval'`，加了等於把門打開一半。
- 上線前先用 `Content-Security-Policy-Report-Only` 觀察一段時間，確認不會擋到正常功能再正式啟用。
- `connect-src` 可以限制 `fetch` 能連到哪裡，就算腳本跑起來，也很難把資料送出去。

▶ [看 CSP 動畫](/security/14-csp.html)

---

## B. 瀏覽器的自動行為被濫用

### 02 CSRF 跨站請求偽造

> 瀏覽器自動附上的登入憑證，被別的網站拿去偽造請求。

**攻擊流程**

1. 使用者登入銀行，瀏覽器保存了登入 Cookie。
2. 使用者在另一個分頁打開攻擊者的頁面（廣告、釣魚信都行）。
3. 頁面裡藏了一個自動送出的轉帳表單，目標是 `bank.com/transfer`。
4. 瀏覽器照規矩把銀行的 Cookie 一起送出。這是瀏覽器的**正常行為**，不是漏洞。
5. 銀行看到有效的 Cookie，以為是本人操作，執行轉帳。

**根本原因**：伺服器只檢查「有沒有登入 Cookie」，沒檢查請求是不是使用者在自己網站上主動發出的。

**正確做法**

```js
// Cookie 加上 SameSite
res.cookie('session', token, { httpOnly: true, sameSite: 'strict', secure: true });

// 重要操作另外驗證一組隨機 Token
app.post('/transfer', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('CSRF token 不符');
  }
  doTransfer(req.body);
});
```

補充：現代瀏覽器沒設定時預設是 `SameSite=Lax`，擋掉了大部分跨站 POST，但**用 GET 做有副作用的操作**（例如 `GET /delete?id=1`）還是會中招。原則是：會改資料的操作一律不要用 GET，並在伺服器檢查 `Origin` 標頭。

▶ [看 CSRF 動畫](/security/02-csrf.html)

### 11 CORS 設定過寬

> `Access-Control-Allow-Origin: *` 等於對任何網站開門。

**攻擊流程**

1. 使用者已經登入你的網站。
2. 使用者在同一個瀏覽器打開了惡意網站。
3. 惡意網站用 `fetch(url, { credentials: 'include' })` 對你的 API 發出跨網域請求。
4. 你的伺服器對任何來源都放行。
5. 惡意網站拿到帶有使用者身分的私人資料。

**根本原因**：CORS 是用來**放寬**同源政策的。設定太寬，等於讓任何網站都能用使用者的身分讀你的 API。

**正確做法**：用白名單，不要用萬用字元。

```js
const allowedOrigins = ['https://yourapp.com', 'https://admin.yourapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('不在允許清單內'));
  },
  credentials: true,
}));
```

補充（動畫為了好懂做了簡化）：瀏覽器其實**不允許** `Allow-Origin: *` 搭配 `Allow-Credentials: true`，這個組合會直接被擋。實務上真正出事的寫法是「**把請求的 `Origin` 原封不動回傳**」再加上 `credentials: true`，效果跟萬用字元一樣，而且瀏覽器不會擋。另外要小心允許 `null` origin，以及用 `endsWith('yourapp.com')` 這種會被 `evil-yourapp.com` 騙過的比對方式。

▶ [看 CORS 動畫](/security/11-cors-wildcard.html)

### 12 Clickjacking 點擊劫持

> 你看到的按鈕，跟你實際點到的按鈕，可能根本不是同一個。

**攻擊流程**

1. 攻擊者做了一個「立即領取優惠」的誘餌頁面。
2. 在按鈕位置疊上一個完全透明（`opacity: 0`）的 iframe，裡面是銀行的「確認轉帳」按鈕。
3. 使用者點了優惠按鈕。
4. 點擊穿透到下層，觸發了看不見的轉帳按鈕。
5. 轉帳在使用者完全不知情的狀況下完成。

**根本原因**：網站沒有限制自己能不能被別人用 iframe 嵌入。

**正確做法**

```http
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
```

補充：`frame-ancestors` 是新標準，`X-Frame-Options` 是給舊瀏覽器的備援，兩個都加最保險。要注意 `frame-ancestors` **只能用 HTTP 標頭設定**，寫在 `<meta>` 裡不會生效。

▶ [看 Clickjacking 動畫](/security/12-clickjacking.html)

### 13 開放重導向 Open Redirect

> 先跳到一個真的網站建立信任，再被悄悄導去別的地方。

**攻擊流程**

1. 使用者收到信，連結開頭是真正的官方網域。
2. 網址參數裡夾帶了重導向目的地：`?redirect=https://evil-fake-bank.com`。
3. 點擊後先跳到真的官方網站，建立信任感。
4. 網站沒驗證目的地，直接把使用者導走。
5. 使用者在一模一樣的假登入頁輸入帳密。

**根本原因**：重導向目的地完全信任使用者傳入的參數。

**正確做法**：只允許白名單內的路徑。

```js
const allowedPaths = ['/dashboard', '/profile', '/settings'];

app.get('/login', (req, res) => {
  const target = req.query.redirect;
  if (allowedPaths.includes(target)) return res.redirect(target);
  return res.redirect('/dashboard'); // 不信任的一律導回預設頁
});
```

補充：如果不能用白名單，至少要用 `new URL(target, location.origin)` 解析後比對 `origin`。只檢查「是不是 `/` 開頭」不夠，`//evil.com` 和 `/\evil.com` 都會被瀏覽器當成外部網址。

▶ [看 Open Redirect 動畫](/security/13-open-redirect.html)

---

## C. 信任邊界放錯地方

### 04 前端做權限判斷，後端沒有再驗證

> 把按鈕藏起來不代表安全。

**攻擊流程**

1. 前端判斷使用者不是管理員，把「刪除使用者」按鈕藏起來。
2. 使用者打開開發者工具，看到 API 路徑。
3. 跳過介面，直接用 `fetch` 呼叫 API。
4. 後端沒有再檢查權限，直接執行刪除。
5. 寫成迴圈對 `/api/users/1` 到 `/api/users/999` 批次執行。

**根本原因**：權限判斷只做在前端，後端完全信任每一個請求。

**正確做法**

```js
app.delete('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('沒有權限');
  deleteUser(req.params.id);
});
```

補充：除了「你是不是管理員」，還要檢查「**這筆資料是不是你的**」。只驗登入、不驗擁有者，改網址上的 id 就能看到別人的資料，這叫 IDOR（Insecure Direct Object Reference），是 OWASP 排名第一的「權限控制失效」裡最常見的一種。前端的權限判斷只是為了使用者體驗。

▶ [看前端授權動畫](/security/04-frontend-only-authz.html)

### 07 敏感資訊寫死在前端程式碼

> 只要送到瀏覽器的東西，任何人都拿得到。

**攻擊流程**

1. 開發者把 `const API_KEY = "sk-live-..."` 寫在前端。
2. 打包壓縮後上線。壓縮只會縮短變數名稱，**不會加密字串**。
3. 任何人打開開發者工具的 Sources 分頁。
4. 金鑰完整顯示，直接複製。
5. 攻擊者用你的金鑰刷你的 API 額度。

**根本原因**：前端程式碼會完整送到使用者的瀏覽器，寫在裡面的字串都等於公開。

**正確做法**：前端呼叫自己的後端，金鑰留在伺服器的環境變數。

```js
// ✅ 前端
fetch('/api/ask');

// ✅ 後端
app.get('/api/ask', async (req, res) => {
  const r = await fetch('https://api.openai.com/v1/...', {
    headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
  });
  res.json(await r.json());
});
```

補充：

- `VITE_`、`NEXT_PUBLIC_`、`PUBLIC_` 開頭的環境變數會**被打包進前端**，不能放秘密。
- 有些金鑰本來就設計成公開的（例如 Stripe publishable key、Firebase config），安全性要靠後端規則和網域限制。
- 金鑰一旦外洩，刪掉程式碼沒用，Git 歷史還在，要**立刻撤銷並換新**。

▶ [看硬編碼機密動畫](/security/07-hardcoded-secrets.html)

### 08 Console Log 洩漏敏感資訊

> 為了除錯留下的一行 log，上線後變成公開的資料窗口。

開發時留下的 `console.log('user data:', userData)` 忘了刪，任何人打開 Console 就能看到個資、角色、內部備註，還能藉此推測後端的資料結構，作為下一步攻擊的線索。

**根本原因**：除錯訊息沒有跟著環境切換。

**正確做法**：在建置階段自動移除。

```js
// webpack（Terser）
optimization: {
  minimizer: [new TerserPlugin({
    terserOptions: { compress: { drop_console: true } },
  })],
}

// Vite（esbuild）
export default defineConfig({
  esbuild: { drop: ['console', 'debugger'] },
});
```

補充：比起事後移除，更好的做法是用有分級的 logger（只在開發環境輸出 debug），並加上 ESLint 的 `no-console` 規則，在 code review 前就擋下來。

▶ [看 Console Log 動畫](/security/08-console-log.html)

### 09 Source Map 暴露原始程式碼

> 程式碼看起來已經混淆過了，但一個 `.map` 檔案就能整個還原。

**攻擊流程**

1. 建置工具把程式碼壓縮成 `function a(b){return b.c+b.d}`。
2. 部署時 `main.abc123.js.map` 也一起上線了。
3. 開發者工具原生就會載入 `.map`，不需要額外工具。
4. 程式碼被還原成 `calculateDiscount(price, rate)`，連註解都在。
5. 攻擊者讀懂邏輯，找出漏洞（例如沒檢查折扣上限）。

**根本原因**：`.map` 就是原始碼和混淆碼之間的完整對照表。

**正確做法**

```js
// webpack
module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};

// Vite（預設就是 false）
export default defineConfig({ build: { sourcemap: false } });
```

補充：如果需要在錯誤追蹤服務（例如 Sentry）看到原始行號，用 `'hidden'` 產生 source map 但不在 JS 裡引用，並上傳到錯誤追蹤服務後從部署檔案中刪掉。另外要記得：就算沒有 source map，前端程式碼還是讀得懂，**不要把安全性建立在「看不懂」上**。

▶ [看 Source Map 動畫](/security/09-source-map.html)

---

## D. 供應鏈與傳輸

### 05 第三方套件供應鏈攻擊

> 你信任的套件，可能又依賴著一個你完全不認識、已經被入侵的套件。

**攻擊流程**

1. 專案裝了 `popular-lib`，它底下又依賴了幾十層套件。
2. 某個冷門但用量大的深層套件，維護者帳號被盜。
3. 攻擊者發布新版本，偷偷加入只在正式環境觸發的竊取程式碼。
4. 你執行 `npm install`，`^` 版號規則讓專案自動升級到惡意版本。
5. 惡意程式碼隨建置進入網站，在每一位使用者的瀏覽器執行。

**根本原因**：專案信任了整條依賴鏈，卻無法逐一審查每一層的每一次更新。

**正確做法**

```bash
# 用 lockfile 精確安裝，不自動跳版本
npm ci

# CI 裡加自動掃描
npm audit
# 或啟用 GitHub Dependabot（.github/dependabot.yml）自動開 PR 修補
```

補充：lockfile 一定要 commit；新增套件前看一下下載量、維護狀態和依賴數量；可以考慮 `npm install --ignore-scripts` 防止 `postinstall` 腳本在安裝時就執行。實際案例像 `event-stream`（2018）、`ua-parser-js`（2021）都是這種模式。

▶ [看供應鏈攻擊動畫](/security/05-supply-chain.html)

### 06 CDN 資源缺少 SRI 完整性驗證

> 外部 CDN 被入侵、檔案被偷換時，SRI 是最後一道防線。

這個動畫是左右對照：同樣是 CDN 上的檔案被換掉，沒有 `integrity` 的頁面照單全收；有 SRI 的頁面，瀏覽器發現雜湊值對不上就拒絕執行。

**根本原因**：少了 `integrity` 屬性，瀏覽器不會比對檔案內容。

**正確做法**

```html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-..."
  crossorigin="anonymous">
</script>
```

補充：雜湊值可以這樣產生：

```bash
openssl dgst -sha384 -binary lib.js | openssl base64 -A
```

`crossorigin="anonymous"` 不能省，不然瀏覽器無法做比對。SRI 只適合**版本固定**的檔案，像 `lib@latest` 或會依瀏覽器回傳不同內容的資源就不能用，這時比較好的做法是把檔案下載下來自己託管。

▶ [看 CDN SRI 動畫](/security/06-cdn-sri.html)

### 10 未強制 HTTPS／混合內容

> 頁面主體是加密的，但一個沒加密的小資源就能被攔截。

**攻擊流程**

1. 使用者在咖啡廳的公共 WiFi 瀏覽 HTTPS 網站。
2. 頁面裡有一張圖片用 `http://` 載入（少了一個 s）。
3. 同一個 WiFi 裡的攻擊者攔截這個未加密的請求。
4. 攻擊者竊聽，或把內容整個換掉。
5. 一個破口，讓整頁的加密防護失效。

**根本原因**：只要有一個資源走 HTTP，那個資源的傳輸過程就完全沒有加密。

**正確做法**

```http
Content-Security-Policy: upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

補充：`upgrade-insecure-requests` 會把頁面內的 `http://` 請求自動升級成 `https://`；`Strict-Transport-Security`（HSTS）則讓瀏覽器記住「這個網站只能用 HTTPS」，連第一次輸入 `http://` 都會自動改走 HTTPS。現代瀏覽器對混合的腳本會直接封鎖，但最根本的還是把所有資源網址都改成 `https://`。

▶ [看混合內容動畫](/security/10-mixed-content.html)

---

## 總整理：一張表看完 14 個問題

| # | 主題 | 根本原因 | 第一個要做的防禦 |
| --- | --- | --- | --- |
| 01 | XSS | 輸入被當成 HTML 執行 | 輸出時跳脫、不用 `innerHTML` |
| 02 | CSRF | 瀏覽器自動帶 Cookie | `SameSite` + CSRF Token |
| 03 | Token 儲存 | `localStorage` 對 JS 開放 | `httpOnly` Cookie |
| 04 | 前端授權 | 後端沒有驗證權限 | 後端每個 API 都檢查角色與擁有者 |
| 05 | 供應鏈攻擊 | 自動升級到被入侵的版本 | `npm ci` + lockfile + Dependabot |
| 06 | CDN SRI | 不比對外部檔案內容 | `integrity` + `crossorigin` |
| 07 | 硬編碼機密 | 前端程式碼是公開的 | 金鑰只放後端環境變數 |
| 08 | Console Log | 除錯訊息帶到正式環境 | 建置時 `drop_console` |
| 09 | Source Map | `.map` 檔一起上線 | 正式環境關閉 source map |
| 10 | 混合內容 | 部分資源走 HTTP | `upgrade-insecure-requests` + HSTS |
| 11 | CORS | 對任何來源放行 | Origin 白名單 |
| 12 | Clickjacking | 頁面可以被任意嵌入 | `frame-ancestors 'none'` |
| 13 | Open Redirect | 信任使用者傳入的網址 | 重導向路徑白名單 |
| 14 | CSP | 瀏覽器不限制腳本來源 | `script-src` + nonce |

## 上線前檢查清單

- [ ] 所有使用者輸入在輸出時都有跳脫，沒有直接用 `innerHTML` / `dangerouslySetInnerHTML` / `v-html`
- [ ] 登入憑證用 `httpOnly`、`Secure`、`SameSite` Cookie，不放 `localStorage`
- [ ] 會改資料的操作不用 GET，並有 CSRF 防護
- [ ] 每一支 API 在後端都檢查「是誰」以及「能不能動這筆資料」
- [ ] 前端程式碼、`.env` 的公開變數裡沒有任何秘密金鑰
- [ ] 正式環境沒有 `console.log` 與 source map
- [ ] lockfile 已 commit，CI 使用 `npm ci` 並跑 `npm audit`
- [ ] 外部 CDN 資源都有 SRI，或改成自己託管
- [ ] 所有資源都走 HTTPS，並設定 HSTS
- [ ] CORS 使用白名單，沒有反射任意 `Origin`
- [ ] 設定 `frame-ancestors` 防止被嵌入
- [ ] 重導向參數有驗證
- [ ] 設定 CSP，先用 Report-Only 觀察再正式啟用

## 安全標頭速查

把上面提到的標頭整理在一起，大部分可以直接放進伺服器或 CDN 設定：

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

設定完可以用 [securityheaders.com](https://securityheaders.com) 或 [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory) 檢查。

---

## 結語

整理完這 14 個問題，我最大的體會是：**前端資安不是一堆零散的技巧，而是幾個原則反覆出現。**

- 使用者送進來的東西都不可信（XSS、Open Redirect、前端授權）。
- 送到使用者那邊的東西都是公開的（金鑰、Console、Source Map）。
- 瀏覽器的方便功能，也是攻擊者的方便功能（CSRF、CORS、Clickjacking）。
- 每一層都要假設上一層可能失守（`httpOnly`、CSP、SRI 這些都是縱深防禦）。

如果你想更系統地學，推薦從 [OWASP Top 10](https://owasp.org/www-project-top-ten/) 和 [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security) 開始。也歡迎直接回到上面的動畫目錄，挑一題從駭客的角度走一遍。
