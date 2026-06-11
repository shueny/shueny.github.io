/**
 * LifeGlobe — immersive 3D Earth + life timeline experience.
 *
 * Rendered client-only (mounted with `client:only="react"` from journey.astro),
 * so top-level imports of react-globe.gl / three are safe.
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Globe from 'react-globe.gl';
// @ts-ignore -- the repo has no @types/three; three is used as an untyped module
import * as THREE from 'three';
import { lifeTimeline, type LifeEvent } from '@/lib/data/lifeTimeline';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const PHASE_LABEL: Record<LifeEvent['phase'], string> = {
  student: '學生時期',
  work: '職涯',
  travel: '旅行',
  life: '生活',
};

const PHASE_BADGE_CLASS: Record<LifeEvent['phase'], string> = {
  student: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
  work: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
  travel: 'bg-pink-500/20 text-pink-200 border-pink-400/40',
  life: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
};

const DEFAULT_ALTITUDE = 0.8;
const INTRO_ALTITUDE = 2.2;
const FLY_MS = 1400;

/* ------------------------------------------------------------------ */
/* Small hooks                                                         */
/* ------------------------------------------------------------------ */

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isMobile;
}

function useContainerSize(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/* ------------------------------------------------------------------ */
/* 3D character (low-poly friendly humanoid built from primitives)     */
/* ------------------------------------------------------------------ */

interface CharacterParts {
  group: THREE.Group;
  body: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
}

function buildCharacter(): CharacterParts {
  const group = new THREE.Group(); // anchored at the feet
  const body = new THREE.Group(); // yaw (heading) is applied here
  group.add(body);

  const skin = new THREE.MeshStandardMaterial({ color: 0xffd9b3, roughness: 0.7 });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 });
  const shoe = new THREE.MeshStandardMaterial({ color: 0xf4f4f5, roughness: 0.5 });

  // Torso
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.75, 1.0, 6, 12), shirt);
  torso.position.y = 2.45;
  body.add(torso);

  // Head + hair cap
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 16), skin);
  head.position.y = 3.95;
  body.add(head);
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.66, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55),
    hair
  );
  cap.position.y = 4.05;
  body.add(cap);

  const makeLimb = (
    material: THREE.Material,
    radius: number,
    length: number,
    withShoe: boolean
  ): THREE.Group => {
    const pivot = new THREE.Group();
    const mesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(radius, length, 4, 8),
      material
    );
    mesh.position.y = -(length / 2 + radius); // hang below the pivot
    pivot.add(mesh);
    if (withShoe) {
      const foot = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.15, 10, 8),
        shoe
      );
      foot.position.set(0, -(length + radius * 1.6), radius * 0.35);
      foot.scale.set(1, 0.7, 1.35);
      pivot.add(foot);
    }
    return pivot;
  };

  // Arms (pivot at shoulders)
  const leftArm = makeLimb(skin, 0.2, 0.85, false);
  leftArm.position.set(-0.95, 3.05, 0);
  const rightArm = makeLimb(skin, 0.2, 0.85, false);
  rightArm.position.set(0.95, 3.05, 0);
  body.add(leftArm, rightArm);

  // Legs (pivot at hips)
  const leftLeg = makeLimb(pants, 0.24, 0.95, true);
  leftLeg.position.set(-0.38, 1.7, 0);
  const rightLeg = makeLimb(pants, 0.24, 0.95, true);
  rightLeg.position.set(0.38, 1.7, 0);
  body.add(leftLeg, rightLeg);

  group.scale.setScalar(1.1); // ~5 units tall on a radius-100 globe

  return { group, body, leftArm, rightArm, leftLeg, rightLeg };
}

function disposeCharacter(group: THREE.Group) {
  group.traverse((obj: any) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(material)) material.forEach((m) => m.dispose());
    else if (material) material.dispose();
  });
}

/* ------------------------------------------------------------------ */
/* Geo helpers                                                         */
/* ------------------------------------------------------------------ */

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Shortest signed longitude delta in degrees (-180, 180]. */
function lngDelta(from: number, to: number): number {
  let d = to - from;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

/** Initial bearing (radians) from current to target, 0 = north. */
function bearingTo(lat1: number, lng1: number, lat2: number, lng2: number) {
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δλ = toRad(lngDelta(lng1, lng2));
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return Math.atan2(y, x);
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

const INITIAL_INDEX = lifeTimeline.length - 1; // most recent entry (present day)

const LifeGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const yearBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const globeRef = useRef<any>(null);

  const isMobile = useIsMobile();
  const { width, height } = useContainerSize(containerRef);

  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  const active = lifeTimeline[activeIndex];

  // Character animation state (mutable, lives outside React renders)
  const charRef = useRef<CharacterParts | null>(null);
  const curPosRef = useRef({ lat: active.lat, lng: active.lng });
  const targetPosRef = useRef({ lat: active.lat, lng: active.lng });
  const headingRef = useRef(0);
  const rafRef = useRef(0);

  /* ----------------------------- selection ----------------------------- */

  const selectYear = useCallback((index: number) => {
    const entry = lifeTimeline[index];
    if (!entry) return;
    setActiveIndex(index);
    setHintVisible(false);
    targetPosRef.current = { lat: entry.lat, lng: entry.lng };
    const globe = globeRef.current;
    if (globe) {
      const controls = globe.controls();
      if (controls) controls.autoRotate = false;
      globe.pointOfView(
        { lat: entry.lat, lng: entry.lng, altitude: entry.altitude ?? DEFAULT_ALTITUDE },
        FLY_MS
      );
    }
  }, []);

  const selectPrev = useCallback(
    () => selectYear(Math.max(0, activeIndex - 1)),
    [activeIndex, selectYear]
  );
  const selectNext = useCallback(
    () => selectYear(Math.min(lifeTimeline.length - 1, activeIndex + 1)),
    [activeIndex, selectYear]
  );

  // Auto-scroll the active year button into view (centered).
  useEffect(() => {
    const strip = stripRef.current;
    const btn = yearBtnRefs.current[activeIndex];
    if (!strip || !btn) return;
    strip.scrollTo({
      left: btn.offsetLeft - strip.clientWidth / 2 + btn.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [activeIndex]);

  // Close the mobile sheet if we leave mobile layout.
  useEffect(() => {
    if (!isMobile) setSheetOpen(false);
  }, [isMobile]);

  /* --------------------------- globe markers --------------------------- */

  const markersData = useMemo(
    () =>
      lifeTimeline.map((e, idx) => ({
        lat: e.lat,
        lng: e.lng,
        idx,
        emoji: e.emoji ?? '📍',
        year: e.year,
        color: e.color ?? '#fbbf24',
        active: idx === activeIndex,
      })),
    [activeIndex]
  );

  const makeMarkerElement = useCallback(
    (d: any) => {
      const el = document.createElement('div');
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `${d.year} ${d.emoji}`);
      el.innerHTML = `
        <div style="
          display:flex;flex-direction:column;align-items:center;gap:2px;
          transform:translateY(-55%);user-select:none;
          transition:transform .25s ease;
          ${d.active ? 'transform:translateY(-55%) scale(1.35);' : ''}
        ">
          <span style="
            font-size:${d.active ? '22px' : '15px'};
            filter:drop-shadow(0 2px 4px rgba(0,0,0,.6));
            line-height:1;
          ">${d.emoji}</span>
          <span style="
            font-size:9px;font-weight:700;letter-spacing:.04em;
            color:${d.active ? '#fff' : 'rgba(255,255,255,.75)'};
            background:${d.active ? d.color : 'rgba(10,15,30,.65)'};
            border:1px solid ${d.active ? '#fff' : 'rgba(255,255,255,.25)'};
            border-radius:999px;padding:1px 6px;
            box-shadow:${d.active ? `0 0 12px ${d.color}` : 'none'};
          ">${d.year}</span>
          <span style="
            width:${d.active ? '10px' : '6px'};height:${d.active ? '10px' : '6px'};
            border-radius:999px;background:${d.color};
            border:1.5px solid rgba(255,255,255,.9);
            box-shadow:0 0 ${d.active ? '14px' : '6px'} ${d.color};
          "></span>
        </div>`;
      el.onclick = (ev) => {
        ev.stopPropagation();
        selectYear(d.idx);
      };
      return el;
    },
    [selectYear]
  );

  /* ----------------- globe setup + character animation ----------------- */

  const handleGlobeReady = useCallback(() => setGlobeReady(true), []);

  useEffect(() => {
    if (!globeReady) return;
    const globe = globeRef.current;
    if (!globe) return;

    // Camera + controls intro state
    const controls = globe.controls();
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.minDistance = 140;
    controls.maxDistance = 480;
    const stopAutoRotate = () => {
      controls.autoRotate = false;
      setHintVisible(false);
    };
    controls.addEventListener('start', stopAutoRotate);

    const initial = lifeTimeline[INITIAL_INDEX];
    globe.pointOfView(
      { lat: initial.lat, lng: initial.lng, altitude: INTRO_ALTITUDE },
      0
    );

    // Build + mount the character
    const parts = buildCharacter();
    charRef.current = parts;
    globe.scene().add(parts.group);

    // Animation loop: walk across the surface toward the target lat/lng
    const Y_AXIS = new THREE.Vector3(0, 1, 0);
    const up = new THREE.Vector3();
    const north = new THREE.Vector3();
    const east = new THREE.Vector3();
    const headingVec = new THREE.Vector3();
    const xAxis = new THREE.Vector3();
    const basis = new THREE.Matrix4();
    let last = performance.now();
    let walkBlend = 0; // 0 = idle, 1 = full walk cycle

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;

      const g = globeRef.current;
      const c = charRef.current;
      if (!g || !c) return;

      const cur = curPosRef.current;
      const tgt = targetPosRef.current;
      const dLat = tgt.lat - cur.lat;
      const dLng = lngDelta(cur.lng, tgt.lng);
      const dist = Math.hypot(dLat, dLng); // degrees
      const moving = dist > 0.08;

      if (moving) {
        headingRef.current = bearingTo(cur.lat, cur.lng, tgt.lat, tgt.lng);
        // Exponential ease with a minimum speed so long trips still complete.
        const ease = 1 - Math.exp(-dt * 0.0022);
        const minStep = dt * 0.004; // degrees per ms floor
        const step = Math.min(dist, Math.max(dist * ease, minStep));
        cur.lat += (dLat / dist) * step;
        cur.lng += (dLng / dist) * step;
        if (cur.lng > 180) cur.lng -= 360;
        if (cur.lng < -180) cur.lng += 360;
      } else {
        cur.lat = tgt.lat;
        cur.lng = tgt.lng;
      }

      // Blend the walk cycle in/out smoothly
      walkBlend += ((moving ? 1 : 0) - walkBlend) * Math.min(1, dt * 0.008);

      // Walk cycle: leg/arm swing + vertical bob
      const swing = Math.sin(now * 0.013) * 0.85 * walkBlend;
      c.leftLeg.rotation.x = swing;
      c.rightLeg.rotation.x = -swing;
      c.leftArm.rotation.x = -swing * 0.8;
      c.rightArm.rotation.x = swing * 0.8;
      const bob = Math.abs(Math.sin(now * 0.013)) * 0.5 * walkBlend;

      // Position on the globe surface (radius 100; small altitude = feet on ground)
      const pos = g.getCoords(cur.lat, cur.lng, 0.004 + bob * 0.004);
      c.group.position.set(pos.x, pos.y, pos.z);

      // Orient: local up = surface normal, facing = travel heading
      up.set(pos.x, pos.y, pos.z).normalize();
      north.copy(Y_AXIS).addScaledVector(up, -Y_AXIS.dot(up));
      if (north.lengthSq() < 1e-6) north.set(1, 0, 0); // pole guard
      north.normalize();
      east.crossVectors(north, up).normalize();
      headingVec
        .copy(north)
        .multiplyScalar(Math.cos(headingRef.current))
        .addScaledVector(east, Math.sin(headingRef.current));
      xAxis.crossVectors(up, headingVec).normalize();
      basis.makeBasis(xAxis, up, headingVec);
      c.group.quaternion.setFromRotationMatrix(basis);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      controls.removeEventListener('start', stopAutoRotate);
      const scene = globe.scene && globe.scene();
      if (scene && charRef.current) scene.remove(charRef.current.group);
      if (charRef.current) disposeCharacter(charRef.current.group);
      charRef.current = null;
    };
  }, [globeReady]);

  /* ------------------------------ render ------------------------------- */

  const detailBody = (
    <>
      <div className="flex items-center gap-3">
        <span className="text-4xl leading-none" aria-hidden="true">
          {active.emoji ?? '📍'}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold tracking-wide"
              style={{ color: active.color ?? '#fbbf24' }}
            >
              {active.year}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${PHASE_BADGE_CLASS[active.phase]}`}
            >
              {PHASE_LABEL[active.phase]}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-white/60">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {active.location}
          </div>
        </div>
      </div>

      <h2 className="mt-4 text-lg font-semibold leading-snug text-white">
        {active.title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-white/80">
        {active.description}
      </p>

      {active.highlights && active.highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {active.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-sm text-white/75"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: active.color ?? '#fbbf24' }}
                aria-hidden="true"
              />
              {h}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#03060f] text-white"
    >
      <style>{`
        @keyframes lg-sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes lg-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .lg-no-scrollbar::-webkit-scrollbar { display: none; }
        .lg-no-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* Globe canvas */}
      <div className="absolute inset-0" aria-hidden="true">
        {width > 0 && height > 0 && (
          <Globe
            ref={globeRef}
            width={width}
            height={height}
            globeImageUrl="/images/globe/earth-blue-marble.jpg"
            bumpImageUrl="/images/globe/earth-topology.png"
            backgroundImageUrl="/images/globe/night-sky.png"
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere
            atmosphereColor="#6ab7ff"
            atmosphereAltitude={0.18}
            htmlElementsData={markersData}
            htmlElement={makeMarkerElement}
            htmlAltitude={0.012}
            onGlobeReady={handleGlobeReady}
          />
        )}
      </div>

      {/* Loading veil until the globe is ready */}
      {!globeReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#03060f]">
          <div className="flex flex-col items-center gap-3 text-white/70">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-sky-400" />
            <p className="text-sm tracking-widest">載入地球中…</p>
          </div>
        </div>
      )}

      {/* Top hint */}
      <div
        className={`pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 transition-opacity duration-700 ${
          hintVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs tracking-widest text-white/85 backdrop-blur-md">
          🌏 拖曳旋轉 · 點選年份探索
        </span>
      </div>

      {/* Desktop: glass detail panel on the right */}
      {!isMobile && (
        <aside
          className="absolute right-5 top-5 z-20 w-[380px] max-w-[40vw] overflow-y-auto rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl"
          style={{
            maxHeight: 'calc(100% - 9.5rem)',
            animation: 'lg-fade-in .5s ease both',
          }}
          aria-label="年份詳細資訊"
        >
          {detailBody}
        </aside>
      )}

      {/* Mobile: compact title chip that opens the bottom sheet */}
      {isMobile && !sheetOpen && (
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-label={`查看 ${active.year} 年詳細內容`}
          className="absolute bottom-[6.5rem] left-1/2 z-20 flex max-w-[88vw] -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 py-2 pl-3 pr-4 shadow-lg shadow-black/40 backdrop-blur-xl active:scale-95"
          style={{ animation: 'lg-fade-in .4s ease both' }}
        >
          <span className="text-xl leading-none" aria-hidden="true">
            {active.emoji ?? '📍'}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: active.color ?? '#fbbf24' }}
          >
            {active.year}
          </span>
          <span className="truncate text-sm text-white/90">{active.title}</span>
          <svg
            className="h-4 w-4 shrink-0 text-white/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}

      {/* Mobile: bottom-sheet modal with full details */}
      {isMobile && sheetOpen && (
        <div className="absolute inset-0 z-40" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="關閉詳細內容"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            style={{ animation: 'lg-fade-in .25s ease both' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 max-h-[75%] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-[#0a1022]/90 p-6 pb-10 shadow-2xl backdrop-blur-xl"
            style={{ animation: 'lg-sheet-up .3s cubic-bezier(.22,1,.36,1) both' }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/25" />
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="關閉"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 active:scale-90"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            {detailBody}
          </div>
        </div>
      )}

      {/* Bottom timeline strip */}
      <nav
        className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#03060f] via-[#03060f]/80 to-transparent pb-3 pt-8"
        aria-label="人生年份時間軸"
      >
        <div className="flex items-center gap-1 px-2 md:gap-2 md:px-4">
          <button
            type="button"
            onClick={selectPrev}
            disabled={activeIndex === 0}
            aria-label="上一年"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur-md transition hover:bg-white/20 disabled:opacity-30"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div
            ref={stripRef}
            className="lg-no-scrollbar flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-1 py-1"
          >
            {lifeTimeline.map((e, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={e.year + e.location}
                  ref={(el) => (yearBtnRefs.current[idx] = el)}
                  type="button"
                  onClick={() => selectYear(idx)}
                  aria-label={`${e.year} 年 — ${e.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group flex shrink-0 snap-center flex-col items-center gap-0.5 rounded-xl border px-3.5 py-2 backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? 'border-white/40 bg-white/15 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                  }`}
                  style={
                    isActive
                      ? { boxShadow: `0 0 18px ${(e.color ?? '#fbbf24')}66` }
                      : undefined
                  }
                >
                  <span
                    className={`text-base leading-none transition-transform duration-300 ${
                      isActive ? 'scale-125' : 'opacity-80'
                    }`}
                    aria-hidden="true"
                  >
                    {e.emoji ?? '📍'}
                  </span>
                  <span
                    className={`text-xs font-bold tracking-wide ${
                      isActive ? '' : 'text-white/65'
                    }`}
                    style={isActive ? { color: e.color ?? '#fbbf24' } : undefined}
                  >
                    {e.year}
                  </span>
                  <span
                    className={`max-w-[7rem] truncate text-[10px] ${
                      isActive ? 'text-white/85' : 'text-white/40'
                    }`}
                  >
                    {PHASE_LABEL[e.phase]} · {e.location.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={selectNext}
            disabled={activeIndex === lifeTimeline.length - 1}
            aria-label="下一年"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur-md transition hover:bg-white/20 disabled:opacity-30"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LifeGlobe;
