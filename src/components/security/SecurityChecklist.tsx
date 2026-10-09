import { useEffect, useState } from 'react';
import { LabFrame, SecStyles, tr, type L, type Lang } from './ui';

/** Pre-launch checklist with progress. Remembers ticks per language in localStorage (best effort). */

const l = (zh: string, en: string, de: string): L => ({ zh, en, de });

const ITEMS: L[] = [
  l('所有使用者輸入在輸出時都有跳脫，沒有直接用 innerHTML / dangerouslySetInnerHTML / v-html', 'All user input is escaped on output; no direct innerHTML / dangerouslySetInnerHTML / v-html', 'Alle Nutzereingaben werden escaped; kein direktes innerHTML / dangerouslySetInnerHTML / v-html'),
  l('登入憑證用 httpOnly、Secure、SameSite Cookie，不放 localStorage', 'Credentials are in httpOnly, Secure, SameSite cookies, not localStorage', 'Anmeldedaten in httpOnly-, Secure-, SameSite-Cookies, nicht in localStorage'),
  l('會改資料的操作不用 GET，並有 CSRF 防護', 'Nothing that changes data uses GET, and CSRF protection is in place', 'Nichts Datenänderndes läuft über GET, CSRF-Schutz ist aktiv'),
  l('每一支 API 都在後端檢查「是誰」和「能不能動這筆資料」', 'Every API checks "who is this" and "may they touch this record" on the backend', 'Jede API prüft im Backend „Wer?" und „Darf er diesen Datensatz?"'),
  l('前端程式碼與公開環境變數裡沒有任何秘密金鑰', 'No secret keys in frontend code or public env vars', 'Keine geheimen Schlüssel im Frontend-Code oder in öffentlichen Variablen'),
  l('正式環境沒有 console.log 與 source map', 'No console.log and no source maps in production', 'Kein console.log und keine Source Maps in Produktion'),
  l('lockfile 已 commit，CI 用 npm ci 並跑 npm audit', 'Lockfile committed; CI uses npm ci and runs npm audit', 'Lockfile committet; CI nutzt npm ci und npm audit'),
  l('外部 CDN 資源都有 SRI，或改成自己託管', 'External CDN resources have SRI or are self-hosted', 'Externe CDN-Ressourcen haben SRI oder sind selbst gehostet'),
  l('所有資源都走 HTTPS，並設定 HSTS', 'Every resource uses HTTPS, and HSTS is set', 'Alle Ressourcen über HTTPS, HSTS ist gesetzt'),
  l('CORS 用白名單，沒有反射任意 Origin', 'CORS uses an allowlist and never echoes arbitrary Origins', 'CORS nutzt eine Allowlist und spiegelt keine beliebigen Origins'),
  l("設定 frame-ancestors 防止被嵌入", 'frame-ancestors is set to prevent framing', 'frame-ancestors verhindert Einbettung'),
  l('重導向參數有驗證', 'Redirect parameters are validated', 'Weiterleitungsparameter werden validiert'),
  l('設定 CSP，先 Report-Only 觀察再正式啟用', 'CSP is set, starting in Report-Only before enforcing', 'CSP ist gesetzt, erst Report-Only, dann scharf'),
];

const T: Record<string, L> = {
  title: { zh: '上線前檢查清單', en: 'Pre-launch checklist', de: 'Checkliste vor dem Livegang' },
  hint: {
    zh: '拿你手上的專案逐項勾勾看。勾選狀態只存在你自己的瀏覽器。',
    en: 'Tick these off against a project you are working on. Ticks are only stored in your own browser.',
    de: 'Hake die Punkte für ein eigenes Projekt ab. Gespeichert wird nur in deinem Browser.',
  },
  done: { zh: '完成', en: 'done', de: 'erledigt' },
  reset: { zh: '清除', en: 'Clear', de: 'Leeren' },
  all: {
    zh: '🎉 全部完成！你的專案已經擋下這篇提到的每一種攻擊。',
    en: '🎉 All done! Your project now covers every attack in this post.',
    de: '🎉 Alles erledigt! Dein Projekt deckt jetzt jeden Angriff aus diesem Beitrag ab.',
  },
};

export default function SecurityChecklist({ lang = 'en' }: { lang?: Lang }) {
  const key = `sec-checklist-${lang}`;
  const [checked, setChecked] = useState<boolean[]>(() => ITEMS.map(() => false));

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (Array.isArray(saved) && saved.length === ITEMS.length) setChecked(saved.map(Boolean));
    } catch {
      /* storage unavailable: start empty */
    }
  }, [key]);

  const update = (next: boolean[]) => {
    setChecked(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const count = checked.filter(Boolean).length;
  const pct = Math.round((count / ITEMS.length) * 100);

  return (
    <LabFrame lang={lang} title={tr(T.title, lang)} hint={tr(T.hint, lang)} testId="checklist">
      <SecStyles />
      <div className="mb-3 flex items-center gap-3">
        <span className="sec-px text-[12px]">HP</span>
        <div
          className="flex flex-1 gap-[3px] border-[3px] border-[#222034] bg-[#2C2F6B] p-[3px]"
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={ITEMS.length}
          aria-label={`${pct}%`}
        >
          {ITEMS.map((_, i) => (
            <span key={i} className={'h-3 flex-1 ' + (i < count ? (count === ITEMS.length ? 'bg-[#3CB043]' : 'bg-[#FFC93C]') : 'bg-[#4A4E9C]')} />
          ))}
        </div>
        <span className="sec-px whitespace-nowrap text-[11px]" data-testid="checklist-count">
          {count} / {ITEMS.length} {tr(T.done, lang)}
        </span>
        <button type="button" onClick={() => update(ITEMS.map(() => false))} className="sec-btn border-[3px] border-[#222034] bg-white px-2 py-0.5 text-xs font-extrabold">
          {tr(T.reset, lang)}
        </button>
      </div>
      <ul className="m-0 list-none space-y-1.5 p-0">
        {ITEMS.map((item, i) => (
          <li key={i}>
            <label
              className={
                'flex cursor-pointer items-start gap-2.5 border-[3px] px-3 py-2 text-sm leading-snug ' +
                (checked[i] ? 'border-[#2E9E44] bg-[#DDF5D6] text-[#5A4E7C]' : 'border-[#FFE7A3] bg-[#FFF4D6] hover:border-[#222034]')
              }
            >
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => update(checked.map((c, j) => (j === i ? !c : c)))}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#2C2F6B]"
              />
              <span className={checked[i] ? 'line-through decoration-[#2E9E44] decoration-2' : ''}>{tr(item, lang)}</span>
            </label>
          </li>
        ))}
      </ul>
      {count === ITEMS.length && (
        <div className="sec-pop m-0 mt-3 border-4 border-[#222034] bg-[#FFC93C] px-3 py-2 text-sm font-extrabold shadow-[4px_4px_0_#222034]">
          <div className="sec-px mb-1 text-[15px]">★ STAGE CLEAR! ★</div>
          {tr(T.all, lang)}
        </div>
      )}
    </LabFrame>
  );
}
