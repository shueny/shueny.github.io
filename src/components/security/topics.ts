import type { L } from './ui';

/**
 * Attack-flow data for the step-through player. Each step moves a packet
 * from one actor to another (from === to means "happens here"). `defense.at`
 * is the step the fix stops; with the defense switched on, the flow halts
 * there and shows `defense.msg` instead.
 */

export type Actor = { kind: string; label: L; bad?: boolean };
export type Step = { from: number; to: number; pkt: string; mal?: boolean; text: L };
export type Topic = {
  id: string;
  num: string;
  file: string;
  title: L;
  actors: Actor[];
  steps: Step[];
  defense: { at: number; name: L; msg: L };
};

const l = (zh: string, en: string, de: string): L => ({ zh, en, de });

export const TOPICS: Record<string, Topic> = {
  xss: {
    id: 'xss',
    num: '01',
    file: '01-xss.html',
    title: l('XSS 跨站腳本攻擊', 'XSS (Cross-Site Scripting)', 'XSS (Cross-Site Scripting)'),
    actors: [
      { kind: 'bug', label: l('攻擊者', 'Attacker', 'Angreifer'), bad: true },
      { kind: 'server', label: l('留言板伺服器', 'Comment server', 'Kommentar-Server') },
      { kind: 'user', label: l('受害者', 'Victim', 'Opfer') },
      { kind: 'server', label: l('攻擊者伺服器', 'Attacker server', 'Angreifer-Server'), bad: true },
    ],
    steps: [
      { from: 0, to: 1, pkt: '<script>', mal: true, text: l('攻擊者在留言框送出一段含 <script> 的內容。', 'The attacker submits a comment containing a <script>.', 'Der Angreifer schickt einen Kommentar mit einem <script> ab.') },
      { from: 1, to: 1, pkt: '<script>', mal: true, text: l('伺服器沒有過濾，原封不動存進資料庫。', 'The server stores it as is, without filtering.', 'Der Server speichert ihn ungefiltert.') },
      { from: 1, to: 2, pkt: 'HTML', mal: true, text: l('受害者打開頁面，瀏覽器把留言當成 HTML 執行。', 'The victim opens the page and the browser runs the comment as HTML.', 'Das Opfer öffnet die Seite, der Browser führt den Kommentar als HTML aus.') },
      { from: 2, to: 3, pkt: 'cookie', mal: true, text: l('腳本讀取 document.cookie，偷偷送到攻擊者伺服器。', 'The script reads document.cookie and sends it to the attacker.', 'Das Skript liest document.cookie und schickt es an den Angreifer.') },
      { from: 3, to: 1, pkt: 'session', mal: true, text: l('攻擊者拿著 session 冒充受害者登入，連 2FA 都繞過。', 'The attacker logs in as the victim with the session, bypassing 2FA.', 'Der Angreifer meldet sich mit der Session als Opfer an, 2FA wird umgangen.') },
    ],
    defense: {
      at: 2,
      name: l('輸出時跳脫 escapeHtml()', 'Escape on output: escapeHtml()', 'Bei der Ausgabe escapen: escapeHtml()'),
      msg: l('留言變成 &lt;script&gt;，瀏覽器只當文字顯示，腳本不會執行。', 'The comment becomes &lt;script&gt;. The browser shows it as text and nothing runs.', 'Der Kommentar wird zu &lt;script&gt;. Der Browser zeigt nur Text, nichts wird ausgeführt.'),
    },
  },
  csrf: {
    id: 'csrf',
    num: '02',
    file: '02-csrf.html',
    title: l('CSRF 跨站請求偽造', 'CSRF (Cross-Site Request Forgery)', 'CSRF (Cross-Site Request Forgery)'),
    actors: [
      { kind: 'user', label: l('使用者的瀏覽器', "User's browser", 'Browser des Nutzers') },
      { kind: 'globe', label: l('惡意網站', 'Malicious site', 'Bösartige Seite'), bad: true },
      { kind: 'server', label: l('銀行 bank.com', 'Bank bank.com', 'Bank bank.com') },
    ],
    steps: [
      { from: 0, to: 2, pkt: 'login', text: l('使用者登入銀行，瀏覽器存下 session Cookie。', 'The user logs in to the bank; the browser stores a session cookie.', 'Der Nutzer meldet sich bei der Bank an, der Browser speichert ein Session-Cookie.') },
      { from: 0, to: 1, pkt: 'visit', text: l('在另一個分頁打開了攻擊者的頁面。', "In another tab, the user opens the attacker's page.", 'In einem anderen Tab öffnet er die Seite des Angreifers.') },
      { from: 1, to: 0, pkt: '<form>', mal: true, text: l('頁面裡藏了一個會自動送出的轉帳表單。', 'The page hides an auto-submitting transfer form.', 'Die Seite enthält ein verstecktes, selbst absendendes Überweisungsformular.') },
      { from: 0, to: 2, pkt: 'POST+cookie', mal: true, text: l('瀏覽器照規矩把銀行的 Cookie 一起送出。', "The browser sends the bank's cookie along, as always.", 'Der Browser schickt das Bank-Cookie wie immer mit.') },
      { from: 2, to: 2, pkt: '$5000', mal: true, text: l('銀行看到有效 Cookie，以為是本人，執行轉帳。', 'The bank sees a valid cookie and executes the transfer.', 'Die Bank sieht ein gültiges Cookie und führt die Überweisung aus.') },
    ],
    defense: {
      at: 3,
      name: l('SameSite Cookie + CSRF Token', 'SameSite cookie + CSRF token', 'SameSite-Cookie + CSRF-Token'),
      msg: l('跨站請求不會帶上 SameSite Cookie，也沒有正確的 CSRF Token，銀行回 403。', 'The cross-site request carries no SameSite cookie and no valid CSRF token. The bank answers 403.', 'Der Cross-Site-Request hat weder SameSite-Cookie noch gültigen CSRF-Token. Die Bank antwortet 403.'),
    },
  },
  token: {
    id: 'token',
    num: '03',
    file: '03-token-storage.html',
    title: l('Token 儲存位置', 'Token storage', 'Token-Speicherung'),
    actors: [
      { kind: 'bug', label: l('惡意腳本', 'Malicious script', 'Bösartiges Skript'), bad: true },
      { kind: 'db', label: l('瀏覽器儲存區', 'Browser storage', 'Browser-Speicher') },
      { kind: 'server', label: l('攻擊者伺服器', 'Attacker server', 'Angreifer-Server'), bad: true },
    ],
    steps: [
      { from: 0, to: 0, pkt: 'XSS', mal: true, text: l('網站被注入了一段惡意腳本。', 'A malicious script gets injected into the site.', 'Ein bösartiges Skript wird in die Seite eingeschleust.') },
      { from: 0, to: 1, pkt: 'getItem()', mal: true, text: l("腳本呼叫 localStorage.getItem('token')。", "The script calls localStorage.getItem('token').", "Das Skript ruft localStorage.getItem('token') auf.") },
      { from: 1, to: 0, pkt: 'eyJhb…', mal: true, text: l('完整的 token 被直接讀了出來。', 'The full token is read out directly.', 'Der komplette Token wird direkt ausgelesen.') },
      { from: 0, to: 2, pkt: 'token', mal: true, text: l('token 被送到攻擊者伺服器。', "The token is sent to the attacker's server.", 'Der Token geht an den Server des Angreifers.') },
      { from: 2, to: 2, pkt: 'Bearer', mal: true, text: l('攻擊者把 token 放進請求標頭，冒充使用者。', 'The attacker puts it in a request header and impersonates the user.', 'Der Angreifer nutzt ihn im Header und gibt sich als Nutzer aus.') },
    ],
    defense: {
      at: 2,
      name: l('httpOnly Cookie', 'httpOnly cookie', 'httpOnly-Cookie'),
      msg: l('token 在 httpOnly Cookie 裡，JavaScript 讀不到，document.cookie 回傳空字串。', 'The token lives in an httpOnly cookie. JavaScript cannot read it; document.cookie returns an empty string.', 'Der Token liegt in einem httpOnly-Cookie. JavaScript kann ihn nicht lesen, document.cookie ist leer.'),
    },
  },
  authz: {
    id: 'authz',
    num: '04',
    file: '04-frontend-only-authz.html',
    title: l('前端做權限判斷', 'Frontend-only authorization', 'Autorisierung nur im Frontend'),
    actors: [
      { kind: 'user', label: l('一般使用者', 'Regular user', 'Normaler Nutzer'), bad: true },
      { kind: 'window', label: l('前端介面', 'Frontend UI', 'Frontend-UI') },
      { kind: 'server', label: l('API 後端', 'API backend', 'API-Backend') },
    ],
    steps: [
      { from: 1, to: 0, pkt: 'hide()', text: l('前端判斷不是管理員，把「刪除使用者」按鈕藏起來。', 'The frontend sees a non-admin and hides the "Delete user" button.', 'Das Frontend erkennt keinen Admin und blendet „Nutzer löschen" aus.') },
      { from: 0, to: 1, pkt: 'DevTools', mal: true, text: l('使用者打開開發者工具，看到 API 路徑。', 'The user opens DevTools and finds the API path.', 'Der Nutzer öffnet die DevTools und findet den API-Pfad.') },
      { from: 0, to: 2, pkt: 'DELETE', mal: true, text: l('跳過介面，直接 fetch DELETE /api/users/42。', 'They skip the UI and send DELETE /api/users/42 directly.', 'Er umgeht die UI und sendet direkt DELETE /api/users/42.') },
      { from: 2, to: 2, pkt: 'deleted', mal: true, text: l('後端沒有再檢查權限，直接刪除。', 'The backend does not re-check permissions and deletes.', 'Das Backend prüft nicht erneut und löscht.') },
      { from: 0, to: 2, pkt: 'for 1..999', mal: true, text: l('寫成迴圈，把所有帳號批次刪光。', 'A loop deletes every account in bulk.', 'Eine Schleife löscht alle Konten auf einmal.') },
    ],
    defense: {
      at: 3,
      name: l('後端檢查角色與擁有者', 'Backend checks role and ownership', 'Backend prüft Rolle und Eigentümer'),
      msg: l('後端發現 req.user.role 不是 admin，回 403，資料沒被動到。', 'The backend sees req.user.role is not admin and answers 403. Nothing is deleted.', 'Das Backend sieht, dass req.user.role kein Admin ist, und antwortet 403. Nichts wird gelöscht.'),
    },
  },
  supply: {
    id: 'supply',
    num: '05',
    file: '05-supply-chain.html',
    title: l('第三方套件供應鏈攻擊', 'Supply chain attack', 'Supply-Chain-Angriff'),
    actors: [
      { kind: 'bug', label: l('攻擊者', 'Attacker', 'Angreifer'), bad: true },
      { kind: 'box', label: l('npm registry', 'npm registry', 'npm-Registry') },
      { kind: 'code', label: l('你的專案', 'Your project', 'Dein Projekt') },
      { kind: 'user', label: l('使用者瀏覽器', "Users' browsers", 'Browser der Nutzer') },
    ],
    steps: [
      { from: 0, to: 1, pkt: 'stolen acct', mal: true, text: l('盜用一個冷門深層套件的維護者帳號。', 'The attacker takes over the maintainer account of an obscure deep dependency.', 'Der Angreifer übernimmt das Konto eines Maintainers einer tiefen Abhängigkeit.') },
      { from: 1, to: 1, pkt: 'v1.2.1', mal: true, text: l('發布含竊取程式碼的新版本 1.2.1。', 'Version 1.2.1 ships with data-stealing code.', 'Version 1.2.1 erscheint mit Code, der Daten abgreift.') },
      { from: 1, to: 2, pkt: '^1.2.0', mal: true, text: l('npm install 時，^ 版號規則自動升級到惡意版本。', 'On npm install, the ^ range upgrades to the malicious version.', 'Bei npm install aktualisiert der ^-Bereich auf die bösartige Version.') },
      { from: 2, to: 3, pkt: 'bundle', mal: true, text: l('惡意程式碼隨建置流程進入網站。', 'The malicious code ships with your build.', 'Der Schadcode kommt mit deinem Build heraus.') },
      { from: 3, to: 0, pkt: 'data', mal: true, text: l('每一位使用者的資料都被送到攻擊者手上。', "Every user's data is sent to the attacker.", 'Die Daten jedes Nutzers gehen an den Angreifer.') },
    ],
    defense: {
      at: 2,
      name: l('lockfile + npm ci + Dependabot', 'lockfile + npm ci + Dependabot', 'Lockfile + npm ci + Dependabot'),
      msg: l('npm ci 只安裝 lockfile 鎖定的 1.2.0，惡意的 1.2.1 不會被拉進來，npm audit 也會示警。', 'npm ci installs exactly the locked 1.2.0. The malicious 1.2.1 is never pulled in, and npm audit flags it.', 'npm ci installiert genau das gesperrte 1.2.0. Das bösartige 1.2.1 kommt nicht rein, npm audit warnt.'),
    },
  },
  sri: {
    id: 'sri',
    num: '06',
    file: '06-cdn-sri.html',
    title: l('CDN 資源缺少 SRI', 'CDN resources without SRI', 'CDN-Ressourcen ohne SRI'),
    actors: [
      { kind: 'bug', label: l('攻擊者', 'Attacker', 'Angreifer'), bad: true },
      { kind: 'server', label: l('CDN', 'CDN', 'CDN') },
      { kind: 'window', label: l('你的網頁', 'Your page', 'Deine Seite') },
      { kind: 'user', label: l('使用者', 'Users', 'Nutzer') },
    ],
    steps: [
      { from: 0, to: 1, pkt: 'lib.js*', mal: true, text: l('CDN 被入侵，lib.js 被換成惡意版本。', 'The CDN is compromised and lib.js is swapped.', 'Das CDN wird kompromittiert, lib.js ausgetauscht.') },
      { from: 2, to: 1, pkt: 'GET', text: l('網頁用 <script src> 向 CDN 載入 lib.js。', 'The page loads lib.js from the CDN via <script src>.', 'Die Seite lädt lib.js per <script src> vom CDN.') },
      { from: 1, to: 2, pkt: 'lib.js*', mal: true, text: l('CDN 回傳被竄改的檔案。', 'The CDN returns the tampered file.', 'Das CDN liefert die manipulierte Datei.') },
      { from: 2, to: 2, pkt: 'exec', mal: true, text: l('瀏覽器沒有比對內容，直接執行。', 'The browser runs it without checking the contents.', 'Der Browser führt sie ohne Prüfung aus.') },
      { from: 2, to: 3, pkt: 'malware', mal: true, text: l('惡意程式碼在每位使用者的瀏覽器裡執行。', "The malicious code runs in every user's browser.", 'Der Schadcode läuft im Browser jedes Nutzers.') },
    ],
    defense: {
      at: 3,
      name: l('integrity="sha384-…"', 'integrity="sha384-…"', 'integrity="sha384-…"'),
      msg: l('瀏覽器算出的雜湊值和 integrity 不符，拒絕執行這個檔案。', 'The hash the browser computes does not match integrity, so it refuses to run the file.', 'Der berechnete Hash passt nicht zu integrity, der Browser verweigert die Ausführung.'),
    },
  },
  secrets: {
    id: 'secrets',
    num: '07',
    file: '07-hardcoded-secrets.html',
    title: l('敏感資訊寫死在前端', 'Secrets hardcoded in the frontend', 'Hartcodierte Secrets im Frontend'),
    actors: [
      { kind: 'user', label: l('開發者', 'Developer', 'Entwickler') },
      { kind: 'code', label: l('上線的 JS bundle', 'Shipped JS bundle', 'Ausgeliefertes JS-Bundle') },
      { kind: 'bug', label: l('任何訪客', 'Any visitor', 'Jeder Besucher'), bad: true },
      { kind: 'server', label: l('付費 API', 'Paid API', 'Kostenpflichtige API') },
    ],
    steps: [
      { from: 0, to: 1, pkt: 'API_KEY', text: l('開發者把 API 金鑰直接寫在前端程式碼。', 'The developer writes the API key into frontend code.', 'Der Entwickler schreibt den API-Schlüssel in den Frontend-Code.') },
      { from: 1, to: 1, pkt: 'minify', text: l('打包壓縮上線，字串原封不動保留。', 'It is bundled and minified; the string stays intact.', 'Gebündelt und minifiziert, der String bleibt erhalten.') },
      { from: 1, to: 2, pkt: 'sk-live…', mal: true, text: l('任何人打開 Sources 分頁就能複製金鑰。', 'Anyone can copy the key from the Sources tab.', 'Jeder kann den Schlüssel im Sources-Tab kopieren.') },
      { from: 2, to: 3, pkt: 'Bearer', mal: true, text: l('拿你的金鑰呼叫付費 API。', 'They call the paid API with your key.', 'Damit wird die kostenpflichtige API aufgerufen.') },
      { from: 3, to: 3, pkt: '$$$', mal: true, text: l('額度被刷爆，帳單算你的。', 'Your quota is burned and you get the bill.', 'Dein Kontingent ist weg, die Rechnung geht an dich.') },
    ],
    defense: {
      at: 2,
      name: l('金鑰只放後端環境變數', 'Keep keys in backend env vars', 'Schlüssel nur in Backend-Variablen'),
      msg: l("bundle 裡只有 fetch('/api/ask')，金鑰留在伺服器的 process.env，前端搜不到。", "The bundle only contains fetch('/api/ask'). The key stays in process.env on the server.", "Im Bundle steht nur fetch('/api/ask'). Der Schlüssel bleibt in process.env auf dem Server."),
    },
  },
  console: {
    id: 'console',
    num: '08',
    file: '08-console-log.html',
    title: l('Console Log 洩漏資訊', 'Sensitive data in console logs', 'Sensible Daten in Console-Logs'),
    actors: [
      { kind: 'user', label: l('開發者', 'Developer', 'Entwickler') },
      { kind: 'window', label: l('正式網站', 'Production site', 'Produktivseite') },
      { kind: 'bug', label: l('任何訪客', 'Any visitor', 'Jeder Besucher'), bad: true },
    ],
    steps: [
      { from: 0, to: 1, pkt: 'console.log', text: l('除錯時加了 console.log(userData)。', 'console.log(userData) is added while debugging.', 'Beim Debuggen kommt console.log(userData) dazu.') },
      { from: 1, to: 1, pkt: 'deploy', mal: true, text: l('上線前忘了移除，一起部署。', 'It is forgotten and deployed.', 'Es wird vergessen und mit deployt.') },
      { from: 2, to: 1, pkt: 'F12', mal: true, text: l('訪客打開 Console 分頁。', 'A visitor opens the Console tab.', 'Ein Besucher öffnet den Console-Tab.') },
      { from: 1, to: 2, pkt: 'userData', mal: true, text: l('個資、角色、內部備註全部印在眼前。', 'Personal data, roles and internal notes are printed.', 'Persönliche Daten, Rollen und interne Notizen erscheinen.') },
      { from: 2, to: 2, pkt: 'schema', mal: true, text: l('從資料結構推測後端，規劃下一步攻擊。', 'The data shape hints at the backend for the next attack.', 'Die Datenstruktur verrät das Backend für den nächsten Angriff.') },
    ],
    defense: {
      at: 1,
      name: l('建置時 drop_console', 'drop_console at build time', 'drop_console beim Build'),
      msg: l('建置時自動移除所有 console.*，正式環境的 Console 一片空白。', 'The build strips every console.* call. The production Console stays empty.', 'Der Build entfernt alle console.*-Aufrufe. Die Console bleibt leer.'),
    },
  },
  sourcemap: {
    id: 'sourcemap',
    num: '09',
    file: '09-source-map.html',
    title: l('Source Map 暴露原始碼', 'Source maps exposing code', 'Source Maps legen Code offen'),
    actors: [
      { kind: 'box', label: l('建置工具', 'Build tool', 'Build-Tool') },
      { kind: 'server', label: l('正式伺服器', 'Production server', 'Produktivserver') },
      { kind: 'bug', label: l('攻擊者', 'Attacker', 'Angreifer'), bad: true },
    ],
    steps: [
      { from: 0, to: 1, pkt: 'main.js', text: l('程式碼被壓縮成 function a(b){return b.c+b.d}。', 'Code is minified to function a(b){return b.c+b.d}.', 'Der Code wird zu function a(b){return b.c+b.d} minifiziert.') },
      { from: 0, to: 1, pkt: '.js.map', mal: true, text: l('main.js.map 也一起部署上線。', 'main.js.map is deployed too.', 'main.js.map wird mit deployt.') },
      { from: 2, to: 1, pkt: 'GET .map', mal: true, text: l('攻擊者請求 .js.map 檔。', 'The attacker requests the .js.map file.', 'Der Angreifer fordert die .js.map-Datei an.') },
      { from: 1, to: 2, pkt: 'source', mal: true, text: l('DevTools 還原出完整原始碼和註解。', 'DevTools restores the full source with comments.', 'Die DevTools stellen den Quellcode samt Kommentaren her.') },
      { from: 2, to: 2, pkt: 'bug', mal: true, text: l('讀懂邏輯，找到折扣沒設上限的漏洞。', 'They read the logic and find an uncapped discount.', 'Er versteht die Logik und findet einen Rabatt ohne Obergrenze.') },
    ],
    defense: {
      at: 1,
      name: l('正式環境 sourcemap: false', 'sourcemap: false in production', 'sourcemap: false in Produktion'),
      msg: l('正式建置不產生 .map，伺服器上只有壓縮過的 main.js，請求 .map 只會拿到 404。', 'Production builds emit no .map. Requests for it get a 404.', 'Der Produktions-Build erzeugt keine .map. Anfragen bekommen 404.'),
    },
  },
  mixed: {
    id: 'mixed',
    num: '10',
    file: '10-mixed-content.html',
    title: l('未強制 HTTPS／混合內容', 'No HTTPS / mixed content', 'Kein HTTPS / Mixed Content'),
    actors: [
      { kind: 'user', label: l('使用者瀏覽器', "User's browser", 'Browser des Nutzers') },
      { kind: 'wifi', label: l('公共 WiFi 中間人', 'Wi-Fi eavesdropper', 'WLAN-Lauscher'), bad: true },
      { kind: 'server', label: l('cdn.example.com', 'cdn.example.com', 'cdn.example.com') },
    ],
    steps: [
      { from: 0, to: 0, pkt: 'https://', text: l('在咖啡廳 WiFi 瀏覽一個 HTTPS 網站。', 'The user browses an HTTPS site on café Wi-Fi.', 'Der Nutzer surft im Café-WLAN auf einer HTTPS-Seite.') },
      { from: 0, to: 2, pkt: 'http://', mal: true, text: l('頁面裡有張圖片用 http:// 載入，少了一個 s。', 'One image loads over http://, missing the s.', 'Ein Bild lädt über http://, das s fehlt.') },
      { from: 0, to: 1, pkt: 'GET', mal: true, text: l('同一個網路的攻擊者攔截這個明文請求。', 'An attacker on the network intercepts the plaintext request.', 'Ein Angreifer im Netz fängt den Klartext-Request ab.') },
      { from: 1, to: 0, pkt: 'swap', mal: true, text: l('回應被竊聽，或整個換成惡意內容。', 'The response is read or replaced with malicious content.', 'Die Antwort wird mitgelesen oder ersetzt.') },
      { from: 0, to: 0, pkt: '✗', mal: true, text: l('一個破口讓整頁的加密失效。', 'One gap undoes the whole page’s encryption.', 'Eine Lücke hebt die Verschlüsselung der Seite auf.') },
    ],
    defense: {
      at: 1,
      name: l('upgrade-insecure-requests + HSTS', 'upgrade-insecure-requests + HSTS', 'upgrade-insecure-requests + HSTS'),
      msg: l('瀏覽器自動把請求升級成 https://，中間人只看得到加密流量。', 'The browser upgrades the request to https://. The eavesdropper only sees encrypted traffic.', 'Der Browser stuft auf https:// hoch. Der Lauscher sieht nur verschlüsselten Verkehr.'),
    },
  },
  cors: {
    id: 'cors',
    num: '11',
    file: '11-cors-wildcard.html',
    title: l('CORS 設定過寬', 'Overly permissive CORS', 'Zu großzügiges CORS'),
    actors: [
      { kind: 'user', label: l('使用者瀏覽器', "User's browser", 'Browser des Nutzers') },
      { kind: 'globe', label: l('惡意網站', 'Malicious site', 'Bösartige Seite'), bad: true },
      { kind: 'server', label: l('你的 API', 'Your API', 'Deine API') },
    ],
    steps: [
      { from: 0, to: 2, pkt: 'login', text: l('使用者已登入你的網站，持有 session。', 'The user is logged in to your site.', 'Der Nutzer ist auf deiner Seite angemeldet.') },
      { from: 0, to: 1, pkt: 'visit', text: l('在同一個瀏覽器打開了惡意網站。', 'In the same browser, they open a malicious site.', 'Im selben Browser öffnet er eine bösartige Seite.') },
      { from: 1, to: 2, pkt: 'fetch+cookie', mal: true, text: l("惡意網站用 credentials: 'include' 呼叫你的 API。", "The malicious site calls your API with credentials: 'include'.", "Die Seite ruft deine API mit credentials: 'include' auf.") },
      { from: 2, to: 1, pkt: 'ACAO: evil', mal: true, text: l('伺服器照抄 Origin，並允許 credentials。', 'The server echoes the Origin and allows credentials.', 'Der Server spiegelt den Origin und erlaubt Credentials.') },
      { from: 1, to: 1, pkt: 'email, phone', mal: true, text: l('使用者的私人資料落到攻擊者手上。', "The user's private data lands with the attacker.", 'Private Daten landen beim Angreifer.') },
    ],
    defense: {
      at: 3,
      name: l('Origin 白名單', 'Origin allowlist', 'Origin-Allowlist'),
      msg: l('evil.com 不在白名單，回應沒有 Access-Control-Allow-Origin，瀏覽器不讓它讀取。', 'evil.com is not on the allowlist. No Access-Control-Allow-Origin header, so the browser blocks the read.', 'evil.com steht nicht auf der Allowlist. Ohne Access-Control-Allow-Origin blockiert der Browser.'),
    },
  },
  clickjacking: {
    id: 'clickjacking',
    num: '12',
    file: '12-clickjacking.html',
    title: l('Clickjacking 點擊劫持', 'Clickjacking', 'Clickjacking'),
    actors: [
      { kind: 'user', label: l('使用者', 'User', 'Nutzer') },
      { kind: 'globe', label: l('誘餌頁面', 'Bait page', 'Köderseite'), bad: true },
      { kind: 'window', label: l('透明 iframe：bank.com', 'Hidden iframe: bank.com', 'Unsichtbares iframe: bank.com') },
    ],
    steps: [
      { from: 1, to: 1, pkt: '🎁', mal: true, text: l('攻擊者做了「立即領取優惠」頁面。', 'The attacker builds a "Claim your reward" page.', 'Der Angreifer baut eine „Prämie sichern"-Seite.') },
      { from: 1, to: 2, pkt: 'opacity:0', mal: true, text: l('把銀行頁面用透明 iframe 疊在按鈕上。', 'The bank page sits on top in a transparent iframe.', 'Die Bankseite liegt unsichtbar im iframe darüber.') },
      { from: 0, to: 1, pkt: 'click', text: l('使用者點下優惠按鈕。', 'The user clicks the reward button.', 'Der Nutzer klickt auf den Prämien-Button.') },
      { from: 1, to: 2, pkt: 'click', mal: true, text: l('點擊穿透到看不見的「確認轉帳」。', 'The click lands on the invisible "Confirm transfer".', 'Der Klick trifft das unsichtbare „Überweisung bestätigen".') },
      { from: 2, to: 2, pkt: '$5000', mal: true, text: l('轉帳在不知情的情況下完成。', 'The transfer completes unnoticed.', 'Die Überweisung läuft unbemerkt durch.') },
    ],
    defense: {
      at: 1,
      name: l("frame-ancestors 'none'", "frame-ancestors 'none'", "frame-ancestors 'none'"),
      msg: l('銀行頁面拒絕被嵌入，iframe 是空白的，點擊不會穿透到任何東西。', 'The bank page refuses to be framed. The iframe stays blank and the click hits nothing.', 'Die Bankseite lässt sich nicht einbetten. Das iframe bleibt leer, der Klick trifft nichts.'),
    },
  },
  redirect: {
    id: 'redirect',
    num: '13',
    file: '13-open-redirect.html',
    title: l('開放重導向', 'Open redirect', 'Open Redirect'),
    actors: [
      { kind: 'user', label: l('使用者', 'User', 'Nutzer') },
      { kind: 'server', label: l('real-bank.com', 'real-bank.com', 'real-bank.com') },
      { kind: 'globe', label: l('evil-fake-bank.com', 'evil-fake-bank.com', 'evil-fake-bank.com'), bad: true },
    ],
    steps: [
      { from: 0, to: 0, pkt: '✉', text: l('收到看似官方的信，連結開頭是 real-bank.com。', 'An email links to the real real-bank.com.', 'Eine Mail verlinkt auf das echte real-bank.com.') },
      { from: 0, to: 1, pkt: '?redirect=', mal: true, text: l('網址夾帶 redirect=https://evil-fake-bank.com。', 'The URL carries redirect=https://evil-fake-bank.com.', 'Die URL enthält redirect=https://evil-fake-bank.com.') },
      { from: 1, to: 1, pkt: 'trust', text: l('先到真的官方網站，建立信任感。', 'The user lands on the real site first, building trust.', 'Erst die echte Seite, das schafft Vertrauen.') },
      { from: 1, to: 2, pkt: '302', mal: true, text: l('沒驗證目的地，直接把使用者導走。', 'The target is not validated; the user is sent away.', 'Das Ziel wird nicht geprüft, der Nutzer wird weitergeleitet.') },
      { from: 0, to: 2, pkt: 'password', mal: true, text: l('在一模一樣的假登入頁輸入帳密。', 'They type their password into a pixel-perfect fake.', 'Er gibt sein Passwort auf einer perfekten Fälschung ein.') },
    ],
    defense: {
      at: 3,
      name: l('重導向路徑白名單', 'Redirect path allowlist', 'Allowlist für Weiterleitungen'),
      msg: l('目的地不在白名單，一律導回 /dashboard，使用者留在官方網站。', 'The target is not allowlisted, so it falls back to /dashboard. The user stays on the real site.', 'Das Ziel ist nicht erlaubt, also /dashboard. Der Nutzer bleibt auf der echten Seite.'),
    },
  },
  csp: {
    id: 'csp',
    num: '14',
    file: '14-csp.html',
    title: l('CSP 內容安全政策', 'CSP (Content Security Policy)', 'CSP (Content Security Policy)'),
    actors: [
      { kind: 'bug', label: l('被注入的腳本', 'Injected script', 'Eingeschleustes Skript'), bad: true },
      { kind: 'window', label: l('瀏覽器', 'Browser', 'Browser') },
      { kind: 'server', label: l('evil.com', 'evil.com', 'evil.com'), bad: true },
    ],
    steps: [
      { from: 0, to: 0, pkt: 'XSS', mal: true, text: l('某個地方漏了跳脫，惡意腳本混進頁面。', 'Escaping is missed somewhere and a script slips in.', 'Irgendwo fehlt Escaping, ein Skript rutscht durch.') },
      { from: 0, to: 1, pkt: 'run', mal: true, text: l('瀏覽器照常執行頁面上的腳本。', 'The browser runs it like any other script.', 'Der Browser führt es wie jedes Skript aus.') },
      { from: 1, to: 1, pkt: 'DOM', mal: true, text: l('腳本讀取頁面上的資料。', 'The script reads data from the page.', 'Das Skript liest Daten der Seite.') },
      { from: 1, to: 2, pkt: 'fetch', mal: true, text: l('把資料送到 evil.com。', 'It sends the data to evil.com.', 'Es schickt die Daten an evil.com.') },
      { from: 2, to: 2, pkt: 'data', mal: true, text: l('沒有任何東西攔下，攻擊者收到資料。', 'Nothing stops it; the attacker gets the data.', 'Nichts hält es auf, der Angreifer bekommt die Daten.') },
    ],
    defense: {
      at: 1,
      name: l("CSP: script-src 'nonce-…'", "CSP: script-src 'nonce-…'", "CSP: script-src 'nonce-…'"),
      msg: l('這段腳本沒有 nonce，瀏覽器拒絕執行；就算執行了，connect-src 也會擋下對外連線。', 'The script has no nonce, so the browser refuses to run it. Even if it ran, connect-src would block the request.', 'Das Skript hat keine Nonce und wird nicht ausgeführt. Selbst dann würde connect-src den Request blocken.'),
    },
  },
};
