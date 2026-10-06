import { useEffect, useRef, useState } from 'react';
import { TOPICS } from './topics';
import { ICONS, SecStyles, tr, useFirstVisible, useReducedMotion, type L, type Lang } from './ui';

const T: Record<string, L> = {
  attack: { zh: '攻擊流程', en: 'Attack flow', de: 'Angriffsablauf' },
  play: { zh: '播放', en: 'Play', de: 'Abspielen' },
  pause: { zh: '暫停', en: 'Pause', de: 'Pause' },
  replay: { zh: '重播', en: 'Replay', de: 'Nochmal' },
  prev: { zh: '上一步', en: 'Previous step', de: 'Zurück' },
  next: { zh: '下一步', en: 'Next step', de: 'Weiter' },
  step: { zh: '步驟', en: 'Step', de: 'Schritt' },
  defense: { zh: '開啟防禦', en: 'Turn on defense', de: 'Abwehr an' },
  blocked: { zh: '攻擊在這一步被擋下', en: 'Attack blocked here', de: 'Angriff hier gestoppt' },
  success: {
    zh: '攻擊成功。打開右上角的防禦開關，再看一次。',
    en: 'The attack worked. Switch on the defense and watch again.',
    de: 'Der Angriff hat geklappt. Schalte die Abwehr ein und sieh nochmal zu.',
  },
  full: { zh: '看完整動畫（含駭客觀點）', en: "Full animation (with the hacker's view)", de: 'Ganze Animation (mit Hacker-Sicht)' },
  goto: { zh: '跳到步驟', en: 'Go to step', de: 'Zu Schritt' },
};

const STEP_MS = 2300;

export default function AttackFlow({ topic, lang = 'en' }: { topic: string; lang?: Lang }) {
  const t = TOPICS[topic];
  const n = t.actors.length;
  const N = t.steps.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const seen = useFirstVisible(rootRef);
  const reduced = useReducedMotion();

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [defense, setDefense] = useState(false);
  const [phase, setPhase] = useState<'start' | 'end'>('end');
  const autoStarted = useRef(false);

  const last = defense ? t.defense.at : N - 1;
  const blocked = defense && step === t.defense.at;
  const done = step === last;
  const s = t.steps[step];

  // Autoplay once, the first time the board scrolls into view.
  useEffect(() => {
    if (seen && !reduced && !autoStarted.current) {
      autoStarted.current = true;
      setPlaying(true);
    }
  }, [seen, reduced]);

  // Advance while playing; stop on the last reachable step.
  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setStep((v) => Math.min(v + 1, last)), STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, step, done, last]);

  // Packet travel: jump to `from`, then glide to `to` on the next frame.
  useEffect(() => {
    if (s.from === s.to) return setPhase('end');
    setPhase('start');
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setPhase('end'));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [step, defense, s.from, s.to]);

  const go = (i: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(i, last)));
  };
  const onPlay = () => {
    if (playing) return setPlaying(false);
    if (done) setStep(0);
    setPlaying(true);
  };
  const toggleDefense = () => {
    setDefense((d) => !d);
    setStep(0);
    setPlaying(!reduced);
  };

  const x = (i: number) => `${((i + 0.5) / n) * 100}%`;
  const at = phase === 'start' ? s.from : s.to;
  const activeSet = new Set([s.from, s.to]);
  const mal = !!s.mal && !blocked;

  return (
    <div
      ref={rootRef}
      data-testid={`flow-${topic}`}
      data-step={step}
      data-defense={defense ? 'on' : 'off'}
      className="not-prose my-6 overflow-hidden rounded-xl border-2 border-[#2E382E] bg-[#DEDEDB] text-[#2E382E]"
    >
      <SecStyles />
      {/* Header: title + defense switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2E382E] bg-[#F4F4F1] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-[#5A645A]">{t.num}</span>
          <span className="bg-[#B9BAB6] px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em]">
            {tr(T.attack, lang)}
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={defense}
          onClick={toggleDefense}
          data-testid="defense-toggle"
          className={
            'flex items-center gap-2 border-2 px-2.5 py-1.5 text-xs font-extrabold transition-colors ' +
            (defense
              ? 'border-[#2E382E] bg-[#DDFF00] text-[#2E382E]'
              : 'border-[#8E948E] bg-white text-[#2E382E] hover:border-[#2E382E]') +
            (!defense && done && !playing ? ' sec-pulse' : '')
          }
        >
          <span
            aria-hidden
            className={
              'relative inline-block h-4 w-7 rounded-full transition-colors ' + (defense ? 'bg-[#3C4A3C]' : 'bg-[#B9BAB6]')
            }
          >
            <span
              className={
                'absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ' + (defense ? 'left-3.5' : 'left-0.5')
              }
            />
          </span>
          🛡 {tr(T.defense, lang)}
          <span className="hidden font-mono text-[11px] font-semibold sm:inline">· {tr(t.defense.name, lang)}</span>
        </button>
      </div>

      <div className="px-3 pb-4 pt-4 sm:px-5">
        {/* Actors */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {t.actors.map((a, i) => {
            const on = activeSet.has(i);
            const shield = blocked && i === s.to;
            return (
              <div
                key={i}
                className={
                  'relative flex min-h-[78px] flex-col items-center justify-center gap-1 border-2 px-1 py-2 text-center transition-all duration-300 ' +
                  (on
                    ? mal
                      ? 'border-[#FF6A2B] bg-[#3C4A3C] text-white shadow-[0_0_14px_rgba(255,106,43,.5)]'
                      : 'border-[#DDFF00] bg-[#3C4A3C] text-white shadow-[0_0_14px_rgba(221,255,0,.5)]'
                    : a.bad
                      ? 'border-dashed border-[#E39A7C] bg-[#F7ECE5] text-[#8F3010]'
                      : 'border-dashed border-[#8E948E] bg-[#F4F4F1]')
                }
              >
                {ICONS[a.kind]}
                <span className="text-[11px] font-bold leading-tight sm:text-xs">{tr(a.label, lang)}</span>
                {shield && (
                  <span className="sec-pop absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2E382E] bg-[#DDFF00] text-[#2E382E]">
                    {ICONS.shield}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Track + packet */}
        <div className="relative my-3 h-9" aria-hidden>
          <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-[#7C837C]" />
          <div
            key={`${step}-${defense}`}
            className={
              'absolute top-1/2 whitespace-nowrap border-2 px-2 py-0.5 font-mono text-[11px] font-bold ' +
              (blocked
                ? 'sec-shake border-[#5A645A] bg-[#B9BAB6] text-[#3A423A] line-through'
                : mal
                  ? 'border-[#2A1208] bg-[#FF6A2B] text-[#2A1208]'
                  : 'border-[#2E382E] bg-[#DDFF00] text-[#2E382E]')
            }
            style={{
              left: x(at),
              transform: 'translate(-50%, -50%)',
              transition: phase === 'end' && !reduced ? 'left .75s cubic-bezier(.4,0,.2,1)' : 'none',
            }}
          >
            {s.pkt}
          </div>
        </div>

        {/* Caption */}
        <div
          key={`cap-${step}-${defense}`}
          aria-live="polite"
          className={
            'sec-pop min-h-[96px] border-2 px-4 py-3 text-white ' +
            (blocked ? 'border-[#DDFF00] bg-[#3C4A3C]' : mal ? 'border-[#FF6A2B] bg-[#3C4A3C]' : 'border-[#DDFF00] bg-[#3C4A3C]')
          }
        >
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="bg-[#DDFF00] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#2E382E]">
              {tr(T.step, lang)} {step + 1} / {N}
            </span>
            {blocked && (
              <span className="bg-[#DDFF00] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#2E382E]">
                🛡 {tr(T.blocked, lang)}
              </span>
            )}
          </div>
          {blocked ? (
            <>
              <div className="m-0 text-sm text-[#B9C3B2] line-through">{tr(s.text, lang)}</div>
              <div className="m-0 mt-1 text-[15px] font-semibold leading-relaxed text-[#E8F5A8]">
                {tr(t.defense.name, lang)}: {tr(t.defense.msg, lang)}
              </div>
            </>
          ) : (
            <div className="m-0 text-[15px] font-semibold leading-relaxed">{tr(s.text, lang)}</div>
          )}
          {!defense && done && !playing && (
            <div className="sec-pop m-0 mt-2 text-sm text-[#FFD3BE]">{tr(T.success, lang)}</div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              aria-label={tr(T.prev, lang)}
              className="border-2 border-[#2E382E] px-2.5 py-1.5 text-xs font-extrabold disabled:opacity-30"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onPlay}
              data-testid="play"
              className="min-w-[84px] border-2 border-[#2E382E] bg-[#DDFF00] px-3 py-1.5 text-xs font-extrabold"
            >
              {playing ? `❚❚ ${tr(T.pause, lang)}` : done ? `↻ ${tr(T.replay, lang)}` : `▶ ${tr(T.play, lang)}`}
            </button>
            <button
              type="button"
              onClick={() => go(step + 1)}
              disabled={done}
              aria-label={tr(T.next, lang)}
              data-testid="next"
              className="border-2 border-[#2E382E] px-2.5 py-1.5 text-xs font-extrabold disabled:opacity-30"
            >
              ›
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            {t.steps.map((_, i) => {
              const unreachable = i > last;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  disabled={unreachable}
                  aria-label={`${tr(T.goto, lang)} ${i + 1}`}
                  aria-current={i === step ? 'step' : undefined}
                  className={
                    'h-2.5 transition-all ' +
                    (i === step
                      ? 'w-7 border-[1.5px] border-[#2E382E] bg-[#DDFF00]'
                      : unreachable
                        ? 'w-2.5 bg-[#C8CAC5] opacity-50'
                        : 'w-2.5 bg-[#A9ADA6] hover:bg-[#7C837C]')
                  }
                />
              );
            })}
          </div>
        </div>
        <a
          href={`/security/${t.file}`}
          className="mt-3 inline-block text-xs font-bold text-[#3C4A3C] underline decoration-[#9DB800] decoration-2 underline-offset-4 hover:text-[#2E382E]"
        >
          ▶ {tr(T.full, lang)} →
        </a>
      </div>
    </div>
  );
}
