import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Lucky Duck — interactive MVP concept.
 *
 * A self-contained, clickable mobile prototype that walks through the primary
 * "happy flow": Landing → Signup/Wallet → Reward Discovery → Portfolio →
 * Celebration. Designed and built to mirror the Lucky Duck MVP design drafts
 * (light + dark). It deliberately avoids the site i18n / data layer so it stays
 * portable and easy to reason about.
 */

type Screen = 'landing' | 'signup' | 'discovery' | 'portfolio';

interface Reward {
  id: string;
  name: string;
  emoji: string;
  credits: number;
  category: 'Tech' | 'Travel' | 'Gaming';
}

const REWARDS: Reward[] = [
  { id: 'airpods', name: 'Apple AirPods Max', emoji: '🎧', credits: 1000, category: 'Tech' },
  { id: 'steam', name: 'Steam Gift Card', emoji: '🎮', credits: 450, category: 'Gaming' },
  { id: 'switch', name: 'Nintendo Switch', emoji: '🕹️', credits: 1800, category: 'Gaming' },
  { id: 'flight', name: 'Travel Voucher', emoji: '✈️', credits: 1200, category: 'Travel' },
  { id: 'hotel', name: 'Hotel Stay', emoji: '🏨', credits: 900, category: 'Travel' },
  { id: 'keyboard', name: 'Mechanical Keyboard', emoji: '⌨️', credits: 600, category: 'Tech' },
];

/* ------------------------------------------------------------------ theming */

function useIsDark(): boolean {
  // Read the real theme on the first render so dark-mode visitors don't see a
  // flash of the light palette. Safe because this island is mounted with
  // `client:only` (no SSR markup to mismatch against).
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark')
  );
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

interface Palette {
  bezel: string;
  screen: string;
  card: string;
  cardAlt: string;
  text: string;
  sub: string;
  border: string;
  yellow: string;
  onYellow: string;
  track: string;
}

const YELLOW = '#FFD84D';

function getPalette(dark: boolean): Palette {
  return dark
    ? {
        bezel: '#000000',
        screen: '#0E0E13',
        card: '#1A1A23',
        cardAlt: '#23232F',
        text: '#F4F4F6',
        sub: '#9A9AA6',
        border: 'rgba(255,255,255,0.08)',
        yellow: YELLOW,
        onYellow: '#15151C',
        track: 'rgba(255,255,255,0.10)',
      }
    : {
        bezel: '#1A1A23',
        screen: '#FFFDF7',
        card: '#FFFFFF',
        cardAlt: '#F5F5F1',
        text: '#1F1F23',
        sub: '#6B6B73',
        border: 'rgba(0,0,0,0.07)',
        yellow: YELLOW,
        onYellow: '#15151C',
        track: 'rgba(0,0,0,0.07)',
      };
}

/* ------------------------------------------------------------------ duck SVG */

function Duck({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <ellipse cx="60" cy="104" rx="34" ry="7" fill="rgba(0,0,0,0.10)" />
      {/* body */}
      <path
        d="M30 70c0-18 14-30 30-30s30 12 30 30c0 16-13 26-30 26S30 86 30 70Z"
        fill="#FFD84D"
      />
      {/* head */}
      <circle cx="60" cy="42" r="24" fill="#FFE074" />
      {/* wing */}
      <path d="M44 66c8 8 22 8 30 0-2 12-12 18-30 12Z" fill="#F5C73B" />
      {/* eye */}
      <circle cx="68" cy="38" r="4.5" fill="#15151C" />
      <circle cx="69.5" cy="36.5" r="1.4" fill="#fff" />
      {/* beak */}
      <path d="M82 42c10-2 16 2 16 6s-6 8-16 6c-3-1-3-11 0-12Z" fill="#FF9F1C" />
      {/* cheek */}
      <circle cx="56" cy="48" r="4" fill="#FFB3C1" opacity="0.7" />
    </svg>
  );
}

/* --------------------------------------------------------------- primitives */

function StatusBar({ p }: { p: Palette }) {
  return (
    <div
      className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold"
      style={{ color: p.text }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

function Pill({ p, children }: { p: Palette; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold"
      style={{ background: p.yellow, color: p.onYellow }}
    >
      {children}
    </span>
  );
}

function ProgressBar({ p, value }: { p: Palette; value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: p.track }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: p.yellow }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </div>
  );
}

const screenVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/* ------------------------------------------------------------------ screens */

function LandingScreen({ p, onStart }: { p: Palette; onStart: () => void }) {
  return (
    <div className="flex h-full flex-col px-6 pb-6 pt-2">
      <div className="flex items-center gap-2">
        <Duck size={34} />
        <span className="text-lg font-extrabold" style={{ color: p.text }}>
          Lucky Duck
        </span>
      </div>

      <div className="mt-10 flex flex-col items-center text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Duck size={150} />
        </motion.div>
        <h1 className="mt-6 text-3xl font-extrabold leading-tight" style={{ color: p.text }}>
          Play More.
          <br />
          Win More.
          <br />
          <span style={{ color: p.yellow }}>Get More.</span>
        </h1>
        <p className="mt-3 text-sm" style={{ color: p.sub }}>
          Turn everyday spending into exciting rewards. Earn credits, collect
          rewards, win big.
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <button
          onClick={onStart}
          className="w-full rounded-2xl py-4 text-base font-bold transition active:scale-[0.98]"
          style={{ background: p.yellow, color: p.onYellow }}
        >
          Get Started
        </button>
        <p className="text-center text-xs" style={{ color: p.sub }}>
          Already a member?{' '}
          <span style={{ color: p.text, fontWeight: 600 }}>Log in</span>
        </p>
      </div>
    </div>
  );
}

function SignupScreen({
  p,
  onBack,
  onComplete,
}: {
  p: Palette;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const valid = name.trim().length > 1 && /\S+@\S+/.test(email);

  const field = (
    label: string,
    value: string,
    setter: (v: string) => void,
    placeholder: string,
    type = 'text'
  ) => (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold" style={{ color: p.sub }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
        style={{ background: p.cardAlt, color: p.text, border: `1px solid ${p.border}` }}
      />
    </label>
  );

  return (
    <div className="flex h-full flex-col px-6 pb-6 pt-2">
      <button
        onClick={onBack}
        className="mb-4 self-start text-sm font-semibold"
        style={{ color: p.sub }}
      >
        ← Back
      </button>
      <h2 className="text-2xl font-extrabold" style={{ color: p.text }}>
        Create your account
      </h2>
      <p className="mt-1 text-sm" style={{ color: p.sub }}>
        Set up your wallet and claim 1,250 welcome credits.
      </p>

      <div className="mt-6 space-y-4">
        {field('Full name', name, setName, 'Jamie Rivera')}
        {field('Email', email, setEmail, 'you@example.com', 'email')}
      </div>

      <button
        disabled={!valid}
        onClick={onComplete}
        className="mt-6 w-full rounded-2xl py-4 text-base font-bold transition active:scale-[0.98]"
        style={{
          background: valid ? p.yellow : p.track,
          color: valid ? p.onYellow : p.sub,
        }}
      >
        Create account & open wallet
      </button>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: p.border }} />
        <span className="text-xs" style={{ color: p.sub }}>
          or continue with
        </span>
        <span className="h-px flex-1" style={{ background: p.border }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['  Apple', 'G  Google'].map((s) => (
          <button
            key={s}
            onClick={onComplete}
            className="rounded-xl py-3 text-sm font-semibold transition active:scale-[0.98]"
            style={{ background: p.card, color: p.text, border: `1px solid ${p.border}` }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiscoveryScreen({
  p,
  credits,
  onClaim,
}: {
  p: Palette;
  credits: number;
  onClaim: (r: Reward) => void;
}) {
  const featured = REWARDS[0];
  const categories: { label: Reward['category']; emoji: string }[] = [
    { label: 'Tech', emoji: '💻' },
    { label: 'Travel', emoji: '✈️' },
    { label: 'Gaming', emoji: '🎮' },
  ];
  const trending = REWARDS.slice(1, 4);

  return (
    <div className="h-full overflow-y-auto px-5 pb-24 pt-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: p.sub }}>
            Good morning 👋
          </p>
          <p className="text-lg font-extrabold" style={{ color: p.text }}>
            Discover rewards
          </p>
        </div>
        <Pill p={p}>⭐ {credits.toLocaleString()}</Pill>
      </div>

      {/* Featured */}
      <div
        className="mt-4 overflow-hidden rounded-3xl p-5"
        style={{ background: p.yellow }}
      >
        <span className="text-[11px] font-bold" style={{ color: p.onYellow, opacity: 0.7 }}>
          FEATURED REWARD
        </span>
        <div className="mt-2 flex items-center gap-3">
          <div className="text-5xl">{featured.emoji}</div>
          <div>
            <p className="text-xl font-extrabold" style={{ color: p.onYellow }}>
              {featured.name}
            </p>
            <p className="text-sm font-semibold" style={{ color: p.onYellow, opacity: 0.75 }}>
              {featured.credits.toLocaleString()} credits · 1 in 50 odds
            </p>
          </div>
        </div>
        <button
          onClick={() => onClaim(featured)}
          className="mt-4 w-full rounded-2xl py-3 text-sm font-bold transition active:scale-[0.98]"
          style={{ background: p.onYellow, color: p.yellow }}
        >
          Enter to win 🎟️
        </button>
      </div>

      {/* Categories */}
      <p className="mb-2 mt-6 text-sm font-bold" style={{ color: p.text }}>
        Categories
      </p>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((c) => (
          <div
            key={c.label}
            className="flex flex-col items-center gap-1 rounded-2xl py-4"
            style={{ background: p.card, border: `1px solid ${p.border}` }}
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-xs font-semibold" style={{ color: p.text }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Trending */}
      <p className="mb-2 mt-6 text-sm font-bold" style={{ color: p.text }}>
        Trending now
      </p>
      <div className="space-y-3">
        {trending.map((r) => (
          <button
            key={r.id}
            onClick={() => onClaim(r)}
            className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition active:scale-[0.99]"
            style={{ background: p.card, border: `1px solid ${p.border}` }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ background: p.cardAlt }}
            >
              {r.emoji}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: p.text }}>
                {r.name}
              </p>
              <p className="text-xs" style={{ color: p.sub }}>
                {r.category}
              </p>
            </div>
            <span className="text-sm font-extrabold" style={{ color: p.yellow }}>
              {r.credits.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PortfolioScreen({
  p,
  credits,
  collections,
  wins,
  onReplay,
}: {
  p: Palette;
  credits: number;
  collections: { label: string; emoji: string; value: number }[];
  wins: Reward[];
  onReplay: () => void;
}) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-24 pt-1">
      <p className="text-lg font-extrabold" style={{ color: p.text }}>
        My Portfolio
      </p>

      {/* Wallet */}
      <div
        className="mt-3 rounded-3xl p-5"
        style={{
          background: `linear-gradient(135deg, ${p.yellow} 0%, #FFC83D 100%)`,
        }}
      >
        <span className="text-[11px] font-bold" style={{ color: p.onYellow, opacity: 0.7 }}>
          REWARDS WALLET
        </span>
        <p className="mt-1 text-3xl font-extrabold" style={{ color: p.onYellow }}>
          ⭐ {credits.toLocaleString()}
        </p>
        <div className="mt-3 flex gap-2">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: p.onYellow, color: p.yellow }}
          >
            🏆 Tier 3 Member
          </span>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: 'rgba(0,0,0,0.12)', color: p.onYellow }}
          >
            🔥 12 day streak
          </span>
        </div>
      </div>

      {/* Collections */}
      <p className="mb-2 mt-6 text-sm font-bold" style={{ color: p.text }}>
        Collections
      </p>
      <div className="space-y-4">
        {collections.map((c) => (
          <div key={c.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: p.text }}>
                {c.emoji} {c.label}
              </span>
              <span className="text-xs font-bold" style={{ color: p.sub }}>
                {c.value}%
              </span>
            </div>
            <ProgressBar p={p} value={c.value} />
          </div>
        ))}
      </div>

      {/* Recent wins */}
      <p className="mb-2 mt-6 text-sm font-bold" style={{ color: p.text }}>
        Recent wins
      </p>
      {wins.length === 0 ? (
        <p
          className="rounded-2xl p-4 text-center text-xs"
          style={{ background: p.card, color: p.sub, border: `1px solid ${p.border}` }}
        >
          No wins yet — head to Discover and enter a reward!
        </p>
      ) : (
        <div className="space-y-2">
          {wins.map((r, i) => (
            <div
              key={`${r.id}-${i}`}
              className="flex items-center gap-3 rounded-2xl p-3"
              style={{ background: p.card, border: `1px solid ${p.border}` }}
            >
              <span className="text-2xl">{r.emoji}</span>
              <span className="flex-1 text-sm font-bold" style={{ color: p.text }}>
                {r.name}
              </span>
              <span className="text-[11px] font-bold" style={{ color: p.yellow }}>
                WON 🎉
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onReplay}
        className="mt-6 w-full rounded-2xl py-3 text-sm font-bold"
        style={{ background: p.cardAlt, color: p.text, border: `1px solid ${p.border}` }}
      >
        ↺ Replay demo
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- confetti */

function Confetti({ p }: { p: Palette }) {
  const colors = [p.yellow, '#FF6B6B', '#4ECDC4', '#A78BFA', '#FF9F1C'];
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.4 + Math.random() * 1.2,
        color: colors[i % colors.length],
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((c) => (
        <motion.div
          key={c.id}
          className="absolute top-0"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size * 0.6,
            background: c.color,
            borderRadius: 2,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 760, opacity: [0, 1, 1, 0], rotate: c.rotate }}
          transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

function CelebrationOverlay({
  p,
  reward,
  onClaim,
}: {
  p: Palette;
  reward: Reward;
  onClaim: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center"
      style={{ background: p.screen }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Confetti p={p} />
      <motion.div
        initial={{ scale: 0.4, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        <Duck size={130} />
      </motion.div>
      <motion.h2
        className="mt-5 text-3xl font-extrabold"
        style={{ color: p.text }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Congratulations!
      </motion.h2>
      <p className="mt-1 text-sm" style={{ color: p.sub }}>
        You just won
      </p>
      <div className="mt-3 flex items-center gap-2 text-2xl font-extrabold" style={{ color: p.text }}>
        <span>{reward.emoji}</span>
        <span>{reward.name}</span>
      </div>

      <button
        onClick={onClaim}
        className="mt-8 w-full rounded-2xl py-4 text-base font-bold transition active:scale-[0.98]"
        style={{ background: p.yellow, color: p.onYellow }}
      >
        Claim reward
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ tab bar */

function TabBar({
  p,
  screen,
  go,
}: {
  p: Palette;
  screen: Screen;
  go: (s: Screen) => void;
}) {
  const tabs: { id: Screen; label: string; icon: string }[] = [
    { id: 'discovery', label: 'Discover', icon: '🎁' },
    { id: 'portfolio', label: 'Portfolio', icon: '🏆' },
  ];
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-around px-6 pb-6 pt-3"
      style={{ background: p.card, borderTop: `1px solid ${p.border}` }}
    >
      {tabs.map((t) => {
        const active = screen === t.id;
        return (
          <button
            key={t.id}
            onClick={() => go(t.id)}
            className="flex flex-col items-center gap-1 transition active:scale-95"
          >
            <span className="text-xl" style={{ opacity: active ? 1 : 0.45 }}>
              {t.icon}
            </span>
            <span
              className="text-[10px] font-bold"
              style={{ color: active ? p.yellow : p.sub }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ shell */

const INITIAL_COLLECTIONS = [
  { label: 'Tech Collection', emoji: '💻', value: 70 },
  { label: 'Travel Collection', emoji: '✈️', value: 40 },
  { label: 'Gaming Collection', emoji: '🎮', value: 90 },
];

export default function LuckyDuckDemo() {
  const dark = useIsDark();
  const p = getPalette(dark);

  const [screen, setScreen] = useState<Screen>('landing');
  const [credits, setCredits] = useState(0);
  const [celebrating, setCelebrating] = useState<Reward | null>(null);
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
  const [wins, setWins] = useState<Reward[]>([]);

  const completeSignup = () => {
    setCredits(1250);
    setScreen('discovery');
  };

  const claimReward = () => {
    if (!celebrating) return;
    const reward = celebrating;
    setWins((w) => [reward, ...w]);
    setCollections((cols) =>
      cols.map((c) =>
        c.label.startsWith(reward.category)
          ? { ...c, value: Math.min(100, c.value + 10) }
          : c
      )
    );
    setCredits((c) => c + 250);
    setCelebrating(null);
    setScreen('portfolio');
  };

  const replay = () => {
    setScreen('landing');
    setCredits(0);
    setCollections(INITIAL_COLLECTIONS);
    setWins([]);
    setCelebrating(null);
  };

  const showTabBar = screen === 'discovery' || screen === 'portfolio';

  return (
    <div className="mx-auto" style={{ width: 360, maxWidth: '100%' }}>
      {/* phone */}
      <div
        className="relative mx-auto"
        style={{
          background: p.bezel,
          borderRadius: 46,
          padding: 12,
          boxShadow: dark
            ? '0 30px 60px rgba(0,0,0,0.6)'
            : '0 30px 60px rgba(0,0,0,0.18)',
        }}
      >
        {/* notch */}
        <div
          className="absolute left-1/2 top-3 z-30 h-6 w-32 -translate-x-1/2 rounded-b-2xl"
          style={{ background: p.bezel }}
        />
        <div
          className="relative overflow-hidden"
          style={{ background: p.screen, borderRadius: 34, height: 720 }}
        >
          <StatusBar p={p} />

          <div className="relative h-[calc(720px-34px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                variants={screenVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                {screen === 'landing' && (
                  <LandingScreen p={p} onStart={() => setScreen('signup')} />
                )}
                {screen === 'signup' && (
                  <SignupScreen
                    p={p}
                    onBack={() => setScreen('landing')}
                    onComplete={completeSignup}
                  />
                )}
                {screen === 'discovery' && (
                  <DiscoveryScreen p={p} credits={credits} onClaim={setCelebrating} />
                )}
                {screen === 'portfolio' && (
                  <PortfolioScreen
                    p={p}
                    credits={credits}
                    collections={collections}
                    wins={wins}
                    onReplay={replay}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {celebrating && (
                <CelebrationOverlay p={p} reward={celebrating} onClaim={claimReward} />
              )}
            </AnimatePresence>

            {showTabBar && !celebrating && <TabBar p={p} screen={screen} go={setScreen} />}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs" style={{ color: p.sub }}>
        Fully interactive · try the buttons · toggle the site theme to see light & dark
      </p>
    </div>
  );
}
