import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Layers,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  LogIn,
  LogOut,
  ListChecks,
  Building2,
  BadgeCheck,
  Code2,
  GraduationCap,
  BookOpen,
  ExternalLink,
  School,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { SectionId } from '../types';
import { useLanguage, type Language } from '../contexts/LanguageContext';

// Language-neutral presentation data, keyed by experience id. `url` links the
// timeline node and the organisation name; `logo` is a file in /public/logos
// that replaces the node icon (the icon stays as the fallback).
type StageMeta = { icon: LucideIcon; url?: string; logo?: string };

const STAGE_META: Record<
  string,
  StageMeta & { tags: string[]; stack: string[] }
> = {
  exp0: {
    icon: Sparkles,
    tags: ['AI Engineering', 'Freelance'],
    stack: ['React', 'Nuxt 3', 'LangGraph', 'pgvector'],
  },
  exp1: {
    icon: ShieldCheck,
    url: 'https://vicone.com/',
    tags: ['Micro-frontends', 'Cybersecurity'],
    stack: ['React', 'Nx', 'Next.js', 'Cypress'],
  },
  exp2: {
    icon: Layers,
    tags: ['B2B SaaS', 'Workflow'],
    stack: ['React', 'React DnD', 'Puppeteer'],
  },
  exp3: {
    icon: ShoppingBag,
    url: 'https://www.citiesocial.com/',
    tags: ['E-commerce', 'Shopify'],
    stack: ['Shopify', 'Liquid', 'GA / GTM'],
  },
  exp4: {
    icon: Store,
    url: 'https://www.momoshop.com.tw/',
    tags: ['E-commerce', 'SEO'],
    stack: ['JavaScript', 'GA', 'SEO'],
  },
  exp5: {
    icon: Palette,
    tags: ['Design', 'Branding'],
    stack: ['Photoshop', 'Illustrator', 'HTML / CSS'],
  },
};

const FALLBACK_META = { icon: Sparkles, tags: [], stack: [] };

const EDU_META: Record<string, StageMeta> = {
  edu0: { icon: GraduationCap, url: 'https://www.nutn.edu.tw/' },
  edu1: { icon: BookOpen, url: 'https://www.usc.edu.tw/' },
};

type Stage = {
  id: string;
  title: string;
  org: string;
  period: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  orgUrl?: string;
  logo?: string;
  tags: string[];
  crumb: string;
  countLabel: string;
  chipsLabel: string;
  chips: string[];
  rows: { icon: LucideIcon; label: string; value: string }[];
  link?: { url: string; text: string; department: string };
};

const LABELS: Record<
  Language,
  {
    search: string;
    summary: string;
    from: string;
    to: string;
    highlights: string;
    company: string;
    role: string;
    stack: string;
    now: string;
    school: string;
    department: string;
    degree: string;
    focus: string;
    areas: string;
  }
> = {
  EN: {
    search: 'Search…',
    summary: 'Summary',
    from: 'From',
    to: 'To',
    highlights: 'Highlights',
    company: 'Company',
    role: 'Role',
    stack: 'Stack',
    now: 'Now',
    school: 'School',
    department: 'Department',
    degree: 'Degree',
    focus: 'Focus',
    areas: 'Areas',
  },
  DE: {
    search: 'Suchen…',
    summary: 'Überblick',
    from: 'Von',
    to: 'Bis',
    highlights: 'Highlights',
    company: 'Unternehmen',
    role: 'Rolle',
    stack: 'Stack',
    now: 'Aktuell',
    school: 'Hochschule',
    department: 'Fachbereich',
    degree: 'Abschluss',
    focus: 'Schwerpunkte',
    areas: 'Bereiche',
  },
  ZH: {
    search: '搜尋…',
    summary: '摘要',
    from: '開始',
    to: '結束',
    highlights: '重點成果',
    company: '公司',
    role: '職稱',
    stack: '技術',
    now: '目前',
    school: '學校',
    department: '系所',
    degree: '學位',
    focus: '重點',
    areas: '領域',
  },
};

const LINE_ORANGE = '#ea580c';
const LINE_YELLOW = '#fde68a';

const CURRENT_PATTERN = /present|heute|至今/i;

type Point = { x: number; y: number };

// One continuous path: vertical through each node, with an S-sweep in the gap
// between rows whenever the next node sits on the other side.
const buildPath = (nodes: Point[], gapYs: number[], tail: number) => {
  if (nodes.length === 0) return '';
  let d = `M ${nodes[0].x} 0 L ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const midY = gapYs[i];
    if (Math.abs(b.x - a.x) < 1) {
      d += ` L ${b.x} ${b.y}`;
      continue;
    }
    const h = Math.max(0, Math.min(150, midY - a.y - 24, b.y - midY - 24));
    d += ` L ${a.x} ${midY - h}`;
    d += ` C ${a.x} ${midY} ${b.x} ${midY} ${b.x} ${midY + h}`;
    d += ` L ${b.x} ${b.y}`;
  }
  const last = nodes[nodes.length - 1];
  d += ` L ${last.x} ${last.y + tail}`;
  return d;
};

const splitPeriod = (period: string) => {
  const parts = period.split(/\s[-–]\s/);
  return parts.length === 2 ? parts : [period, ''];
};

const ExperienceList: React.FC = () => {
  const { t, language } = useLanguage();
  const labels = LABELS[language] ?? LABELS.EN;

  // Work history first, then education, as one continuous journey.
  const stages = useMemo<Stage[]>(() => {
    const work: Stage[] = t.experience.items.map((exp) => {
      const meta = STAGE_META[exp.id] ?? FALLBACK_META;
      return {
        id: exp.id,
        title: exp.role,
        org: exp.company,
        period: exp.period,
        description: exp.description,
        points: exp.achievements,
        icon: meta.icon,
        orgUrl: meta.url,
        logo: meta.logo,
        tags: meta.tags,
        crumb: t.nav.experience,
        countLabel: labels.highlights,
        chipsLabel: labels.stack,
        chips: meta.stack,
        rows: [
          { icon: Building2, label: labels.company, value: exp.company },
          { icon: BadgeCheck, label: labels.role, value: exp.role },
        ],
      };
    });
    const { education } = t.experience;
    const edu: Stage[] = education.items.map((item) => ({
      id: item.id,
      orgUrl: EDU_META[item.id]?.url,
      logo: EDU_META[item.id]?.logo,
      title: item.degree,
      org: item.school,
      period: item.period,
      description: item.description,
      points: item.focus,
      icon: EDU_META[item.id]?.icon ?? GraduationCap,
      tags: [education.label, ...item.areas.slice(0, 1)],
      crumb: education.label,
      countLabel: labels.focus,
      chipsLabel: labels.areas,
      chips: item.areas,
      rows: [
        { icon: School, label: labels.school, value: item.school },
        { icon: Target, label: labels.degree, value: item.degree },
      ],
      link: {
        url: item.url,
        text: education.website,
        department: item.department,
      },
    }));
    return [...work, ...edu];
  }, [t, labels]);

  const trackRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const dottedRef = useRef<SVGPathElement>(null);
  const solidRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const nodeYs = useRef<number[]>([]);
  const totalLength = useRef(0);
  const frame = useRef(0);

  const [size, setSize] = useState({ w: 0, h: 0 });
  // Orange at every node, fading to pale yellow in each sweep between roles.
  const [stops, setStops] = useState<{ offset: number; color: string }[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [brokenLogos, setBrokenLogos] = useState<Set<string>>(new Set());
  const markLogoBroken = useCallback(
    (id: string) =>
      setBrokenLogos((prev) => (prev.has(id) ? prev : new Set(prev).add(id))),
    []
  );

  // Reveal the solid line up to the reading position (55% down the viewport).
  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    const solid = solidRef.current;
    const glow = glowRef.current;
    if (!track || !solid || !glow || totalLength.current === 0) return;

    // Near the bottom of the page there is no scroll left to carry the
    // reading position past the last role, so ease it to the end of the path.
    const readingY =
      window.innerHeight * 0.55 - track.getBoundingClientRect().top;
    const remaining =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY;
    const easeZone = window.innerHeight * 0.6;
    const ease = Math.min(1, Math.max(0, 1 - remaining / easeZone));
    const endY = track.offsetHeight + 140;
    const targetY =
      readingY < endY ? readingY + (endY - readingY) * ease : readingY;
    const total = totalLength.current;

    let revealed = 0;
    if (targetY >= track.offsetHeight) {
      revealed = total;
    } else if (targetY > 0) {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 18; i++) {
        const mid = (lo + hi) / 2;
        if (solid.getPointAtLength(mid).y < targetY) lo = mid;
        else hi = mid;
      }
      revealed = lo;
    }

    const dash = `${revealed} ${total + 20}`;
    solid.setAttribute('stroke-dasharray', dash);
    glow.setAttribute('stroke-dasharray', dash);

    let active = -1;
    nodeYs.current.forEach((y, i) => {
      if (y <= targetY) active = i;
    });
    setActiveIndex(active);
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackBox = track.getBoundingClientRect();

    const nodes: Point[] = [];
    nodeRefs.current.forEach((el) => {
      if (!el) return;
      const box = el.getBoundingClientRect();
      nodes.push({
        x: box.left + box.width / 2 - trackBox.left,
        y: box.top + box.height / 2 - trackBox.top,
      });
    });

    const gapYs: number[] = [];
    for (let i = 0; i < rowRefs.current.length - 1; i++) {
      const cur = rowRefs.current[i]?.getBoundingClientRect();
      const next = rowRefs.current[i + 1]?.getBoundingClientRect();
      if (cur && next) {
        gapYs.push((cur.bottom + next.top) / 2 - trackBox.top);
      }
    }

    const d = buildPath(nodes, gapYs, 140);
    [dottedRef, solidRef, glowRef].forEach((ref) =>
      ref.current?.setAttribute('d', d)
    );
    totalLength.current = solidRef.current?.getTotalLength() ?? 0;
    nodeYs.current = nodes.map((n) => n.y);
    const h = track.offsetHeight + 140;
    const marks = [
      ...nodes.map((n) => ({ y: n.y, color: LINE_ORANGE })),
      ...gapYs.map((y) => ({ y, color: LINE_YELLOW })),
      { y: h, color: LINE_YELLOW },
    ].sort((a, b) => a.y - b.y);
    setStops(marks.map((m) => ({ offset: m.y / h, color: m.color })));
    setSize({ w: trackBox.width, h });
    updateProgress();
  }, [updateProgress]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    const observer = new ResizeObserver(() => measure());
    if (track) observer.observe(track);
    document.fonts?.ready.then(() => measure());

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure, updateProgress, stages]);

  return (
    <section
      id={SectionId.EXPERIENCE}
      className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-stone-50 py-32"
    >
      {/* Ambient wash */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-orange-100/50 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-40 top-[45%] h-[520px] w-[520px] rounded-full bg-amber-100/40 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mx-auto mb-24 max-w-3xl text-center lg:mb-32">
          <span className="inline-block rounded-2xl bg-white px-5 py-2.5 text-sm font-medium text-stone-600 shadow-[0_2px_16px_rgba(28,25,23,0.06)]">
            {t.nav.experience}
          </span>
          <h2 className="mt-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text pb-2 text-5xl font-semibold tracking-tight text-transparent md:text-7xl">
            {t.experience.titlePart1}{' '}
            <span className="font-serif italic">{t.experience.titlePart2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-secondary">
            {t.experience.description}
          </p>
        </div>

        {/* Journey */}
        <div ref={trackRef} className="relative">
          <svg
            className="pointer-events-none absolute left-0 top-0 overflow-visible"
            width={size.w}
            height={size.h}
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="exp-line"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={size.h || 1}
              >
                <stop offset="0" stopColor={LINE_ORANGE} />
                {stops.map((stop, i) => (
                  <stop key={i} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            <path
              ref={dottedRef}
              fill="none"
              stroke="#d6d3d1"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="0 11"
            />
            <path
              ref={glowRef}
              fill="none"
              stroke="url(#exp-line)"
              strokeWidth={12}
              strokeLinecap="round"
              strokeDasharray="0 1"
              opacity={0.25}
              style={{ filter: 'blur(6px)' }}
            />
            <path
              ref={solidRef}
              fill="none"
              stroke="url(#exp-line)"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeDasharray="0 1"
            />
          </svg>

          <div className="space-y-28 lg:space-y-56">
            {stages.map((exp, index) => {
              const Icon = exp.icon;
              const showLogo = Boolean(exp.logo) && !brokenLogos.has(exp.id);
              const textLeft = index % 2 === 0;
              const reached = index <= activeIndex;
              const isCurrent = CURRENT_PATTERN.test(exp.period);
              const [from, to] = splitPeriod(exp.period);

              return (
                <div
                  key={exp.id}
                  ref={(el) => (rowRefs.current[index] = el)}
                  className="relative pl-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pl-0"
                >
                  {/* Text */}
                  <div
                    className={`lg:col-span-5 xl:col-span-4 ${
                      textLeft ? 'lg:order-1' : 'lg:order-3 lg:pl-4'
                    }`}
                  >
                    <p className="mb-5 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-medium text-stone-500">
                      {exp.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </p>
                    <h3 className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-3xl font-semibold leading-tight tracking-tight text-transparent md:text-4xl">
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-base text-stone-500">
                      {exp.orgUrl ? (
                        <a
                          href={exp.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-serif italic text-stone-700 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-orange-600 hover:decoration-orange-400"
                        >
                          {exp.org}
                        </a>
                      ) : (
                        <span className="font-serif italic text-stone-700">
                          {exp.org}
                        </span>
                      )}
                      <span className="mx-2 text-stone-300">·</span>
                      <span className="font-mono text-sm">{exp.period}</span>
                    </p>
                    {exp.link && (
                      <a
                        href={exp.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 underline decoration-orange-200 underline-offset-4 transition-colors hover:text-orange-700 hover:decoration-orange-500"
                      >
                        {exp.link.department}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}

                    <ol className="mt-8 space-y-5">
                      {exp.points.map((ach, i) => (
                        <li
                          key={i}
                          className="group/item flex gap-5 text-[15px] leading-relaxed text-stone-500 transition-colors duration-200 hover:text-stone-900"
                        >
                          <span className="w-6 flex-shrink-0 pt-0.5 font-mono text-xs text-stone-400 transition-colors duration-200 group-hover/item:font-bold group-hover/item:text-stone-900">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Node */}
                  <div className="absolute left-0 top-0 lg:static lg:order-2 lg:col-span-1 lg:flex lg:justify-center">
                    {React.createElement(
                      exp.orgUrl ? 'a' : 'div',
                      {
                        ref: (el: HTMLElement | null) =>
                          (nodeRefs.current[index] = el),
                        ...(exp.orgUrl && {
                          href: exp.orgUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          'aria-label': exp.org,
                          title: exp.org,
                        }),
                        className: `relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-500 ${
                          exp.orgUrl ? 'hover:scale-110' : ''
                        } ${
                          reached
                            ? 'text-orange-600 ring-2 ring-orange-500 shadow-[0_0_0_7px_rgba(249,115,22,0.14),0_0_22px_rgba(249,115,22,0.45)]'
                            : 'text-stone-400 ring-2 ring-stone-300'
                        }`,
                      },
                      showLogo ? (
                        <img
                          src={exp.logo}
                          alt=""
                          className="h-full w-full object-contain p-1.5"
                          ref={(img) => {
                            // A logo can fail before hydration attaches onError.
                            if (img?.complete && img.naturalWidth === 0) {
                              markLogoBroken(exp.id);
                            }
                          }}
                          onError={() => markLogoBroken(exp.id)}
                        />
                      ) : (
                        <Icon className="h-4 w-4" strokeWidth={2.25} />
                      )
                    )}
                  </div>

                  {/* Window card */}
                  <div
                    className={`mt-10 lg:col-span-6 lg:mt-0 xl:col-span-7 ${
                      textLeft ? 'lg:order-3' : 'lg:order-1'
                    }`}
                  >
                    <div
                      className={`rounded-[22px] border border-white/80 bg-white/50 p-2 shadow-[0_30px_60px_-30px_rgba(28,25,23,0.25)] backdrop-blur-sm transition-all duration-700 ${
                        reached
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-3 opacity-80'
                      }`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white">
                        {/* Title bar */}
                        <div className="flex items-center gap-1.5 border-b border-stone-100 px-4 py-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
                          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
                          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
                        </div>

                        <div className="flex min-h-[340px]">
                          {/* Sidebar */}
                          <aside className="hidden w-40 flex-shrink-0 flex-col border-r border-stone-100 p-3 sm:flex">
                            <div className="mb-3 flex items-center gap-1.5 px-1">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                              </span>
                              <span className="text-sm font-bold text-stone-800">
                                shueny
                              </span>
                            </div>
                            <div className="mb-4 flex items-center gap-1.5 rounded-md bg-stone-50 px-2 py-1.5 text-[10px] text-stone-400">
                              <Search className="h-3 w-3" />
                              {labels.search}
                            </div>
                            <div className="space-y-3 px-1">
                              {stages.map((other, i) =>
                                i === index ? (
                                  <div
                                    key={other.id}
                                    className="-mx-1 truncate rounded-md bg-orange-600 px-2 py-1.5 text-[10px] font-medium text-white"
                                  >
                                    {other.org}
                                  </div>
                                ) : (
                                  <div
                                    key={other.id}
                                    className="flex items-center justify-between"
                                  >
                                    <span
                                      className="h-1.5 rounded-full bg-stone-100"
                                      style={{
                                        width: `${55 + ((i * 17) % 35)}%`,
                                      }}
                                    ></span>
                                    <span className="h-1 w-1 rounded-full bg-stone-200"></span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="mt-auto flex items-center gap-2 px-1 pt-6">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-800 text-[8px] font-bold text-white">
                                SW
                              </span>
                              <span className="text-[10px] font-medium text-stone-700">
                                Shueny Wang
                              </span>
                            </div>
                          </aside>

                          {/* Main panel */}
                          <div className="min-w-0 flex-1 bg-stone-50/40 p-4">
                            <p className="mb-3 truncate text-[10px] text-stone-400">
                              {exp.crumb} › {exp.org}
                            </p>
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                              {showLogo && (
                                <img
                                  src={exp.logo}
                                  alt=""
                                  className="h-5 w-5 rounded object-contain"
                                />
                              )}
                              <span className="text-sm font-semibold text-stone-800">
                                {exp.org}
                              </span>
                              {isCurrent && (
                                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-600">
                                  {labels.now}
                                </span>
                              )}
                              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[9px] font-medium text-orange-600">
                                {exp.title}
                              </span>
                            </div>

                            {/* Stat cells */}
                            <div className="mb-3 grid grid-cols-3 gap-2">
                              {[
                                {
                                  icon: LogIn,
                                  label: labels.from,
                                  value: from,
                                },
                                {
                                  icon: LogOut,
                                  label: labels.to,
                                  value: to || '—',
                                },
                                {
                                  icon: ListChecks,
                                  label: exp.countLabel,
                                  value: String(exp.points.length),
                                },
                              ].map((cell) => (
                                <div
                                  key={cell.label}
                                  className="flex items-center gap-2 rounded-lg border border-stone-200/80 bg-white px-2.5 py-2"
                                >
                                  <cell.icon className="h-3 w-3 flex-shrink-0 text-stone-400" />
                                  <div className="min-w-0">
                                    <p className="truncate text-[8px] text-stone-400">
                                      {cell.label}
                                    </p>
                                    <p className="text-[10px] font-medium leading-tight text-stone-800">
                                      {cell.value}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Summary */}
                            <div className="rounded-lg border border-stone-200/80 bg-white p-3">
                              <p className="text-[11px] font-semibold text-stone-800">
                                {labels.summary}
                              </p>
                              <p className="mb-2 mt-1 text-[10px] leading-relaxed text-stone-500">
                                {exp.description}
                              </p>
                              <dl className="divide-y divide-stone-100 text-[10px]">
                                {exp.rows.map((row) => (
                                  <div
                                    key={row.label}
                                    className="grid grid-cols-[5.5rem_1fr] items-center py-1.5"
                                  >
                                    <dt className="flex items-center gap-1.5 text-stone-400">
                                      <row.icon className="h-3 w-3" />
                                      {row.label}
                                    </dt>
                                    <dd className="font-medium text-stone-700">
                                      {row.value}
                                    </dd>
                                  </div>
                                ))}
                                <div className="grid grid-cols-[5.5rem_1fr] items-start py-1.5">
                                  <dt className="flex items-center gap-1.5 pt-0.5 text-stone-400">
                                    <Code2 className="h-3 w-3" />
                                    {exp.chipsLabel}
                                  </dt>
                                  <dd className="flex flex-wrap gap-1">
                                    {exp.chips.map((s) => (
                                      <span
                                        key={s}
                                        className="rounded border border-stone-200 px-1.5 py-0.5 text-[9px] text-stone-600"
                                      >
                                        {s}
                                      </span>
                                    ))}
                                  </dd>
                                </div>
                                {exp.link && (
                                  <div className="grid grid-cols-[5.5rem_1fr] items-start py-1.5">
                                    <dt className="flex items-center gap-1.5 pt-0.5 text-stone-400">
                                      <ExternalLink className="h-3 w-3" />
                                      {labels.department}
                                    </dt>
                                    <dd>
                                      <a
                                        href={exp.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-orange-600 underline decoration-orange-200 underline-offset-2 hover:decoration-orange-500"
                                      >
                                        {exp.link.text} ↗
                                      </a>
                                    </dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceList;
