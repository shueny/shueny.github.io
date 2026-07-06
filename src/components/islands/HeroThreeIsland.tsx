import React, { useEffect, useRef } from 'react';

/**
 * HeroThreeIsland — subtle three.js particle-wave accent for the hero.
 *
 * A field of brand-orange dots undulating like a signal/data surface,
 * echoing the site's AI theme without competing with the typography.
 *
 * Performance guardrails (this site is Lighthouse-tuned):
 * - Mounted with client:idle and three.js is dynamically imported inside
 *   an idle callback, so it never touches FCP/LCP; Vite code-splits it.
 * - Skipped entirely on small screens and for prefers-reduced-motion.
 * - Renders only while the hero is on screen (IntersectionObserver)
 *   and the tab is visible; DPR capped at 1.5.
 */
const HeroThreeIsland: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const smallScreen = window.matchMedia('(max-width: 767px)').matches;
    if (reducedMotion || smallScreen) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const idleId =
      'requestIdleCallback' in window
        ? (window as any).requestIdleCallback(init, { timeout: 4000 })
        : setTimeout(init, 1500);

    async function init() {
      const THREE = await import('three');
      if (disposed || !canvas) return;
      // The astro-island wrapper is display:contents (no box), so size and
      // track the nearest section — the hero — instead of the direct parent.
      const host = (canvas.closest('section') ||
        canvas.parentElement) as HTMLElement;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 6.5, 13);
      camera.lookAt(0, 0, 0);

      // ── particle grid ────────────────────────────────────────────
      const COLS = 90;
      const ROWS = 42;
      const SPACING = 0.42;
      const COUNT = COLS * ROWS;

      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);

      // brand palette: accent orange → warm amber (--accent: 18 90% 48%)
      const cAccent = new THREE.Color('#e35414');
      const cAmber = new THREE.Color('#f5a623');
      const tmp = new THREE.Color();

      let i = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          positions[i * 3] = (c - COLS / 2) * SPACING;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = (r - ROWS / 2) * SPACING;
          tmp.copy(cAccent).lerp(cAmber, (c / COLS) * 0.9 + Math.random() * 0.1);
          colors[i * 3] = tmp.r;
          colors[i * 3 + 1] = tmp.g;
          colors[i * 3 + 2] = tmp.b;
          i++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      points.rotation.x = -0.12;
      scene.add(points);

      // ── sizing ───────────────────────────────────────────────────
      function resize() {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      // ── gentle mouse parallax ────────────────────────────────────
      let targetRotY = 0;
      let targetRotX = -0.12;
      const onPointerMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotY = nx * 0.12;
        targetRotX = -0.12 + ny * 0.06;
      };
      host.addEventListener('pointermove', onPointerMove, { passive: true });

      // ── animation loop, paused when off screen or tab hidden ────
      let visible = true;
      let running = false;
      let rafId = 0;
      const clock = new THREE.Clock();
      const pos = geometry.getAttribute('position') as InstanceType<
        typeof THREE.BufferAttribute
      >;

      function frame() {
        if (disposed || !visible || document.hidden) {
          running = false;
          return;
        }
        rafId = requestAnimationFrame(frame);

        const t = clock.getElapsedTime() * 0.55;
        for (let k = 0; k < COUNT; k++) {
          const x = pos.getX(k);
          const z = pos.getZ(k);
          pos.setY(
            k,
            Math.sin(x * 0.55 + t) * 0.32 + Math.cos(z * 0.7 + t * 0.8) * 0.28
          );
        }
        pos.needsUpdate = true;

        points.rotation.y += (targetRotY - points.rotation.y) * 0.04;
        points.rotation.x += (targetRotX - points.rotation.x) * 0.04;

        renderer.render(scene, camera);
      }

      function ensureRunning() {
        if (!running && !disposed && visible && !document.hidden) {
          running = true;
          rafId = requestAnimationFrame(frame);
        }
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) ensureRunning();
        },
        { threshold: 0.05 }
      );
      io.observe(host);

      document.addEventListener('visibilitychange', ensureRunning);

      ensureRunning();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener('visibilitychange', ensureRunning);
        host.removeEventListener('pointermove', onPointerMove);
        io.disconnect();
        ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    return () => {
      disposed = true;
      if ('cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as ReturnType<typeof setTimeout>);
      }
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      style={{
        maskImage:
          'radial-gradient(120% 90% at 72% 45%, black 35%, transparent 78%)',
        WebkitMaskImage:
          'radial-gradient(120% 90% at 72% 45%, black 35%, transparent 78%)',
      }}
      aria-hidden="true"
    />
  );
};

export default HeroThreeIsland;
