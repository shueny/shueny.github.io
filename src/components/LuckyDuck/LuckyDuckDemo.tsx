import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Lucky Duck — interactive MVP concept.
 *
 * A self-contained, clickable mobile prototype that walks through the primary
 * "happy flow": Landing → Signup/Wallet → Reward Discovery → Portfolio →
 * Celebration. Rebuilt to mirror the Lucky Duck MVP design boards (light +
 * dark) — design tokens, 5-tab bottom nav, featured deals, wallet setup and a
 * confetti celebration. It deliberately avoids the site i18n / data layer so it
 * stays portable and easy to reason about.
 *
 * Brand products (AirPods, Amazon, Disney+, Nike, Starbucks) are represented
 * with stylized emoji/SVG placeholders — names are kept as text, no trademarked
 * logo artwork is shipped.
 */

type Screen = 'landing' | 'signup' | 'discovery' | 'portfolio';

interface Reward {
  id: string;
  name: string;
  sub: string;
  emoji: string;
  credits: number;
  tint: string; // background tint for the product tile
  badge?: string;
}

const FEATURED: Reward = {
  id: 'airpods',
  name: 'Apple AirPods Max',
  sub: 'Premium over-ear headphones',
  emoji: '🎧',
  credits: 3000,
  tint: '#2B2B36',
  badge: 'Hot Deal',
};

const TRENDING: Reward[] = [
  { id: 'amazon', name: 'Amazon', sub: '$50 Gift Card', emoji: '📦', credits: 500, tint: '#23232F' },
  { id: 'disney', name: 'Disney+', sub: '1 Month', emoji: '✨', credits: 800, tint: '#1E2A4A' },
];

const RECENT_WINS: Reward[] = [
  { id: 'starbucks', name: 'Starbucks eGift Card', sub: '200 Credits', emoji: '☕', credits: 200, tint: '#0E3B2E' },
  { id: 'nike', name: 'Nike $25 Gift Card', sub: '800 Credits', emoji: '👟', credits: 800, tint: '#2B2B36' },
];

const CATEGORIES: { label: string; emoji: string; color: string }[] = [
  { label: 'Tech', emoji: '💻', color: '#6C3CFF' },
  { label: 'Gift Cards', emoji: '🎁', color: '#FF6B6B' },
  { label: 'Travel', emoji: '✈️', color: '#4ECDC4' },
  { label: 'Experiences', emoji: '🎫', color: '#A78BFA' },
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
  purple: string;
  green: string;
  track: string;
  navBg: string;
}

const YELLOW = '#FFD600';
const PURPLE = '#6C3CFF';
const GREEN = '#22C55E';

function getPalette(dark: boolean): Palette {
  return dark
    ? {
        bezel: '#000000',
        screen: '#0F0F14',
        card: '#1A1A22',
        cardAlt: '#23232F',
        text: '#F4F4F6',
        sub: '#9A9AA6',
        border: 'rgba(255,255,255,0.08)',
        yellow: YELLOW,
        onYellow: '#15151C',
        purple: PURPLE,
        green: GREEN,
        track: 'rgba(255,255,255,0.10)',
        navBg: 'rgba(20,20,27,0.92)',
      }
    : {
        bezel: '#1A1A22',
        screen: '#FFFFFF',
        card: '#FFFFFF',
        cardAlt: '#F5F6F8',
        text: '#1A1A1A',
        sub: '#6B6B73',
        border: 'rgba(0,0,0,0.08)',
        yellow: YELLOW,
        onYellow: '#15151C',
        purple: PURPLE,
        green: GREEN,
        track: 'rgba(0,0,0,0.06)',
        navBg: 'rgba(255,255,255,0.94)',
      };
}

/* ------------------------------------------------------------------ duck SVG */

function Duck({ size = 96, hat = false }: { size?: number; hat?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <ellipse cx="60" cy="106" rx="34" ry="7" fill="rgba(0,0,0,0.10)" />
      {/* body */}
      <path d="M30 72c0-18 14-30 30-30s30 12 30 30c0 16-13 26-30 26S30 88 30 72Z" fill="#FFD600" />
      {/* belly highlight */}
      <path d="M40 78c0-10 9-16 20-16s20 6 20 16c0 9-9 15-20 15s-20-6-20-15Z" fill="#FFE074" opacity="0.7" />
      {/* head */}
      <circle cx="60" cy="42" r="24" fill="#FFE074" />
      {/* wing */}
      <path d="M44 68c8 8 22 8 30 0-2 12-12 18-30 12Z" fill="#F5C73B" />
      {/* eye */}
      <circle cx="68" cy="38" r="4.5" fill="#15151C" />
      <circle cx="69.5" cy="36.5" r="1.4" fill="#fff" />
      {/* beak */}
      <path d="M82 42c10-2 16 2 16 6s-6 8-16 6c-3-1-3-11 0-12Z" fill="#FF9F1C" />
      {/* cheek */}
      <circle cx="56" cy="48" r="4" fill="#FFB3C1" opacity="0.7" />
      {hat && (
        <g>
          <path d="M44 24 60 0 70 22Z" fill="#6C3CFF" />
          <path d="M44 24 60 0 56 24Z" fill="#A78BFA" />
          <circle cx="60" cy="0" r="4" fill="#FFD600" />
        </g>
      )}
    </svg>
  );
}

function GiftDuck({ size = 130 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Duck size={size} hat />
      {/* gift box */}
      <svg
        width={size * 0.42}
        height={size * 0.42}
        viewBox="0 0 48 48"
        className="absolute"
        style={{ left: size * 0.04, bottom: size * 0.04 }}
        aria-hidden="true"
      >
        <rect x="6" y="20" width="36" height="22" rx="3" fill="#FF6B6B" />
        <rect x="6" y="20" width="36" height="8" rx="2" fill="#FF8E8E" />
        <rect x="21" y="14" width="6" height="28" fill="#FFD600" />
        <rect x="6" y="24" width="36" height="4" fill="#FFD600" />
        <path d="M24 14c-4-8-14-4-8 2 2 2 6 0 8-2Zm0 0c4-8 14-4 8 2-2 2-6 0-8-2Z" fill="#FFD600" />
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------- icons */

type IconName = 'home' | 'deals' | 'play' | 'portfolio' | 'activity';

function NavIcon({ name }: { name: IconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
        </svg>
      );
    case 'deals':
      return (
        <svg {...common}>
          <path d="M4 11V5a1 1 0 0 1 1-1h6l9 9-7 7-9-9Z" />
          <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'play':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5 16 12l-6 3.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'portfolio':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...common}>
          <path d="M3 12h4l2.5 6 5-13L17 12h4" />
        </svg>
      );
  }
}

function EyeIcon({ off }: { off?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 7l2-2" />
    </svg>
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  );
}

function Chevron({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/* --------------------------------------------------------------- primitives */

function StatusBar({ p }: { p: Palette }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-bold" style={{ color: p.text }}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5 text-[10px]">
        <span>▮▮▮</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

function Avatars({ p }: { p: Palette }) {
  const tones = ['#FFB3C1', '#A78BFA', '#4ECDC4', '#FFD600'];
  return (
    <div className="flex -space-x-2">
      {tones.map((t, i) => (
        <span
          key={i}
          className="flex h-6 w-6 items-center justify-center rounded-full text-[9px]"
          style={{ background: t, border: `2px solid ${p.screen}`, color: '#15151C' }}
        >
          {['🦊', '🐼', '🐧', '🐤'][i]}
        </span>
      ))}
    </div>
  );
}

function SectionHead({ p, title, action }: { p: Palette; title: string; action?: string }) {
  return (
    <div className="mb-2 mt-5 flex items-center justify-between">
      <p className="text-[15px] font-extrabold" style={{ color: p.text }}>
        {title}
      </p>
      {action && (
        <span className="text-[11px] font-semibold" style={{ color: p.purple }}>
          {action}
        </span>
      )}
    </div>
  );
}

function ProductTile({ reward, size = 48 }: { reward: Reward; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: reward.tint, fontSize: size * 0.42 }}
    >
      {reward.emoji}
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
    <div className="flex h-full flex-col px-6 pb-6 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Duck size={30} />
          <span className="text-base font-extrabold" style={{ color: p.text }}>
            Lucky Duck
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="h-0.5 w-5 rounded" style={{ background: p.text }} />
          <span className="h-0.5 w-5 rounded" style={{ background: p.text }} />
          <span className="h-0.5 w-3 rounded" style={{ background: p.text }} />
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-[34px] font-extrabold leading-[1.05]" style={{ color: p.text }}>
          Play More.
          <br />
          <span style={{ color: p.yellow }}>Win More.</span>
          <br />
          Get More.
        </h1>
        <p className="mt-3 text-sm" style={{ color: p.sub }}>
          Unlock exclusive rewards with every play.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <button
          onClick={onStart}
          className="w-full rounded-2xl py-3.5 text-base font-bold transition active:scale-[0.98]"
          style={{ background: p.yellow, color: p.onYellow }}
        >
          Get Started
        </button>
        <button
          onClick={onStart}
          className="w-full rounded-2xl py-3.5 text-sm font-bold transition active:scale-[0.98]"
          style={{ background: 'transparent', color: p.text, border: `1px solid ${p.border}` }}
        >
          Learn How It Works
        </button>
      </div>

      <div className="relative mt-auto flex items-end justify-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Duck size={140} />
        </motion.div>
        <span className="absolute left-2 top-4 text-lg">🪙</span>
        <span className="absolute right-4 top-10 text-base">🪙</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Avatars p={p} />
        <div>
          <p className="text-[11px] font-bold" style={{ color: p.text }}>
            Trusted by players
          </p>
          <p className="text-[10px]" style={{ color: p.sub }}>
            10k+ users
          </p>
        </div>
      </div>
    </div>
  );
}

function SignupScreen({ p, onComplete }: { p: Palette; onComplete: () => void }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const valid = /\S+@\S+/.test(email) && pw.length >= 4;

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 pb-6 pt-1">
      <h2 className="mt-2 text-[22px] font-extrabold" style={{ color: p.text }}>
        Create your account
      </h2>
      <p className="mt-1 text-sm" style={{ color: p.sub }}>
        Let's get you all set up!
      </p>

      <div className="mt-5 space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold" style={{ color: p.sub }}>
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ background: p.cardAlt, color: p.text, border: `1px solid ${p.border}` }}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold" style={{ color: p.sub }}>
            Password
          </span>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••••"
              className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none"
              style={{ background: p.cardAlt, color: p.text, border: `1px solid ${p.border}` }}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: p.sub }}
              aria-label="Toggle password visibility"
            >
              <EyeIcon off={showPw} />
            </button>
          </div>
        </label>
      </div>

      <button
        onClick={onComplete}
        className="mt-5 w-full rounded-2xl py-3.5 text-base font-bold transition active:scale-[0.98]"
        style={{ background: p.yellow, color: p.onYellow, opacity: valid ? 1 : 0.85 }}
      >
        Create Account
      </button>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: p.border }} />
        <span className="text-[11px]" style={{ color: p.sub }}>
          or continue with
        </span>
        <span className="h-px flex-1" style={{ background: p.border }} />
      </div>

      <div className="flex items-center justify-center gap-4">
        {[
          { k: 'G', c: '#EA4335' },
          { k: '', c: p.text },
          { k: 'f', c: '#1877F2' },
        ].map((s, i) => (
          <button
            key={i}
            onClick={onComplete}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold transition active:scale-95"
            style={{ background: p.cardAlt, color: s.c, border: `1px solid ${p.border}` }}
          >
            {s.k || ''}
          </button>
        ))}
      </div>

      {/* Wallet setup card */}
      <div className="mt-5 rounded-2xl p-4" style={{ background: p.cardAlt, border: `1px solid ${p.border}` }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">💼</span>
          <div>
            <p className="text-sm font-bold" style={{ color: p.text }}>
              Set up your wallet
            </p>
            <p className="text-[11px]" style={{ color: p.sub }}>
              Secure. Fast. Easy.
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {['Add payment method', 'Start with bonus credits'].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Check color={p.green} />
              <span className="text-xs" style={{ color: p.text }}>
                {t}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onComplete}
          className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold transition active:scale-[0.98]"
          style={{ background: p.text, color: p.screen }}
        >
          Set Up Wallet
        </button>
      </div>
    </div>
  );
}

function DiscoveryScreen({ p, credits, onClaim }: { p: Palette; credits: number; onClaim: (r: Reward) => void }) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-24 pt-1">
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-extrabold"
          style={{ background: p.yellow, color: p.onYellow }}
        >
          🪙 {credits.toLocaleString()}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-base" style={{ background: p.cardAlt }}>
          🧑
        </span>
      </div>

      {/* Featured */}
      <SectionHead p={p} title="Featured Deals" action="View all" />
      <button
        onClick={() => onClaim(FEATURED)}
        className="w-full overflow-hidden rounded-2xl text-left transition active:scale-[0.99]"
        style={{ background: p.card, border: `1px solid ${p.border}` }}
      >
        <div className="relative flex h-36 items-center justify-center" style={{ background: FEATURED.tint }}>
          <span style={{ fontSize: 64 }}>{FEATURED.emoji}</span>
          {FEATURED.badge && (
            <span
              className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
              style={{ background: '#FF3D8B' }}
            >
              {FEATURED.badge}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between p-3.5">
          <div>
            <p className="text-sm font-bold" style={{ color: p.text }}>
              {FEATURED.name}
            </p>
            <p className="text-sm font-extrabold" style={{ color: p.yellow }}>
              {FEATURED.credits.toLocaleString()} Credits
            </p>
          </div>
          <Chevron color={p.sub} />
        </div>
      </button>

      {/* Categories */}
      <SectionHead p={p} title="Categories" action="View all" />
      <div className="grid grid-cols-4 gap-2.5">
        {CATEGORIES.map((c) => (
          <div key={c.label} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-14 w-full items-center justify-center rounded-2xl text-xl"
              style={{ background: p.cardAlt, border: `1px solid ${p.border}` }}
            >
              {c.emoji}
            </div>
            <span className="text-[10px] font-semibold" style={{ color: p.sub }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Trending */}
      <SectionHead p={p} title="Trending Now" action="View all" />
      <div className="grid grid-cols-2 gap-3">
        {TRENDING.map((r) => (
          <button
            key={r.id}
            onClick={() => onClaim(r)}
            className="overflow-hidden rounded-2xl text-left transition active:scale-[0.98]"
            style={{ background: p.card, border: `1px solid ${p.border}` }}
          >
            <div className="flex h-20 items-center justify-center" style={{ background: r.tint, fontSize: 34 }}>
              {r.emoji}
            </div>
            <div className="p-2.5">
              <p className="text-xs font-bold" style={{ color: p.text }}>
                {r.name}
              </p>
              <p className="text-[10px]" style={{ color: p.sub }}>
                {r.sub}
              </p>
              <p className="mt-0.5 text-[11px] font-extrabold" style={{ color: p.yellow }}>
                {r.credits} Credits
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PortfolioScreen({
  p,
  credits,
  collectionPct,
  collectionCount,
  wins,
  onReplay,
}: {
  p: Palette;
  credits: number;
  collectionPct: number;
  collectionCount: number;
  wins: Reward[];
  onReplay: () => void;
}) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-24 pt-1">
      <div className="flex items-center justify-between">
        <p className="text-lg font-extrabold" style={{ color: p.text }}>
          My Portfolio
        </p>
        <span style={{ color: p.sub }}>
          <GearIcon />
        </span>
      </div>

      {/* Balance */}
      <div
        className="mt-3 flex items-center justify-between rounded-2xl p-5"
        style={{ background: `linear-gradient(135deg, ${p.purple} 0%, #9B6BFF 100%)` }}
      >
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-white/70">Current Balance</span>
          <p className="mt-1 text-3xl font-extrabold text-white">🪙 {credits.toLocaleString()}</p>
          <span className="text-xs text-white/70">Credits</span>
        </div>
        <div className="text-5xl">🪙</div>
      </div>

      {/* Collections */}
      <SectionHead p={p} title="My Collections" action="View all" />
      <div className="rounded-2xl p-4" style={{ background: p.card, border: `1px solid ${p.border}` }}>
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-sm font-bold" style={{ color: p.text }}>
            Tech Collection
          </span>
          <span className="text-xs font-semibold" style={{ color: p.sub }}>
            {collectionCount}/10 items
          </span>
        </div>
        <div className="flex gap-2">
          {['🎧', '⌨️', '🖱️', '📱'].map((e, i) => (
            <div
              key={i}
              className="flex h-12 flex-1 items-center justify-center rounded-xl text-lg"
              style={{ background: p.cardAlt, opacity: i < collectionCount ? 1 : 0.35 }}
            >
              {e}
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: p.track }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: p.yellow }}
            initial={{ width: 0 }}
            animate={{ width: `${collectionPct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Recent wins */}
      <SectionHead p={p} title="Recent Wins" />
      <div className="space-y-2.5">
        {wins.map((r, i) => (
          <div
            key={`${r.id}-${i}`}
            className="flex items-center gap-3 rounded-2xl p-2.5"
            style={{ background: p.card, border: `1px solid ${p.border}` }}
          >
            <ProductTile reward={r} size={44} />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: p.text }}>
                {r.name}
              </p>
              <p className="text-[11px]" style={{ color: p.sub }}>
                {r.credits} Credits
              </p>
            </div>
            <span className="text-[11px] font-bold" style={{ color: p.green }}>
              WON
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onReplay}
        className="mt-4 w-full rounded-2xl py-3 text-sm font-bold transition active:scale-[0.98]"
        style={{ background: 'transparent', color: p.text, border: `1px solid ${p.border}` }}
      >
        ↺ View All Activity
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- confetti */

function Confetti({ p }: { p: Palette }) {
  const colors = [p.yellow, p.purple, '#FF6B6B', '#4ECDC4', '#FF9F1C'];
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
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
          style={{ left: `${c.left}%`, width: c.size, height: c.size * 0.6, background: c.color, borderRadius: 2 }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 740, opacity: [0, 1, 1, 0], rotate: c.rotate }}
          transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

function CelebrationOverlay({
  p,
  reward,
  onView,
  onKeep,
}: {
  p: Palette;
  reward: Reward;
  onView: () => void;
  onKeep: () => void;
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
        <GiftDuck size={140} />
      </motion.div>
      <motion.h2
        className="mt-4 text-[28px] font-extrabold"
        style={{ color: p.text }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Congratulations!
      </motion.h2>
      <p className="mt-1 text-sm" style={{ color: p.sub }}>
        You unlocked
      </p>
      <p className="text-lg font-extrabold" style={{ color: p.text }}>
        {reward.name}
      </p>
      <span
        className="mt-3 rounded-full px-4 py-1.5 text-sm font-extrabold"
        style={{ background: p.yellow, color: p.onYellow }}
      >
        +{reward.credits.toLocaleString()} Credits
      </span>

      <div className="mt-7 w-full space-y-3">
        <button
          onClick={onView}
          className="w-full rounded-2xl py-3.5 text-base font-bold transition active:scale-[0.98]"
          style={{ background: p.yellow, color: p.onYellow }}
        >
          View in Portfolio
        </button>
        <button
          onClick={onKeep}
          className="w-full rounded-2xl py-3.5 text-sm font-bold transition active:scale-[0.98]"
          style={{ background: 'transparent', color: p.text, border: `1px solid ${p.border}` }}
        >
          Keep Playing
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ tab bar */

function BottomNav({
  p,
  screen,
  onHome,
  onPortfolio,
  onPlay,
}: {
  p: Palette;
  screen: Screen;
  onHome: () => void;
  onPortfolio: () => void;
  onPlay: () => void;
}) {
  const tabs: { id: IconName; label: string; active: boolean; onClick: () => void }[] = [
    { id: 'home', label: 'Home', active: screen === 'discovery', onClick: onHome },
    { id: 'deals', label: 'Deals', active: false, onClick: onHome },
    { id: 'play', label: 'Play', active: false, onClick: onPlay },
    { id: 'portfolio', label: 'Portfolio', active: screen === 'portfolio', onClick: onPortfolio },
    { id: 'activity', label: 'Activity', active: false, onClick: onPortfolio },
  ];
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-around px-3 pb-5 pt-2.5 backdrop-blur"
      style={{ background: p.navBg, borderTop: `1px solid ${p.border}` }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={t.onClick}
          className="flex flex-col items-center gap-0.5 transition active:scale-95"
          style={{ color: t.active ? p.yellow : p.sub }}
        >
          <NavIcon name={t.id} />
          <span className="text-[9px] font-bold">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ shell */

export default function LuckyDuckDemo() {
  const dark = useIsDark();
  const p = getPalette(dark);

  const [screen, setScreen] = useState<Screen>('landing');
  const [credits, setCredits] = useState(0);
  const [celebrating, setCelebrating] = useState<Reward | null>(null);
  const [wins, setWins] = useState<Reward[]>(RECENT_WINS);
  const [collectionCount, setCollectionCount] = useState(4);

  const completeSignup = () => {
    setCredits(1250);
    setScreen('discovery');
  };

  const viewInPortfolio = () => {
    if (!celebrating) return;
    const reward = celebrating;
    setWins((w) => [reward, ...w].slice(0, 5));
    setCredits((c) => c + reward.credits);
    setCollectionCount((n) => Math.min(10, n + 1));
    setCelebrating(null);
    setScreen('portfolio');
  };

  const keepPlaying = () => {
    if (celebrating) {
      const reward = celebrating;
      setWins((w) => [reward, ...w].slice(0, 5));
      setCredits((c) => c + reward.credits);
      setCollectionCount((n) => Math.min(10, n + 1));
    }
    setCelebrating(null);
    setScreen('discovery');
  };

  const replay = () => {
    setScreen('landing');
    setCredits(0);
    setWins(RECENT_WINS);
    setCollectionCount(4);
    setCelebrating(null);
  };

  const collectionPct = (collectionCount / 10) * 100;
  const showNav = (screen === 'discovery' || screen === 'portfolio') && !celebrating;

  return (
    <div className="mx-auto" style={{ width: 340, maxWidth: '100%' }}>
      {/* phone */}
      <div
        className="relative mx-auto"
        style={{
          background: p.bezel,
          borderRadius: 46,
          padding: 11,
          boxShadow: dark ? '0 30px 60px rgba(0,0,0,0.6)' : '0 30px 60px rgba(0,0,0,0.18)',
        }}
      >
        {/* notch */}
        <div
          className="absolute left-1/2 top-2.5 z-30 h-6 w-28 -translate-x-1/2 rounded-b-2xl"
          style={{ background: p.bezel }}
        />
        <div className="relative overflow-hidden" style={{ background: p.screen, borderRadius: 36, height: 700 }}>
          <StatusBar p={p} />

          <div className="relative h-[calc(700px-30px)]">
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
                {screen === 'landing' && <LandingScreen p={p} onStart={() => setScreen('signup')} />}
                {screen === 'signup' && <SignupScreen p={p} onComplete={completeSignup} />}
                {screen === 'discovery' && <DiscoveryScreen p={p} credits={credits} onClaim={setCelebrating} />}
                {screen === 'portfolio' && (
                  <PortfolioScreen
                    p={p}
                    credits={credits}
                    collectionPct={collectionPct}
                    collectionCount={collectionCount}
                    wins={wins}
                    onReplay={replay}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {celebrating && (
                <CelebrationOverlay p={p} reward={celebrating} onView={viewInPortfolio} onKeep={keepPlaying} />
              )}
            </AnimatePresence>

            {showNav && (
              <BottomNav
                p={p}
                screen={screen}
                onHome={() => setScreen('discovery')}
                onPortfolio={() => setScreen('portfolio')}
                onPlay={() => setCelebrating(FEATURED)}
              />
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs" style={{ color: p.sub }}>
        Fully interactive · try the buttons · toggle the site theme to see light & dark
      </p>
    </div>
  );
}
