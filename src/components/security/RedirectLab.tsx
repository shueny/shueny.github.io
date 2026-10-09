import { useState } from 'react';
import { LabFrame, SecStyles, Segmented, Verdict, tr, type L, type Lang } from './ui';

/**
 * Feed a `redirect` parameter through different server-side checks and see
 * where the browser really ends up. Resolution uses the WHATWG URL parser,
 * so tricks like `//evil.com` and `/\evil.com` behave exactly as in a browser.
 */

const BASE = 'https://real-bank.com/login';
const BASE_ORIGIN = 'https://real-bank.com';
const ALLOW = ['/dashboard', '/profile', '/settings'];

const T: Record<string, L> = {
  title: { zh: '重導向驗證器', en: 'Redirect validator', de: 'Weiterleitungs-Prüfer' },
  hint: {
    zh: '輸入 ?redirect= 的值、選一種伺服器檢查方式，看看使用者最後會被帶到哪裡。',
    en: 'Enter a ?redirect= value, pick how the server checks it, and see where the user really lands.',
    de: 'Gib einen ?redirect=-Wert ein, wähle die Prüfung und sieh, wo der Nutzer landet.',
  },
  presets: { zh: '試試這些：', en: 'Try these:', de: 'Probier diese:' },
  check: { zh: '伺服器檢查方式', en: 'Server check', de: 'Serverprüfung' },
  none: { zh: '不檢查', en: 'No check', de: 'Keine Prüfung' },
  prefix: { zh: "startsWith('/')", en: "startsWith('/')", de: "startsWith('/')" },
  origin: { zh: 'new URL() 比對 origin', en: 'new URL() origin check', de: 'new URL()-Origin-Check' },
  allow: { zh: '路徑白名單', en: 'Path allowlist', de: 'Pfad-Allowlist' },
  passed: { zh: '通過檢查', en: 'passes the check', de: 'besteht die Prüfung' },
  rejected: { zh: '沒通過 → 改導向 /dashboard', en: 'rejected → falls back to /dashboard', de: 'abgelehnt → Fallback /dashboard' },
  lands: { zh: '瀏覽器最後前往', en: 'The browser ends up at', de: 'Der Browser landet bei' },
  bad: {
    zh: '✗ 使用者被帶離官方網站，假登入頁就等在那裡。',
    en: '✗ The user leaves the real site and a fake login page is waiting.',
    de: '✗ Der Nutzer verlässt die echte Seite, eine gefälschte Anmeldung wartet.',
  },
  js: {
    zh: '✗ 這是 javascript: 網址。如果前端用 location.href = redirect 跳轉，就會直接在官方網站上執行程式碼（XSS）。',
    en: '✗ This is a javascript: URL. If the frontend redirects with location.href = redirect, it runs code right on the real site (XSS).',
    de: '✗ Eine javascript:-URL. Leitet das Frontend per location.href = redirect weiter, läuft Code direkt auf der echten Seite (XSS).',
  },
  good: { zh: '✓ 使用者留在 real-bank.com。', en: '✓ The user stays on real-bank.com.', de: '✓ Der Nutzer bleibt auf real-bank.com.' },
  invalid: { zh: '這不是合法網址，伺服器會回錯誤。', en: 'Not a valid URL; the server would error out.', de: 'Keine gültige URL, der Server gibt einen Fehler zurück.' },
  bypass: {
    zh: '看到了嗎？它以 / 開頭，卻是外部網址。瀏覽器把 // 和 /\\ 都當成「換網域」。',
    en: 'See that? It starts with / but is an external URL. Browsers treat both // and /\\ as "different host".',
    de: 'Siehst du? Es beginnt mit /, ist aber extern. Browser werten // und /\\ als „anderer Host".',
  },
};

const PRESETS = ['/dashboard', 'https://evil-fake-bank.com/login', '//evil-fake-bank.com', '/\\evil-fake-bank.com', 'https://real-bank.com.evil.io', 'javascript:alert(document.cookie)'];

type Check = 'none' | 'prefix' | 'origin' | 'allow';

function passes(check: Check, v: string) {
  if (check === 'none') return true;
  if (check === 'prefix') return v.startsWith('/');
  if (check === 'allow') return ALLOW.includes(v);
  try {
    return new URL(v, BASE).origin === BASE_ORIGIN;
  } catch {
    return false;
  }
}

export default function RedirectLab({ lang = 'en' }: { lang?: Lang }) {
  const [value, setValue] = useState('//evil-fake-bank.com');
  const [check, setCheck] = useState<Check>('prefix');

  const ok = passes(check, value);
  const target = ok ? value : '/dashboard';
  let final: URL | null = null;
  try {
    final = new URL(target, BASE);
  } catch {
    final = null;
  }
  const isJs = final?.protocol === 'javascript:';
  const offsite = final && !isJs && final.origin !== BASE_ORIGIN;
  const sneaky = ok && check === 'prefix' && offsite;

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-redirect">
      <SecStyles />
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-bold text-[#4B3F72]">{tr(T.presets, lang)}</span>
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setValue(p)}
            className="max-w-[230px] truncate border-2 border-[#222034] bg-[#FFF4D6] px-2 py-1 font-mono text-[11px] shadow-[2px_2px_0_#222034] hover:bg-white"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex items-stretch border-2 border-[#222034] bg-white font-mono text-[13px]">
        <span className="flex items-center whitespace-nowrap border-r-2 border-[#222034] bg-[#FFF4D6] px-2 text-[#5A4E7C]">
          …/login?redirect=
        </span>
        <input
          data-testid="redirect-input"
          aria-label="redirect"
          value={value}
          maxLength={200}
          spellCheck={false}
          onChange={(e) => setValue(e.target.value)}
          className="min-w-0 flex-1 px-2 py-2 text-[#222034] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FFC93C]"
        />
      </div>

      <div className="mt-3">
        <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.06em]">{tr(T.check, lang)}</div>
        <Segmented
          label={tr(T.check, lang)}
          value={check}
          onChange={setCheck}
          options={(['none', 'prefix', 'origin', 'allow'] as Check[]).map((c) => ({ value: c, label: tr(T[c], lang) }))}
        />
      </div>

      <div key={`${value}-${check}`} className="sec-pop mt-3 space-y-2">
        <div className="text-xs font-semibold text-[#4B3F72]">
          <span className="bg-[#FFF4D6] px-1 font-mono">{value || '""'}</span> {ok ? tr(T.passed, lang) : tr(T.rejected, lang)}
        </div>
        <div className="border-2 border-[#222034] bg-[#FFF4D6]">
          <div className="flex items-center gap-1.5 border-b border-[#FFE7A3] px-2 py-1">
            <span className="h-2 w-2 rounded-full bg-[#E43B44]" />
            <span className="h-2 w-2 rounded-full bg-[#FFC93C]" />
            <span className="h-2 w-2 rounded-full bg-[#2E9E44]" />
            <span className="ml-2 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#5A4E7C]">{tr(T.lands, lang)}</span>
          </div>
          <div
            data-testid="redirect-final"
            className={
              'break-all px-3 py-2 font-mono text-[13px] font-bold ' +
              (isJs || offsite ? 'bg-[#FFE0E3] text-[#9E1A2C]' : 'bg-white text-[#222034]')
            }
          >
            {final ? (isJs ? final.href : `${final.protocol}//${final.host}${final.pathname}`) : '—'}
          </div>
        </div>
        <div data-testid="redirect-verdict" data-result={!final ? 'invalid' : isJs ? 'js' : offsite ? 'bad' : 'good'}>
          {!final ? (
            <Verdict tone="warn">{tr(T.invalid, lang)}</Verdict>
          ) : isJs ? (
            <Verdict tone="bad">{tr(T.js, lang)}</Verdict>
          ) : offsite ? (
            <Verdict tone="bad">{tr(T.bad, lang)}</Verdict>
          ) : (
            <Verdict tone="good">{tr(T.good, lang)}</Verdict>
          )}
        </div>
        {sneaky && <div className="m-0 text-xs font-semibold text-[#9E1A2C]">{tr(T.bypass, lang)}</div>}
      </div>
    </LabFrame>
  );
}
