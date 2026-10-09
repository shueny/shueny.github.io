import { useState } from 'react';
import { LabFrame, SecStyles, Segmented, Verdict, tr, type L, type Lang } from './ui';

/**
 * Pick a server CORS config and the page making a credentialed request, and
 * see the response headers plus what the browser actually lets through.
 * Models the real rule: `*` is never allowed together with credentials.
 */

const T: Record<string, L> = {
  title: { zh: 'CORS 設定試驗台', en: 'CORS config test bench', de: 'CORS-Prüfstand' },
  hint: {
    zh: "每個請求都帶著使用者的 Cookie（credentials: 'include'）。換換伺服器設定和發出請求的網站，看瀏覽器怎麼判斷。",
    en: "Every request carries the user's cookie (credentials: 'include'). Change the server config and the calling site to see what the browser decides.",
    de: "Jeder Request trägt das Cookie des Nutzers (credentials: 'include'). Ändere Serverkonfiguration und aufrufende Seite.",
  },
  server: { zh: '伺服器設定', en: 'Server config', de: 'Serverkonfiguration' },
  origin: { zh: '發出請求的網站', en: 'Calling site', de: 'Aufrufende Seite' },
  wild: { zh: 'Allow-Origin: *', en: 'Allow-Origin: *', de: 'Allow-Origin: *' },
  reflect: { zh: '照抄請求的 Origin', en: 'Echo the request Origin', de: 'Origin zurückspiegeln' },
  allow: { zh: '白名單 yourapp.com', en: 'Allowlist yourapp.com', de: 'Allowlist yourapp.com' },
  req: { zh: '請求', en: 'Request', de: 'Request' },
  res: { zh: 'API 回應標頭', en: 'API response headers', de: 'API-Response-Header' },
  noHeader: { zh: '（沒有 Access-Control-Allow-Origin）', en: '(no Access-Control-Allow-Origin)', de: '(kein Access-Control-Allow-Origin)' },
  wildBlock: {
    zh: '瀏覽器拒絕：* 不能搭配 credentials。攻擊者讀不到，但你自己的網站也一起壞掉了。',
    en: "Browser refuses: * can't be combined with credentials. The attacker can't read it, but your own app breaks too.",
    de: 'Browser verweigert: * geht nicht mit Credentials. Der Angreifer liest nichts, aber deine eigene App ist auch kaputt.',
  },
  leak: {
    zh: '資料外洩：瀏覽器看到 Origin 完全吻合又允許 credentials，就把使用者的私人資料交給這個網站。',
    en: "Data leak: the Origin matches exactly and credentials are allowed, so the browser hands the user's private data to this site.",
    de: 'Datenleck: Der Origin passt exakt und Credentials sind erlaubt, also bekommt diese Seite die privaten Daten.',
  },
  ok: { zh: '正常運作：這是你自己的前端，本來就該讀得到。', en: 'Works as intended: this is your own frontend.', de: 'Funktioniert wie gedacht: Das ist dein eigenes Frontend.' },
  blocked: {
    zh: '擋下：回應沒有允許這個來源，瀏覽器不讓頁面讀取內容。',
    en: 'Blocked: the response does not allow this origin, so the browser hides the body from the page.',
    de: 'Blockiert: Die Antwort erlaubt diesen Origin nicht, der Browser gibt den Inhalt nicht frei.',
  },
  nullNote: {
    zh: '提醒：sandbox iframe 和 file:// 頁面送出的 Origin 就是 null，攻擊者很容易做到。',
    en: 'Note: sandboxed iframes and file:// pages send Origin: null, which is easy for an attacker to produce.',
    de: 'Hinweis: Sandbox-iframes und file://-Seiten senden Origin: null, das kann jeder Angreifer erzeugen.',
  },
};

type Server = 'wild' | 'reflect' | 'allow';
type Origin = 'https://yourapp.com' | 'https://evil.com' | 'null';

function evaluate(server: Server, origin: Origin) {
  if (server === 'wild')
    return { headers: ['Access-Control-Allow-Origin: *', 'Access-Control-Allow-Credentials: true'], result: 'wildBlock' as const };
  if (server === 'reflect')
    return {
      headers: [`Access-Control-Allow-Origin: ${origin}`, 'Access-Control-Allow-Credentials: true'],
      result: origin === 'https://yourapp.com' ? ('ok' as const) : ('leak' as const),
    };
  return origin === 'https://yourapp.com'
    ? { headers: [`Access-Control-Allow-Origin: ${origin}`, 'Access-Control-Allow-Credentials: true', 'Vary: Origin'], result: 'ok' as const }
    : { headers: ['Vary: Origin'], result: 'blocked' as const };
}

export default function CorsLab({ lang = 'en' }: { lang?: Lang }) {
  const [server, setServer] = useState<Server>('reflect');
  const [origin, setOrigin] = useState<Origin>('https://evil.com');
  const { headers, result } = evaluate(server, origin);
  const tone = result === 'leak' ? 'bad' : result === 'ok' || result === 'blocked' ? 'good' : 'warn';
  const icon = result === 'leak' ? '✗' : result === 'wildBlock' ? '⚠' : '✓';
  const evil = origin !== 'https://yourapp.com';

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-cors">
      <SecStyles />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.06em]">{tr(T.server, lang)}</div>
          <Segmented
            label={tr(T.server, lang)}
            value={server}
            onChange={setServer}
            options={[
              { value: 'wild', label: tr(T.wild, lang) },
              { value: 'reflect', label: tr(T.reflect, lang) },
              { value: 'allow', label: tr(T.allow, lang) },
            ]}
          />
        </div>
        <div>
          <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.06em]">{tr(T.origin, lang)}</div>
          <Segmented
            label={tr(T.origin, lang)}
            value={origin}
            onChange={setOrigin}
            options={[
              { value: 'https://yourapp.com', label: 'yourapp.com' },
              { value: 'https://evil.com', label: 'evil.com' },
              { value: 'null', label: 'Origin: null' },
            ]}
          />
        </div>
      </div>

      <div key={`${server}-${origin}`} className="mt-3 grid gap-2 font-mono text-[12px] sm:grid-cols-2">
        <div className={'sec-pop border-2 p-2.5 ' + (evil ? 'border-[#F27A85] bg-[#FFE0E3]' : 'border-[#2E9E44] bg-[#DDF5D6]')}>
          <div className="mb-1 font-sans text-[10px] font-extrabold uppercase tracking-[0.08em]">→ {tr(T.req, lang)}</div>
          <div>GET /api/me</div>
          <div>Origin: {origin}</div>
          <div>Cookie: session=abc123</div>
        </div>
        <div className="sec-pop border-2 border-[#4A4E9C] bg-[#16183A] p-2.5 text-[#F5F1FF]" style={{ animationDelay: '.15s' }}>
          <div className="mb-1 font-sans text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#A9ACE6]">
            ← {tr(T.res, lang)}
          </div>
          <div className="text-[#2E9E44]">HTTP/1.1 200 OK</div>
          {headers.map((h) => (
            <div key={h} className={h.startsWith('Access-Control-Allow-Origin') && result === 'leak' ? 'text-[#FF8A94]' : ''}>
              {h}
            </div>
          ))}
          {!headers.some((h) => h.startsWith('Access-Control-Allow-Origin')) && (
            <div className="text-[#8F92D8]">{tr(T.noHeader, lang)}</div>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2" data-testid="cors-verdict" data-result={result}>
        <Verdict tone={tone}>
          {icon} {tr(T[result], lang)}
        </Verdict>
        {origin === 'null' && result === 'leak' && <div className="m-0 text-xs text-[#4B3F72]">{tr(T.nullNote, lang)}</div>}
      </div>
    </LabFrame>
  );
}
