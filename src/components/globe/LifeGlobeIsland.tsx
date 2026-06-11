import React, { Suspense, lazy } from 'react';

// The globe pulls in three.js (~500KB gzip). Lazy-load it so this island's
// entry chunk stays tiny and the loading veil paints immediately while the
// heavy chunk streams in.
const LifeGlobe = lazy(() => import('./LifeGlobe'));

const veil = (
  <div className="flex h-full w-full items-center justify-center bg-[#03060f]">
    <div className="flex flex-col items-center gap-3 text-white/70">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-sky-400" />
      <p className="text-sm tracking-widest">載入地球中…</p>
    </div>
  </div>
);

const LifeGlobeIsland: React.FC = () => (
  <Suspense fallback={veil}>
    <LifeGlobe />
  </Suspense>
);

export default LifeGlobeIsland;
