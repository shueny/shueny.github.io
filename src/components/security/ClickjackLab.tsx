import { useState } from 'react';
import { LabFrame, SecStyles, Verdict, tr, type L, type Lang } from './ui';

/**
 * A bait page with a "transparent iframe" layered on top. Click the bait
 * button, then drag the slider to reveal what you actually clicked.
 */

const T: Record<string, L> = {
  title: { zh: '點擊劫持：你點到的是什麼？', en: 'Clickjacking: what did you click?', de: 'Clickjacking: Was hast du geklickt?' },
  hint: {
    zh: '先照常點下「立即領取」，再拉動滑桿把上面那層透明 iframe 顯示出來。',
    en: 'Click "Claim now" as usual, then drag the slider to reveal the transparent iframe on top.',
    de: 'Klick wie gewohnt auf „Jetzt sichern", dann zieh den Regler und mach das unsichtbare iframe sichtbar.',
  },
  bait: { zh: '🎉 恭喜！你抽中了限量耳機', en: '🎉 Congrats! You won limited headphones', de: '🎉 Glückwunsch! Du hast Kopfhörer gewonnen' },
  claim: { zh: '立即領取', en: 'Claim now', de: 'Jetzt sichern' },
  bank: { zh: 'bank.com・確認轉帳', en: 'bank.com · Confirm transfer', de: 'bank.com · Überweisung bestätigen' },
  to: { zh: '收款人：attacker　金額：NT$5,000', en: 'To: attacker   Amount: $5,000', de: 'An: attacker   Betrag: 5.000 €' },
  confirm: { zh: '確認轉帳', en: 'Confirm transfer', de: 'Überweisung bestätigen' },
  refused: { zh: 'bank.com 拒絕在框架中顯示', en: 'bank.com refused to be framed', de: 'bank.com verweigert die Einbettung' },
  reveal: { zh: 'iframe 透明度', en: 'iframe opacity', de: 'iframe-Deckkraft' },
  protect: { zh: "bank.com 送出 frame-ancestors 'none'", en: "bank.com sends frame-ancestors 'none'", de: "bank.com sendet frame-ancestors 'none'" },
  stolen: {
    zh: '✗ 你以為在領獎，其實按到的是銀行的「確認轉帳」。NT$5,000 已轉給攻擊者。',
    en: '✗ You thought you were claiming a prize, but you pressed the bank\'s "Confirm transfer". $5,000 went to the attacker.',
    de: '✗ Du wolltest einen Preis, hast aber „Überweisung bestätigen" gedrückt. 5.000 € gingen an den Angreifer.',
  },
  safe: {
    zh: '✓ 銀行頁面拒絕被嵌入，iframe 裡什麼都沒有，這次點擊沒有造成任何操作。',
    en: '✓ The bank page refused to be framed. The iframe is empty and the click did nothing.',
    de: '✓ Die Bankseite ließ sich nicht einbetten. Das iframe ist leer, der Klick bewirkt nichts.',
  },
  again: { zh: '重來', en: 'Reset', de: 'Zurücksetzen' },
};

export default function ClickjackLab({ lang = 'en' }: { lang?: Lang }) {
  const [opacity, setOpacity] = useState(0);
  const [protect, setProtect] = useState(false);
  const [result, setResult] = useState<'none' | 'stolen' | 'safe'>('none');

  const click = () => setResult(protect ? 'safe' : 'stolen');
  const reset = () => {
    setResult('none');
    setOpacity(0);
  };

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="lab-clickjacking">
      <SecStyles />
      <div className="relative h-56 overflow-hidden border-4 border-[#222034] shadow-[4px_4px_0_#222034] bg-gradient-to-br from-[#BDE6FF] to-[#FFE7A3]">
        {/* Bait page (what the user sees) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
          <div className="m-0 text-lg font-extrabold text-[#8A1020]">{tr(T.bait, lang)}</div>
          <span className="inline-block w-44 rounded-full bg-[#E43B44] px-6 py-3 text-base font-extrabold text-white shadow-lg">
            {tr(T.claim, lang)} 🎁
          </span>
        </div>

        {/* The framed bank page, layered on top and catching the click */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center transition-opacity"
          style={{ opacity: opacity / 100, background: opacity ? 'rgba(244,244,241,.96)' : 'transparent' }}
          data-testid="cj-overlay"
        >
          {protect ? (
            <>
              <div className="m-0 text-sm font-bold text-[#5A4E7C]">⛔ {tr(T.refused, lang)}</div>
              <button
                type="button"
                onClick={click}
                aria-label={tr(T.claim, lang)}
                data-testid="cj-target"
                className="w-44 rounded-full px-6 py-3 text-base font-extrabold text-transparent"
              >
                ·
              </button>
            </>
          ) : (
            <>
              <div>
                <div className="m-0 text-sm font-extrabold text-[#222034]">🏦 {tr(T.bank, lang)}</div>
                <div className="m-0 mt-1 font-mono text-xs text-[#4B3F72]">{tr(T.to, lang)}</div>
              </div>
              <button
                type="button"
                onClick={click}
                aria-label={tr(T.claim, lang)}
                data-testid="cj-target"
                className="w-44 rounded-full border-2 border-[#222034] bg-[#2C2F6B] px-6 py-3 text-base font-extrabold text-white"
              >
                {tr(T.confirm, lang)}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-xs font-bold">
          <span className="whitespace-nowrap">{tr(T.reveal, lang)}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            data-testid="cj-slider"
            className="w-full accent-[#2C2F6B]"
          />
          <span className="w-9 text-right font-mono">{opacity}%</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-bold">
          <input
            type="checkbox"
            checked={protect}
            onChange={(e) => {
              setProtect(e.target.checked);
              setResult('none');
            }}
            data-testid="cj-protect"
            className="h-4 w-4 accent-[#2E9E44]"
          />
          🛡 <span className="font-mono text-[11px]">{tr(T.protect, lang)}</span>
        </label>
      </div>

      {result !== 'none' && (
        <div className="mt-3 flex flex-wrap items-start gap-2" data-testid="cj-verdict" data-result={result}>
          <div className="min-w-0 flex-1">
            <Verdict tone={result === 'stolen' ? 'bad' : 'good'}>{tr(T[result], lang)}</Verdict>
          </div>
          <button type="button" onClick={reset} className="sec-btn border-[3px] border-[#222034] bg-white px-3 py-1.5 text-xs font-extrabold">
            ↻ {tr(T.again, lang)}
          </button>
        </div>
      )}
    </LabFrame>
  );
}
