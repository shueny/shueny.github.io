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
      className="not-prose my-8 overflow-hidden rounded-xl border-2 border-[#2E382E] bg-[#DEDEDB] text-[#2E382E]"
    >
      <header className="flex flex-wrap items-center gap-3 border-b-2 border-[#2E382E] bg-[#F4F4F1] px-4 py-3">
        <span className="bg-[#DDFF00] px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#2E382E]">
          {tr(LAB_LABEL, lang)}
        </span>
        <div className="m-0 text-base font-extrabold leading-snug">{title}</div>
      </header>
      {hint && <div className="m-0 px-4 pt-3 text-sm leading-relaxed text-[#4A554A]">{hint}</div>}
      <div className="p-4">{children}</div>
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
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
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
              'border-2 px-2.5 py-1.5 text-left text-xs font-bold transition-colors ' +
              (on
                ? 'border-[#2E382E] bg-[#3C4A3C] text-white'
                : 'border-[#8E948E] bg-[#F4F4F1] text-[#2E382E] hover:border-[#2E382E]')
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Verdict({ tone, children }: { tone: 'bad' | 'good' | 'warn'; children: React.ReactNode }) {
  const cls =
    tone === 'bad'
      ? 'border-[#FF6A2B] bg-[#FBE3D7] text-[#6E2508]'
      : tone === 'good'
        ? 'border-[#9DB800] bg-[#F3F9CF] text-[#2E382E]'
        : 'border-[#C9A100] bg-[#FFF6CC] text-[#4A3B00]';
  return (
    <div role="status" aria-live="polite" className={`sec-pop border-2 px-3 py-2 text-sm font-semibold leading-relaxed ${cls}`}>
      {children}
    </div>
  );
}

/** Keyframes shared by every component; injected once per island, cheap. */
export function SecStyles() {
  return (
    <style>{`
@keyframes secPop{0%{transform:scale(.96);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes secShake{0%,100%{transform:translate(-50%,0)}20%{transform:translate(calc(-50% - 6px),0)}40%{transform:translate(calc(-50% + 6px),0)}60%{transform:translate(calc(-50% - 4px),0)}80%{transform:translate(calc(-50% + 4px),0)}}
@keyframes secPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,106,43,.55)}50%{box-shadow:0 0 0 8px rgba(255,106,43,0)}}
@keyframes secType{from{max-width:0}to{max-width:100%}}
.sec-pop{animation:secPop .28s ease-out both}
.sec-shake{animation:secShake .5s ease-in-out both}
.sec-pulse{animation:secPulse 1.2s ease-out infinite}
.sec-type{display:inline-block;overflow:hidden;white-space:pre;vertical-align:bottom;animation:secType .5s steps(30,end) both}
@media (prefers-reduced-motion: reduce){.sec-pop,.sec-shake,.sec-pulse,.sec-type{animation:none!important}}
`}</style>
  );
}
