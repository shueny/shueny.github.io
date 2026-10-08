import { memo, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { TOPICS, type Topic } from './topics';
import { PixelSprite, SPRITES, spriteFor, spriteSize, type Sprite } from './sprites';
import { SecStyles, tr, useReducedMotion, type L, type Lang } from './ui';

/**
 * "Security Quest": a pixel-art explainer laid out like a video player.
 * A single timeline runs START → four worlds of stages → CLEAR. Each stage
 * shows a title card, the five attack steps and the defense that stops it.
 * Everything is derived from one number, the playhead `t` (ms at 1x).
 */

const l = (zh: string, en: string, de: string): L => ({ zh, en, de });

const WORLDS: { name: L; topics: string[] }[] = [
  { name: l('注入與執行', 'Injection & execution', 'Injection & Ausführung'), topics: ['xss', 'token', 'csp'] },
  { name: l('瀏覽器的自動行為', 'Abused browser defaults', 'Missbrauchtes Browser-Verhalten'), topics: ['csrf', 'cors', 'clickjacking', 'redirect'] },
  { name: l('信任邊界放錯地方', 'Trust boundary in the wrong place', 'Vertrauensgrenze am falschen Ort'), topics: ['authz', 'secrets', 'console', 'sourcemap'] },
  { name: l('供應鏈與傳輸', 'Supply chain & transport', 'Lieferkette & Transport'), topics: ['supply', 'sri', 'mixed'] },
];

const T: Record<string, L> = {
  subtitle: l('前端資安 · 像素動畫教學 · a pixel-art explainer', 'Frontend security · a pixel-art explainer', 'Frontend-Sicherheit · ein Pixel-Art-Erklärstück'),
  tagline: l('前端資安大冒險', 'A frontend security adventure', 'Ein Frontend-Sicherheitsabenteuer'),
  start: l('▶ 開始冒險', '▶ Start quest', '▶ Abenteuer starten'),
  titleScreen: l('開始畫面', 'Title', 'Titelbild'),
  intro: l(
    '跟著小勇者闖過四個世界：每一關先看攻擊怎麼一步步得逞，再看防禦在哪一步把它擋下。準備好了就按「開始冒險」！',
    'Follow the little hero through four worlds. In every stage, watch the attack succeed step by step, then see exactly where the defense stops it. Press "Start quest" when you are ready!',
    'Begleite den kleinen Helden durch vier Welten. In jeder Stage siehst du, wie der Angriff Schritt für Schritt gelingt, und dann, wo die Abwehr ihn stoppt. Drück „Abenteuer starten", wenn du bereit bist!'
  ),
  clearTitle: l('全部通關', 'All clear', 'Alles geschafft'),
  clear: l(
    '全部通關！記住四件事：使用者送進來的都不可信；送到瀏覽器的都是公開的；瀏覽器的方便功能，也是攻擊者的方便功能；每一層都要假設上一層可能失守。',
    'All clear! Remember four things: never trust what the user sends in; everything sent to the browser is public; the browser’s conveniences are the attacker’s too; every layer should assume the one before it can fail.',
    'Alles geschafft! Merk dir vier Dinge: Was der Nutzer schickt, ist nie vertrauenswürdig; alles im Browser ist öffentlich; die Komfortfunktionen des Browsers helfen auch Angreifern; jede Ebene muss mit dem Versagen der vorigen rechnen.'
  ),
  world: l('世界', 'World', 'Welt'),
  attack: l('攻擊', 'attack', 'Angriff'),
  defense: l('防禦', 'defense', 'Abwehr'),
  data: l('資料', 'data', 'Daten'),
  note: l(
    '時間軸上的秒數是播放時間，不是真實攻擊需要的時間。',
    'Times on the timeline are playback time, not how long a real attack takes.',
    'Die Zeiten auf der Zeitleiste sind Abspielzeit, nicht die Dauer eines echten Angriffs.'
  ),
  play: l('播放', 'Play', 'Abspielen'),
  pause: l('暫停', 'Pause', 'Pause'),
  prev: l('上一關', 'Previous chapter', 'Vorheriges Kapitel'),
  next: l('下一關', 'Next chapter', 'Nächstes Kapitel'),
  restart: l('從頭開始', 'Restart', 'Neustart'),
  speed: l('播放速度', 'Playback speed', 'Geschwindigkeit'),
  seek: l('播放進度', 'Playback position', 'Wiedergabeposition'),
  chapters: l('關卡', 'Chapters', 'Kapitel'),
  full: l('看這一關的完整動畫', 'Open the full animation for this stage', 'Ganze Animation dieser Stage'),
};

// Beat lengths at 1x. Stage = title + 5 steps + defense.
const D = { start: 3000, title: 2200, step: 3000, defense: 4800, clear: 9000 };
const TYPE_MS = 22; // per character
const SPEEDS = [1, 1.5, 2];

type Beat =
  | { kind: 'start'; chapter: string; start: number; dur: number }
  | { kind: 'clear'; chapter: string; start: number; dur: number }
  | { kind: 'title'; chapter: string; start: number; dur: number; topic: Topic; world: number }
  | { kind: 'step'; chapter: string; start: number; dur: number; topic: Topic; world: number; i: number }
  | { kind: 'defense'; chapter: string; start: number; dur: number; topic: Topic; world: number };

type Chapter = { id: string; start: number; topic?: Topic; world?: number };
// Omit that keeps each member of the Beat union intact.
type BeatInput = Beat extends infer B ? (B extends Beat ? Omit<B, 'start'> : never) : never;

function buildTimeline() {
  const beats: Beat[] = [];
  const chapters: Chapter[] = [];
  let at = 0;
  const push = (b: BeatInput) => {
    beats.push({ ...b, start: at } as Beat);
    at += b.dur;
  };
  chapters.push({ id: 'start', start: 0 });
  push({ kind: 'start', chapter: 'start', dur: D.start });
  WORLDS.forEach((w, wi) =>
    w.topics.forEach((id, si) => {
      const topic = TOPICS[id];
      const chapter = `${wi + 1}-${si + 1}`;
      chapters.push({ id: chapter, start: at, topic, world: wi });
      push({ kind: 'title', chapter, dur: D.title, topic, world: wi });
      topic.steps.forEach((_, i) => push({ kind: 'step', chapter, dur: D.step, topic, world: wi, i }));
      push({ kind: 'defense', chapter, dur: D.defense, topic, world: wi });
    })
  );
  chapters.push({ id: 'clear', start: at });
  push({ kind: 'clear', chapter: 'clear', dur: D.clear });
  return { beats, chapters, total: at };
}

const TIMELINE = buildTimeline();

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/* ---------------------------------- scene --------------------------------- */

const W = 320;
const GROUND = 148;

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
}

function hill(cx: number, half: number, height: number, fill: string, key: string) {
  const rects: JSX.Element[] = [];
  for (let x = cx - half; x < cx + half; x += 6) {
    const d = (x + 3 - cx) / half;
    const h = Math.max(0, Math.round((height * (1 - d * d)) / 4) * 4);
    if (h) rects.push(<rect key={`${key}${x}`} x={x} y={GROUND - h} width={6} height={h} fill={fill} />);
  }
  return rects;
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const u = 4 * s;
  const parts: [number, number, number, number][] = [
    [2, 0, 4, 1],
    [1, 1, 7, 1],
    [0, 2, 10, 2],
  ];
  return (
    <g>
      {parts.map(([px, py, pw, ph], i) => (
        <rect key={i} x={x + px * u} y={y + py * u} width={pw * u} height={ph * u} fill="#FFFFFF" />
      ))}
      <rect x={x} y={y + 4 * u - 2} width={10 * u} height={2} fill="#DCEFFF" />
    </g>
  );
}

/** Sky, clouds, hills and ground never change: render once. */
const Backdrop = memo(function Backdrop() {
  const r = rand(7);
  const specks: JSX.Element[] = [];
  for (let i = 0; i < 70; i++) {
    const x = Math.floor(r() * W);
    const y = GROUND + 8 + Math.floor(r() * 26);
    specks.push(<rect key={i} x={x} y={y} width={r() > 0.7 ? 3 : 2} height={2} fill={r() > 0.5 ? '#A85A26' : '#E39A5C'} />);
  }
  return (
    <g>
      <rect x={0} y={0} width={W} height={92} fill="#8FD3FF" />
      <rect x={0} y={92} width={W} height={GROUND - 92} fill="#B5E4FF" />
      <g className="sq-drift">
        <Cloud x={24} y={22} />
        <Cloud x={150} y={12} s={0.8} />
        <Cloud x={250} y={30} />
        <Cloud x={330} y={18} s={0.8} />
      </g>
      {hill(40, 70, 46, '#5BBF6A', 'a')}
      {hill(250, 90, 58, '#5BBF6A', 'b')}
      {hill(140, 60, 30, '#3E9B4F', 'c')}
      {hill(320, 60, 40, '#3E9B4F', 'd')}
      <rect x={0} y={GROUND} width={W} height={4} fill="#6BD06B" />
      <rect x={0} y={GROUND + 4} width={W} height={180 - GROUND - 4} fill="#C9773A" />
      <rect x={0} y={GROUND + 4} width={W} height={2} fill="#A85A26" />
      {specks}
    </g>
  );
});

const GREY: Sprite = { rows: SPRITES.bomb.rows, palette: { ...SPRITES.bomb.palette, r: '#9FA3E3', w: '#DCDDFF', y: '#C9CCEB' } };

const actorX = (i: number, n: number) => (n === 1 ? W / 2 : 46 + (i * (W - 92)) / (n - 1));

function placed(s: Sprite, cx: number, px = 2) {
  const { w, h } = spriteSize(s, px);
  return { x: Math.round(cx - w / 2), y: GROUND - h };
}

/* --------------------------------- player --------------------------------- */

export default function SecurityQuest({ lang = 'en' }: { lang?: Lang }) {
  const { beats, chapters, total } = TIMELINE;
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const chipsRef = useRef<HTMLDivElement>(null);

  // Playback clock.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last) * speedRef.current;
      last = now;
      setT((v) => Math.min(total, v + dt));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  useEffect(() => {
    if (playing && t >= total) setPlaying(false);
  }, [t, playing, total]);

  const beat = useMemo(() => {
    for (let i = beats.length - 1; i >= 0; i--) if (t >= beats[i].start) return beats[i];
    return beats[0];
  }, [t, beats]);
  const e = t - beat.start; // ms into the beat
  const chapterIdx = chapters.findIndex((c) => c.id === beat.chapter);

  const seek = (ms: number, play = playing) => {
    setT(Math.max(0, Math.min(total, ms)));
    setPlaying(play && ms < total);
  };
  const goChapter = (i: number) => seek(chapters[Math.max(0, Math.min(chapters.length - 1, i))].start, true);
  const onPlay = () => {
    if (playing) return setPlaying(false);
    if (t >= total) setT(0);
    setPlaying(true);
  };
  // Keep the current chapter chip visible in its scrolling row (horizontal only, never the page).
  useEffect(() => {
    const row = chipsRef.current;
    const chipEl = row?.children[chapterIdx] as HTMLElement | undefined;
    if (!row || !chipEl) return;
    const left = chipEl.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + chipEl.offsetWidth > row.scrollLeft + row.clientWidth)
      row.scrollTo({ left: left - row.clientWidth / 2 + chipEl.offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
  }, [chapterIdx, reduced]);

  const onPrev = () => goChapter(e > 1500 || beat.kind !== 'title' ? chapterIdx : chapterIdx - 1);

  /* ----- what the dialog box says ----- */
  let chip = 'START';
  let heading = tr(T.titleScreen, lang);
  let tag: { text: string; tone: 'red' | 'green' | 'blue' } | null = null;
  let text = tr(T.intro, lang);
  if (beat.kind === 'clear') {
    chip = 'CLEAR';
    heading = tr(T.clearTitle, lang);
    text = tr(T.clear, lang);
  } else if (beat.kind !== 'start') {
    const topic = beat.topic;
    chip = beat.chapter;
    heading = `${tr(topic.title, lang)} · ${tr(WORLDS[beat.world].name, lang)}`;
    if (beat.kind === 'title') {
      tag = { text: `${tr(T.world, lang).toUpperCase()} ${beat.chapter}`, tone: 'blue' };
      text = `${tr(WORLDS[beat.world].name, lang)} → ${tr(topic.title, lang)}`;
    } else if (beat.kind === 'step') {
      tag = { text: `ATTACK ${beat.i + 1}/${topic.steps.length}`, tone: 'red' };
      text = tr(topic.steps[beat.i].text, lang);
    } else {
      tag = { text: 'DEFENSE', tone: 'green' };
      text = `${tr(topic.defense.name, lang)}${lang === 'zh' ? '：' : ': '}${tr(topic.defense.msg, lang)}`;
    }
  }
  const typing = beat.kind !== 'start' && !reduced;
  const shown = typing ? Math.min(text.length, Math.floor(e / TYPE_MS)) : text.length;

  /* ----- what the screen shows ----- */
  const stepView = beat.kind === 'step' || beat.kind === 'defense';
  const topic = 'topic' in beat ? beat.topic : null;
  const stepIdx = beat.kind === 'step' ? beat.i : beat.kind === 'defense' ? beat.topic.defense.at : -1;
  const step = topic && stepIdx >= 0 ? topic.steps[stepIdx] : null;
  const n = topic?.actors.length ?? 0;

  let packet: { x: number; y: number; sprite: Sprite } | null = null;
  let shieldAt: number | null = null;
  if (topic && step) {
    const fx = actorX(step.from, n);
    const tx = actorX(step.to, n);
    const travel = 900;
    let p = reduced ? 1 : Math.min(1, e / travel);
    if (beat.kind === 'defense') {
      shieldAt = tx + (step.from === step.to ? 0 : step.from < step.to ? -22 : 22);
      // Fly toward the target, stop at the shield, then get knocked back.
      const stopAt = step.from === step.to ? 1 : 0.62;
      p = reduced ? stopAt : e < travel ? (e / travel) * stopAt : Math.max(0, stopAt - ((e - travel) / 1600) * stopAt);
    }
    const q = Math.round(p * 12) / 12; // stepped, pixel-game motion
    const same = step.from === step.to;
    const bob = same && !reduced ? (Math.floor(e / 220) % 2) * 3 : 0;
    const x = fx + (tx - fx) * q - 8;
    const y = GROUND - 46 - (same ? bob : Math.sin(Math.PI * q) * 24);
    packet = {
      x,
      y,
      sprite: beat.kind === 'defense' && e > travel ? GREY : step.mal ? SPRITES.bomb : SPRITES.coin,
    };
  }

  const hopIdx = beat.kind === 'step' && step && !reduced && e < 500 ? step.to : -1;
  const heroWalk = beat.kind === 'title' ? (reduced ? 1 : Math.min(1, e / (D.title * 0.8))) : 0;

  return (
    <section data-testid="quest" data-chapter={beat.chapter} data-kind={beat.kind} data-playing={playing ? 'yes' : 'no'} className="not-prose my-10 bg-[#14122B] p-3 text-[#F5F1FF] shadow-[8px_8px_0_#222034] sm:p-5">
      <SecStyles />
      <style dangerouslySetInnerHTML={{ __html: QUEST_CSS }} />

      {/* Header */}
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div className="sec-px text-[18px] text-[#FFC93C] [text-shadow:3px_3px_0_#000] sm:text-[24px]">SECURITY QUEST</div>
        <div className="text-xs text-[#C9CCEB]">{tr(T.subtitle, lang)}</div>
      </div>

      {/* Screen */}
      <div className="border-4 border-[#3B3A78] bg-[#3B3A78] p-[3px] shadow-[6px_6px_0_#000]">
        <div className="sq-screen relative w-full overflow-hidden border-4 border-[#000]" style={{ aspectRatio: '16 / 9' }}>
          <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" shapeRendering="crispEdges" aria-hidden>
            <Backdrop />
            {beat.kind === 'start' && (
              <>
                <PixelSprite sprite={SPRITES.db} {...placed(SPRITES.db, 36)} />
                <PixelSprite sprite={SPRITES.user} {...placed(SPRITES.user, 84)} />
                <PixelSprite sprite={SPRITES.bug} {...placed(SPRITES.bug, 266)} className={reduced ? '' : 'sq-bob'} />
              </>
            )}
            {beat.kind === 'title' && (
              <PixelSprite sprite={SPRITES.user} {...placed(SPRITES.user, 20 + heroWalk * 120)} className={reduced || heroWalk >= 1 ? '' : 'sq-walk'} />
            )}
            {stepView &&
              topic!.actors.map((a, i) => {
                const s = cachedSprite(a.kind, !!a.bad);
                return <PixelSprite key={`${i}-${hopIdx === i ? beat.start : 0}`} sprite={s} {...placed(s, actorX(i, n))} className={hopIdx === i ? 'sq-hop' : ''} />;
              })}
            {shieldAt !== null && <PixelSprite sprite={SPRITES.shield} {...placed(SPRITES.shield, shieldAt)} className={reduced ? '' : 'sq-pop'} />}
            {packet && <PixelSprite sprite={packet.sprite} x={packet.x} y={packet.y} />}
            {beat.kind === 'clear' && (
              <>
                <PixelSprite sprite={SPRITES.user} {...placed(SPRITES.user, 150)} />
                <PixelSprite sprite={SPRITES.shield} {...placed(SPRITES.shield, 178)} />
                {[0, 1, 2, 3, 4, 5, 6].map((k) => (
                  <PixelSprite
                    key={k}
                    sprite={SPRITES.coin}
                    x={64 + k * 30}
                    y={reduced ? 92 : 92 - ((Math.floor(e / 120) + k * 3) % 10) * 3}
                  />
                ))}
              </>
            )}
          </svg>

          {/* HTML overlays (text stays crisp and CJK-readable) */}
          {stepView &&
            topic!.actors.map((a, i) => (
              <div
                key={i}
                className="sq-label absolute -translate-x-1/2 text-center font-bold leading-tight"
                style={{ left: `${(actorX(i, n) / W) * 100}%`, top: '85%', width: `${92 / n}%`, color: a.bad ? '#FFB3B8' : '#FFFFFF' }}
              >
                {tr(a.label, lang)}
              </div>
            ))}
          {stepView && step && (
            <div
              className="sec-px sq-label absolute -translate-x-1/2 -translate-y-full whitespace-nowrap"
              style={{ left: `${((packet!.x + 8) / W) * 100}%`, top: `${(packet!.y / 180) * 100}%`, color: '#FFE58A' }}
            >
              {step.pkt}
            </div>
          )}
          {shieldAt !== null && !reduced && (
            <div
              key={beat.start}
              className="sec-px sec-rise sq-label absolute -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${(shieldAt / W) * 100}%`, top: '30%', color: '#FFFFFF', fontSize: 'max(11px, 3cqw)' }}
            >
              BLOCK!
            </div>
          )}

          {beat.kind === 'start' && (
            <div className="absolute inset-x-0 top-[8%] flex flex-col items-center gap-[1.6cqw] text-center">
              <div className="sec-px sq-title" style={{ fontSize: 'max(11px, 6.4cqw)', color: '#FFC93C' }}>
                SECURITY
              </div>
              <div className="sec-px sq-title" style={{ fontSize: 'max(11px, 6.4cqw)', color: '#E43B44', marginTop: '-0.6cqw' }}>
                QUEST
              </div>
              <div className="sq-title font-extrabold" style={{ fontSize: 'max(10px, 4.4cqw)', color: '#FFFFFF' }}>
                {tr(T.tagline, lang)}
              </div>
              <button
                type="button"
                onClick={() => seek(0, true)}
                data-testid="quest-start"
                className="sec-btn mt-[1.5cqw] border-4 border-[#000] bg-[#FFC93C] font-extrabold text-[#222034]"
                style={{ fontSize: 'max(10px, 2.2cqw)', padding: 'max(3px,1.2cqw) max(8px,4cqw)' }}
              >
                {tr(T.start, lang)}
              </button>
            </div>
          )}
          {beat.kind === 'title' && (
            <div className="absolute inset-x-0 top-[14%] flex flex-col items-center text-center">
              <div className="sec-px sq-title" style={{ fontSize: 'max(11px, 5.2cqw)', color: '#FFC93C' }}>
                {tr(T.world, lang).toUpperCase()} {beat.chapter}
              </div>
              <div className="sq-title mt-[1.5cqw] font-extrabold" style={{ fontSize: 'max(11px, 4.6cqw)', color: '#FFFFFF' }}>
                {tr(beat.topic.title, lang)}
              </div>
              <div className="sq-label mt-[1cqw] font-bold" style={{ fontSize: 'max(10px, 2cqw)', color: '#DCEFFF' }}>
                {tr(WORLDS[beat.world].name, lang)}
              </div>
            </div>
          )}
          {beat.kind === 'clear' && (
            <div className="absolute inset-x-0 top-[10%] flex flex-col items-center text-center">
              <div className="sec-px sq-title" style={{ fontSize: 'max(11px, 6.4cqw)', color: '#FFC93C' }}>
                ALL CLEAR!
              </div>
              <div className="sq-title mt-[1.4cqw] font-extrabold" style={{ fontSize: 'max(10px, 3.6cqw)', color: '#FFFFFF' }}>
                {tr(T.clearTitle, lang)} ★
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Ctl label={tr(T.prev, lang)} onClick={onPrev} testId="quest-prev">◀◀</Ctl>
          <Ctl label={playing ? tr(T.pause, lang) : tr(T.play, lang)} onClick={onPlay} testId="quest-play" primary>
            {playing ? '❚❚' : '▶'}
          </Ctl>
          <Ctl label={tr(T.next, lang)} onClick={() => goChapter(chapterIdx + 1)} testId="quest-next">▶▶</Ctl>
          <Ctl label={tr(T.restart, lang)} onClick={() => seek(0, true)} testId="quest-restart">↺</Ctl>
          <Ctl label={tr(T.speed, lang)} onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])} testId="quest-speed">
            {speed}x
          </Ctl>
        </div>
        <div className="sec-px text-[12px] text-[#C9CCEB]" data-testid="quest-time">
          {fmt(t)} / {fmt(total)}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mt-3 pt-2.5">
        {chapters.slice(1).map((c) => (
          <span key={c.id} aria-hidden className="absolute top-0 h-2 w-[3px] bg-[#6B6FB5]" style={{ left: `${(c.start / total) * 100}%` }} />
        ))}
        <div
          role="slider"
          tabIndex={0}
          aria-label={tr(T.seek, lang)}
          aria-valuemin={0}
          aria-valuemax={Math.round(total / 1000)}
          aria-valuenow={Math.round(t / 1000)}
          aria-valuetext={`${fmt(t)} / ${fmt(total)}`}
          data-testid="quest-timeline"
          onClick={(ev) => {
            const r = ev.currentTarget.getBoundingClientRect();
            seek(((ev.clientX - r.left) / r.width) * total);
          }}
          onKeyDown={(ev) => {
            if (ev.key === 'ArrowRight') seek(t + 5000);
            else if (ev.key === 'ArrowLeft') seek(t - 5000);
            else if (ev.key === 'Home') seek(0);
            else if (ev.key === 'End') seek(total);
            else if (ev.key === ' ' || ev.key === 'Enter') onPlay();
            else return;
            ev.preventDefault();
          }}
          className="relative h-4 cursor-pointer border-[3px] border-[#3B3A78] bg-[#0C0B1E] focus:outline-none focus-visible:border-[#FFC93C]"
        >
          <div className="h-full bg-[#3B3A78]" style={{ width: `${(t / total) * 100}%` }} />
          <div className="absolute top-[-3px] h-4 w-2.5 border-2 border-[#000] bg-[#FFC93C]" style={{ left: `calc(${(t / total) * 100}% - 5px)` }} />
        </div>
      </div>

      {/* Chapter chips */}
      <div ref={chipsRef} className="relative mt-3 flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label={tr(T.chapters, lang)}>
        {chapters.map((c, i) => {
          const on = i === chapterIdx;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => goChapter(i)}
              aria-current={on ? 'step' : undefined}
              title={c.topic ? tr(c.topic.title, lang) : undefined}
              data-testid={`quest-chip-${c.id}`}
              className={
                'sec-px shrink-0 border-2 px-2 py-1 text-[11px] ' +
                (on ? 'border-[#FFC93C] bg-[#FFC93C] text-[#222034]' : i < chapterIdx ? 'border-[#3B3A78] text-[#6B6FB5]' : 'border-[#3B3A78] text-[#C9CCEB] hover:border-[#C9CCEB]')
              }
            >
              {c.id.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Dialog box */}
      <div className="mt-4 border-4 border-[#FFF4D6] bg-[#221F4A] p-4 shadow-[0_0_0_4px_#000,6px_6px_0_4px_#000]" aria-live="polite" data-testid="quest-dialog">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="sec-px border-2 border-[#000] bg-[#FFC93C] px-2 py-0.5 text-[12px] text-[#222034]">{chip.toUpperCase()}</span>
          <span className="text-sm font-bold text-[#DCDDFF]">{heading}</span>
          {tag && (
            <span
              className={
                'sec-px border-2 border-[#000] px-1.5 py-0.5 text-[11px] ' +
                (tag.tone === 'red' ? 'bg-[#E43B44] text-white' : tag.tone === 'green' ? 'bg-[#3CB043] text-white' : 'bg-[#3D7BFF] text-white')
              }
            >
              {tag.text}
            </span>
          )}
        </div>
        <div className="min-h-[72px] text-[15px] font-semibold leading-relaxed text-white" data-testid="quest-text">
          <span className="sr-only">{text}</span>
          <span aria-hidden>{text.slice(0, shown)}</span>
          <span aria-hidden className="sec-blink ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[3px] bg-[#FFC93C]" />
        </div>
        {topic && (
          <a href={`/security/${topic.file}`} className="mt-1 inline-block text-xs font-bold text-[#FFC93C] underline underline-offset-4">
            ▶ {tr(T.full, lang)} →
          </a>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-dashed border-[#3B3A78] pt-3 text-xs">
          <Legend color="#E43B44" chip="ATK" label={tr(T.attack, lang)} />
          <Legend color="#3CB043" chip="DEF" label={tr(T.defense, lang)} />
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#000] bg-[#FFC93C]" />
            <span className="text-[#C9CCEB]">{tr(T.data, lang)}</span>
          </span>
        </div>
      </div>
      <div className="mt-3 text-[11px] text-[#8F92D8]">{tr(T.note, lang)}</div>
    </section>
  );
}

const spriteCache = new Map<string, Sprite>();
function cachedSprite(kind: string, bad: boolean) {
  const k = `${kind}:${bad}`;
  if (!spriteCache.has(k)) spriteCache.set(k, spriteFor(kind, bad));
  return spriteCache.get(k)!;
}

function Ctl({ children, label, onClick, testId, primary }: { children: ReactNode; label: string; onClick: () => void; testId: string; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      data-testid={testId}
      className={'sec-btn min-w-[42px] border-[3px] border-[#000] px-2.5 py-1.5 text-[13px] font-extrabold ' + (primary ? 'bg-[#FFC93C] text-[#222034]' : 'bg-[#221F4A] text-[#F5F1FF]')}
    >
      {children}
    </button>
  );
}

function Legend({ color, chip, label }: { color: string; chip: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="sec-px border-2 border-[#000] px-1.5 py-0.5 text-[10px] text-white" style={{ background: color }}>
        {chip}
      </span>
      <span className="text-[#C9CCEB]">{label}</span>
    </span>
  );
}

const QUEST_CSS = `
.sq-screen{container-type:inline-size}
.sq-label{font-size:max(8px,1.9cqw);text-shadow:2px 0 #222034,-2px 0 #222034,0 2px #222034,0 -2px #222034,2px 2px #222034}
.sq-title{line-height:1.15;text-shadow:3px 3px 0 #222034,-1px -1px 0 #222034,1px -1px 0 #222034,-1px 1px 0 #222034}
@keyframes sqDrift{from{transform:translateX(0)}to{transform:translateX(-60px)}}
@keyframes sqBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes sqHop{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
@keyframes sqPop{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes sqWalk{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.sq-drift{animation:sqDrift 30s steps(60,end) infinite alternate}
.sq-bob{animation:sqBob 1s steps(2,end) infinite}
.sq-hop{animation:sqHop .5s steps(4,end) 1}
.sq-pop{transform-box:fill-box;transform-origin:center;animation:sqPop .35s steps(4,end) 1}
.sq-walk{animation:sqWalk .3s steps(2,end) infinite}
@media (prefers-reduced-motion: reduce){.sq-drift,.sq-bob,.sq-hop,.sq-pop,.sq-walk{animation:none!important}}
`;
