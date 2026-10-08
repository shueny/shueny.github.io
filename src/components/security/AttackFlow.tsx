import { useEffect, useRef, useState } from 'react';
import { TOPICS } from './topics';
import { BrickFloor, ICONS, PixelCloud, SecStyles, tr, useFirstVisible, useReducedMotion, type L, type Lang } from './ui';

const T: Record<string, L> = {
  attack: { zh: '攻擊流程', en: 'Attack flow', de: 'Angriffsablauf' },
  stage: { zh: 'STAGE', en: 'STAGE', de: 'STAGE' },
  hit: { zh: '攻擊命中！', en: 'ATTACK HIT!', de: 'TREFFER!' },
  blockTag: { zh: 'BLOCK! +100', en: 'BLOCK! +100', de: 'BLOCK! +100' },
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
      className="sec-root not-prose relative my-8 border-4 border-[#222034] bg-[#6EC6FF] text-[#222034] shadow-[6px_6px_0_#222034]"
    >
      <SecStyles />
      {/* Header: stage badge + defense switch */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b-4 border-[#222034] bg-[#FFF4D6] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="sec-px border-[3px] border-[#222034] bg-[#FFC93C] px-2 py-1 text-[13px] shadow-[3px_3px_0_#222034]">
            {tr(T.stage, lang)} {t.num}
          </span>
          <span className="text-xs font-extrabold text-[#4B3F72]">{tr(T.attack, lang)}</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={defense}
          onClick={toggleDefense}
          data-testid="defense-toggle"
          className={
            'sec-btn flex items-center gap-2 border-[3px] border-[#222034] px-2.5 py-1.5 text-xs font-extrabold ' +
            (defense ? 'bg-[#3CB043] text-white' : 'bg-white text-[#222034]') +
            (!defense && done && !playing ? ' sec-pulse' : '')
          }
        >
          <span aria-hidden className={'relative inline-block h-4 w-8 border-2 border-[#222034] ' + (defense ? 'bg-[#2C2F6B]' : 'bg-[#FFE7A3]')}>
            <span className={'absolute top-0 h-3 w-3 bg-white shadow-[inset_-2px_-2px_0_#9FA3E3] ' + (defense ? 'left-4' : 'left-0')} />
          </span>
          🛡 {tr(T.defense, lang)}
          <span className="hidden font-mono text-[11px] font-semibold sm:inline">· {tr(t.defense.name, lang)}</span>
        </button>
      </div>

      <div className="relative overflow-hidden px-3 pb-4 pt-5 sm:px-5">
        <PixelCloud className="left-[12%] top-1 hidden opacity-90 sm:block" />
        <PixelCloud className="right-[18%] top-0 opacity-90" />
        {/* Actors */}
        <div className="relative grid gap-2 pt-4 sm:gap-3" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {t.actors.map((a, i) => {
            const on = activeSet.has(i);
            const shield = blocked && i === s.to;
            return (
              <div
                key={on ? `${i}-${step}-${defense}` : i}
                className={
                  'relative flex min-h-[80px] flex-col items-center justify-center gap-1 border-[3px] px-1 py-2 text-center shadow-[4px_4px_0_#222034] ' +
                  (on
                    ? (mal ? 'border-[#E43B44] bg-[#2C2F6B] text-white' : 'border-[#FFC93C] bg-[#2C2F6B] text-white') + (reduced ? '' : ' sec-hop')
                    : a.bad
                      ? 'border-[#222034] bg-[#FFE0E3] text-[#9E1A2C]'
                      : 'border-[#222034] bg-[#FFF4D6]')
                }
              >
                {ICONS[a.kind]}
                <span className="text-[11px] font-bold leading-tight sm:text-xs">{tr(a.label, lang)}</span>
                {shield && (
                  <>
                    <span className="sec-pop absolute -right-2.5 -top-2.5 flex h-9 w-9 items-center justify-center border-[3px] border-[#222034] bg-[#3CB043] text-white shadow-[3px_3px_0_#222034]">
                      {ICONS.shield}
                    </span>
                    <span className="sec-px sec-rise absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[13px] text-white [text-shadow:2px_2px_0_#222034]">
                      BLOCK!
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Ground + packet */}
        <div className="relative mb-3 mt-4 h-12" aria-hidden>
          <div className="sec-bricks absolute inset-x-0 bottom-0 h-3.5 border-y-[3px] border-[#222034]" />
          <div
            key={`${step}-${defense}`}
            className={
              'sec-px absolute top-[42%] flex items-center gap-1.5 whitespace-nowrap border-[3px] px-2 py-1 text-[11px] shadow-[3px_3px_0_#222034] ' +
              (blocked
                ? 'sec-shake border-[#222034] bg-[#C9CCEB] text-[#5A4E7C] line-through'
                : mal
                  ? 'border-[#222034] bg-[#E43B44] text-white'
                  : 'border-[#222034] bg-[#FFF4D6] text-[#222034]')
            }
            style={{
              left: x(at),
              transform: 'translate(-50%, -50%)',
              transition: phase === 'end' && !reduced ? 'left .75s steps(10, end)' : 'none',
            }}
          >
            {mal || blocked ? <span>✸</span> : <span className="sec-coin sec-spin inline-block h-3 w-3" />}
            {s.pkt}
          </div>
        </div>

        {/* Caption: RPG dialog box */}
        <div
          key={`cap-${step}-${defense}`}
          aria-live="polite"
          className={
            'sec-pop relative min-h-[100px] border-4 bg-[#2C2F6B] px-4 py-3 text-white shadow-[0_0_0_3px_#222034,6px_6px_0_3px_#222034] ' +
            (blocked ? 'border-[#3CB043]' : mal ? 'border-[#E43B44]' : 'border-white')
          }
        >
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="sec-px border-2 border-[#222034] bg-[#FFC93C] px-1.5 py-0.5 text-[11px] text-[#222034]">
              {tr(T.step, lang)} {step + 1}/{N}
            </span>
            {blocked && (
              <span className="sec-px flex items-center gap-1 border-2 border-[#222034] bg-[#3CB043] px-1.5 py-0.5 text-[11px] text-white">
                <span className="sec-coin inline-block h-2.5 w-2.5" /> {tr(T.blockTag, lang)}
              </span>
            )}
            {blocked && <span className="text-[11px] font-bold text-[#DDF5D6]">🛡 {tr(T.blocked, lang)}</span>}
            {!defense && done && !playing && (
              <span className="sec-px border-2 border-[#222034] bg-[#E43B44] px-1.5 py-0.5 text-[11px] text-white">{tr(T.hit, lang)}</span>
            )}
          </div>
          {blocked ? (
            <>
              <div className="m-0 text-sm text-[#A9ACE6] line-through">{tr(s.text, lang)}</div>
              <div className="m-0 mt-1 text-[15px] font-semibold leading-relaxed text-[#FFE58A]">
                {tr(t.defense.name, lang)}: {tr(t.defense.msg, lang)}
              </div>
            </>
          ) : (
            <div className="m-0 text-[15px] font-semibold leading-relaxed">{tr(s.text, lang)}</div>
          )}
          {!defense && done && !playing && <div className="sec-pop m-0 mt-2 text-sm text-[#FFB3B8]">{tr(T.success, lang)}</div>}
          {!done && <span aria-hidden className="sec-blink absolute bottom-1.5 right-3 text-xs text-[#FFC93C]">▼</span>}
        </div>

        {/* Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              aria-label={tr(T.prev, lang)}
              className="sec-btn border-[3px] border-[#222034] bg-white px-3 py-1.5 text-sm font-extrabold disabled:opacity-40"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={onPlay}
              data-testid="play"
              className="sec-btn min-w-[96px] border-[3px] border-[#222034] bg-[#FFC93C] px-3 py-1.5 text-xs font-extrabold"
            >
              {playing ? `❚❚ ${tr(T.pause, lang)}` : done ? `↻ ${tr(T.replay, lang)}` : `▶ ${tr(T.play, lang)}`}
            </button>
            <button
              type="button"
              onClick={() => go(step + 1)}
              disabled={done}
              aria-label={tr(T.next, lang)}
              data-testid="next"
              className="sec-btn border-[3px] border-[#222034] bg-white px-3 py-1.5 text-sm font-extrabold disabled:opacity-40"
            >
              ▶
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
                    'h-3.5 w-3.5 border-2 border-[#222034] ' +
                    (i === step
                      ? 'sec-coin scale-125'
                      : unreachable
                        ? 'bg-[#C9CCEB] opacity-50'
                        : i < step
                          ? 'bg-[#FFC93C]'
                          : 'bg-white hover:bg-[#FFE7A3]')
                  }
                />
              );
            })}
          </div>
        </div>
        <a
          href={`/security/${t.file}`}
          className="mt-4 inline-block border-b-[3px] border-[#222034] text-xs font-extrabold text-[#222034] hover:text-[#2C2F6B]"
        >
          ▶ {tr(T.full, lang)} →
        </a>
      </div>
      <BrickFloor />
    </div>
  );
}
