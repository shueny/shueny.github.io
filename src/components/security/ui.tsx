import React, { useEffect, useState } from 'react';

/**
 * Shared building blocks for the interactive frontend security post.
 * The palette mirrors the standalone animations in /public/security so the
 * embedded labs and the step-through boards read as one system.
 */

export type Lang = 'zh' | 'en' | 'de';
export type L = Record<Lang, string>;

export const tr = (s: L, lang: Lang) => s[lang] ?? s.en;

export const ICONS: Record<string, React.ReactNode> = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="6" />
      <rect x="4" y="14" width="16" height="6" />
      <circle cx="8" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />
    </svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <rect x="3" y="4" width="18" height="16" />
      <path d="M3 8h18" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M12 11v10" />
    </svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  bug: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
      <rect x="7" y="8" width="10" height="12" rx="5" />
      <path d="M12 8V5M9 5l1.5 2M15 5l-1.5 2M3 12h4M17 12h4M4 18l3-2M20 18l-3-2M4 7l3 2M20 7l-3 2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

/** Respects the OS-level "reduce motion" setting. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

/** Fires once, the first time the element scrolls into view. */
export function useFirstVisible<T extends Element>(ref: React.RefObject<T>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

const LAB_LABEL: L = { zh: '動手玩', en: 'Try it', de: 'Ausprobieren' };

/** Pixel-art cloud drawn with box-shadows (8px "pixels"). */
export function PixelCloud({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`sec-cloud pointer-events-none absolute ${className}`} />;
}

/** Brick floor strip used at the bottom of every board. */
export function BrickFloor() {
  return <div aria-hidden className="sec-bricks h-3.5 border-t-[3px] border-[#222034]" />;
}

/** Card wrapper for every lab. `not-prose` keeps the blog typography out. */
export function LabFrame({
  lang,
  title,
  hint,
  children,
  testId,
}: {
  lang: Lang;
  title: string;
  hint?: string;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <section
      data-testid={testId}
      className="sec-root not-prose relative my-10 border-4 border-[#222034] bg-[#A8E0FF] text-[#222034] shadow-[6px_6px_0_#222034]"
    >
      <header className="relative flex flex-wrap items-center gap-3 overflow-hidden border-b-4 border-[#222034] bg-[#6EC6FF] px-4 py-3">
        <PixelCloud className="right-16 top-2 hidden sm:block" />
        <span className="sec-px border-[3px] border-[#222034] bg-[#FFC93C] px-2 py-1 text-[12px] text-[#222034] shadow-[3px_3px_0_#222034]">
          ★ {tr(LAB_LABEL, lang)}
        </span>
        <div className="relative m-0 text-base font-extrabold leading-snug text-[#222034] [text-shadow:2px_2px_0_#fff]">{title}</div>
      </header>
      {hint && <div className="m-0 px-4 pt-3 text-sm leading-relaxed text-[#4B3F72]">{hint}</div>}
      <div className="p-4">{children}</div>
      <BrickFloor />
    </section>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={
              'sec-btn border-[3px] px-2.5 py-1.5 text-left text-xs font-bold ' +
              (on ? 'border-[#222034] bg-[#2C2F6B] text-white' : 'border-[#222034] bg-[#FFF4D6] text-[#222034] hover:bg-white')
            }
          >
            {on ? '▶ ' : ''}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** RPG-style dialog box for a lab's outcome. */
export function Verdict({ tone, children }: { tone: 'bad' | 'good' | 'warn'; children: React.ReactNode }) {
  const cls =
    tone === 'bad'
      ? 'border-[#E43B44] bg-[#FFE0E3] text-[#8A1020]'
      : tone === 'good'
        ? 'border-[#2E9E44] bg-[#DDF5D6] text-[#222034]'
        : 'border-[#F28C28] bg-[#FFE9C7] text-[#7A3E00]';
  return (
    <div
      role="status"
      aria-live="polite"
      className={`sec-pop border-4 px-3 py-2 text-sm font-semibold leading-relaxed shadow-[4px_4px_0_#222034] ${cls}`}
    >
      {children}
    </div>
  );
}

/**
 * Shared CSS for the retro pixel look, injected by every island (tiny).
 * The pixel font only covers Latin; CJK falls back to the system font, and
 * size-adjust keeps the two scripts at a similar visual size.
 */
export function SecStyles() {
  // A static constant (no user input). Injected as raw HTML so the server and
  // client render byte-identical CSS; as a text child React would escape the quotes.
  return <style dangerouslySetInnerHTML={{ __html: SEC_CSS }} />;
}

const SEC_CSS = `
@font-face{font-family:'Press Start 2P';src:url('/security/fonts/press-start-2p-latin.woff2') format('woff2');font-display:swap;unicode-range:U+0000-00FF;size-adjust:72%}
.sec-px{font-family:'Press Start 2P','PingFang TC','Noto Sans TC','Microsoft JhengHei',monospace;letter-spacing:0;line-height:1.5}
.sec-btn{box-shadow:0 4px 0 #222034;transition:transform .08s steps(2),box-shadow .08s steps(2)}
.sec-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 5px 0 #222034}
.sec-btn:active:not(:disabled){transform:translateY(3px);box-shadow:0 1px 0 #222034}
.sec-btn:disabled{box-shadow:0 4px 0 #9FA3E3;cursor:default}
.sec-bricks{background-color:#C84C0C;background-image:linear-gradient(#222034 2px,transparent 2px),linear-gradient(90deg,#222034 2px,transparent 2px);background-size:28px 7px,28px 14px}
.sec-cloud{width:8px;height:8px;top:0;box-shadow:8px 8px #fff,16px 8px #fff,24px 8px #fff,0 16px #fff,8px 16px #fff,16px 16px #fff,24px 16px #fff,32px 16px #fff,-8px 24px #fff,0 24px #fff,8px 24px #fff,16px 24px #fff,24px 24px #fff,32px 24px #fff,40px 24px #fff}
.sec-coin{border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFF6C7 0 18%,#FFC93C 19% 62%,#E6A800 63%);box-shadow:inset -2px -2px 0 rgba(0,0,0,.18)}
@keyframes secPop{0%{transform:scale(.9);opacity:0}60%{transform:scale(1.04);opacity:1}100%{transform:scale(1)}}
@keyframes secShake{0%,100%{transform:translate(-50%,-50%)}20%{transform:translate(calc(-50% - 6px),-50%)}40%{transform:translate(calc(-50% + 6px),-50%)}60%{transform:translate(calc(-50% - 4px),-50%)}80%{transform:translate(calc(-50% + 4px),-50%)}}
@keyframes secPulse{0%,100%{box-shadow:0 4px 0 #222034,0 0 0 0 rgba(255,201,60,.9)}50%{box-shadow:0 4px 0 #222034,0 0 0 8px rgba(255,201,60,0)}}
@keyframes secHop{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
@keyframes secRise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-28px);opacity:0}}
@keyframes secSpin{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.25)}}
@keyframes secBlink{50%{opacity:0}}
.sec-pop{animation:secPop .3s steps(4,end) both}
.sec-shake{animation:secShake .5s steps(5,end) both}
.sec-pulse{animation:secPulse 1.2s steps(6,end) infinite}
.sec-hop{animation:secHop .45s steps(3,end) 1}
.sec-rise{animation:secRise 1s steps(8,end) both}
.sec-spin{animation:secSpin .8s steps(4,end) infinite}
.sec-blink{animation:secBlink 1s steps(1,end) infinite}
@media (prefers-reduced-motion: reduce){.sec-pop,.sec-shake,.sec-pulse,.sec-hop,.sec-rise,.sec-spin,.sec-blink{animation:none!important}.sec-btn{transition:none}}
`;
