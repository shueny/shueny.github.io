/**
 * Original pixel-art sprites for the Security Quest player.
 * Each sprite is a grid of characters; every character maps to a colour in
 * the sprite's palette ('.' is transparent). Rendered as SVG rects so they
 * stay crisp at any scale.
 */

export type Sprite = { rows: string[]; palette: Record<string, string> };

const INK = '#222034';

export const SPRITES: Record<string, Sprite> = {
  // The hero: a kid in a blue hoodie (stands in for "the user").
  user: {
    rows: [
      '...kkkkkk...',
      '..kaaaaaak..',
      '.kaaaaaaaak.',
      '.kassssssak.',
      'kassssssssak',
      'kasessssesak',
      'kacsssssscak',
      '.kassssssak.',
      '..kkaaaakk..',
      '.kaaaaaaaak.',
      'kaabaaaabaak',
      'ksaaaaaaaask',
      '.kppppppppk.',
      '.kffk..kffk.',
    ],
    palette: { k: INK, a: '#3D7BFF', b: '#2B55C7', s: '#FFD2A8', e: INK, c: '#FF8FA3', p: '#2C2F6B', f: '#6B3E26' },
  },
  // The attacker: a grumpy purple bug.
  bug: {
    rows: [
      '..k......k..',
      '...k....k...',
      '...kkkkkk...',
      '..kaaaaaak..',
      '.kawwaawwak.',
      '.kaweaaweak.',
      'kaaaaaaaaaak',
      'kabaaaaaabak',
      'kaaakkkkaaak',
      '.kaaaaaaaak.',
      'k.kak..kak.k',
      '...k....k...',
    ],
    palette: { k: INK, a: '#9B5DE5', b: '#6A3BB3', w: '#FFFFFF', e: '#E43B44' },
  },
  server: {
    rows: [
      'kkkkkkkkkkkk',
      'kaaaaaaaaaak',
      'kagaraaaaaak',
      'kbbbbbbbbbbk',
      'kkkkkkkkkkkk',
      'kaaaaaaaaaak',
      'kagaraaaaaak',
      'kbbbbbbbbbbk',
      'kkkkkkkkkkkk',
      'kaaaaaaaaaak',
      'kagaraaaaaak',
      'kbbbbbbbbbbk',
      'kkkkkkkkkkkk',
      '.kk......kk.',
    ],
    palette: { k: INK, a: '#DCDDFF', b: '#8F92D8', g: '#3CB043', r: '#FFC93C' },
  },
  window: {
    rows: [
      'kkkkkkkkkkkk',
      'kbrbybgbbbbk',
      'kkkkkkkkkkkk',
      'kwwwwwwwwwwk',
      'kwaaaaawwwwk',
      'kwwwwwwwwwwk',
      'kwaaaaaaaawk',
      'kwaaaaaawwwk',
      'kwwwwwwwwwwk',
      'kwccccwwwwwk',
      'kwwwwwwwwwwk',
      'kkkkkkkkkkkk',
    ],
    palette: { k: INK, b: '#6EC6FF', r: '#E43B44', y: '#FFC93C', g: '#3CB043', w: '#FFFFFF', a: '#9FA3E3', c: '#FFC93C' },
  },
  code: {
    rows: [
      '.kkkkkkkkkk.',
      '.kwwwwwwwwk.',
      '.kwaawaaawk.',
      '.kwwwwwwwwk.',
      '.kwaaaawwwk.',
      '.kwwwwwwwwk.',
      '.kwcwwwwcwk.',
      '.kcwwwwwwck.',
      '.kwcwwwwcwk.',
      '.kwwwwwwwwk.',
      '.kwaaaaaawk.',
      '.kkkkkkkkkk.',
    ],
    palette: { k: INK, w: '#FFF4D6', a: '#9FA3E3', c: '#3D7BFF' },
  },
  box: {
    rows: [
      'kkkkkkkkkkkk',
      'kaaaaccaaaak',
      'kaaaaccaaaak',
      'kaaaaccaaaak',
      'kcccccccccck',
      'kaaaaccaaaak',
      'kaaaaccaaaak',
      'kbbbbccbbbbk',
      'kkkkkkkkkkkk',
    ],
    palette: { k: INK, a: '#D9954A', b: '#A8652B', c: '#F2D6A2' },
  },
  db: {
    rows: [
      '.kkkkkkkkkk.',
      'kaaaaaaaaaak',
      'kbbbbbbbbbbk',
      'kkkkkyykkkkk',
      'kaaaayyaaaak',
      'kaaaaaaaaaak',
      'kbbbbbbbbbbk',
      'kkkkkkkkkkkk',
    ],
    palette: { k: INK, a: '#C86B2C', b: '#8A4A1E', y: '#FFC93C' },
  },
  wifi: {
    rows: [
      '.y........y.',
      '..y......y..',
      '...y.kk.y...',
      '.....kk.....',
      '....kaak....',
      '....kaak....',
      '...kaaaak...',
      '...kabbak...',
      '..kaaaaaak..',
      '..kabbbbak..',
      '.kaaaaaaaak.',
      '.kkkkkkkkkk.',
    ],
    palette: { k: INK, a: '#C9CCEB', b: '#6B6FB5', y: '#FFC93C' },
  },
  shield: {
    rows: [
      'kkkkkkkkkk',
      'kggggggggk',
      'kggggggwgk',
      'kgggggwwgk',
      'kgwggwwggk',
      'kgwwwwgggk',
      'kggwwggggk',
      '.kggggggk.',
      '..kggggk..',
      '...kggk...',
      '....kk....',
    ],
    palette: { k: INK, g: '#3CB043', w: '#FFFFFF' },
  },
  coin: {
    rows: ['..kkkk..', '.kyyyyk.', 'kywyyyok', 'kywyyyok', 'kyyyyyok', 'kyyyyook', '.kyoook.', '..kkkk..'],
    palette: { k: INK, y: '#FFC93C', w: '#FFF6C7', o: '#E6A800' },
  },
  bomb: {
    rows: ['.....yy.', '....k...', '..kkkk..', '.krrrrk.', 'krwrrrrk', 'krrrrrrk', '.krrrrk.', '..kkkk..'],
    palette: { k: INK, r: '#E43B44', w: '#FFB3B8', y: '#FFC93C' },
  },
};

// Actor kinds from topics.ts that reuse another sprite.
const ALIAS: Record<string, string> = { globe: 'window' };

// "Bad" actors (attacker-owned) get a red palette swap.
const BAD_SWAP: Record<string, string> = {
  '#DCDDFF': '#FFB3B8',
  '#8F92D8': '#E43B44',
  '#3CB043': '#FFE0E3',
  '#6EC6FF': '#E43B44',
  '#9FA3E3': '#F27A85',
  '#C9CCEB': '#FFB3B8',
  '#6B6FB5': '#E43B44',
};

export function spriteFor(kind: string, bad = false): Sprite {
  const base = SPRITES[ALIAS[kind] ?? kind] ?? SPRITES.window;
  if (!bad || kind === 'bug') return base;
  const palette = Object.fromEntries(Object.entries(base.palette).map(([k, v]) => [k, BAD_SWAP[v] ?? v]));
  return { rows: base.rows, palette };
}

/** Draws a sprite at (x, y) = top-left, `px` SVG units per pixel. */
export function PixelSprite({ sprite, x, y, px = 2, className }: { sprite: Sprite; x: number; y: number; px?: number; className?: string }) {
  const rects: JSX.Element[] = [];
  sprite.rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const fill = sprite.palette[row[c]];
      if (fill) rects.push(<rect key={`${r}-${c}`} x={x + c * px} y={y + r * px} width={px} height={px} fill={fill} />);
    }
  });
  return <g className={className}>{rects}</g>;
}

export const spriteSize = (s: Sprite, px = 2) => ({ w: s.rows[0].length * px, h: s.rows.length * px });
