/**
 * Digital business card configuration.
 *
 * The raw data lives in `card.data.json` so it can be shared as a single
 * source of truth between this typed config (used by the /card page) and the
 * Node generation script (`scripts/generate-card.mjs`), which builds the
 * downloadable vCard, the QR code and the standalone offline card.
 *
 * Edit `card.data.json`, then run `pnpm run card:gen` to regenerate assets.
 */
import data from './card.data.json';

export interface CardLink {
  label: string;
  href: string;
  /** astro-icon name, e.g. "mdi:github" */
  icon: string;
}

export interface CardConfig {
  name: string;
  /** Short headline shown under the name */
  title: string;
  /** One-line tagline / slogan */
  tagline: string;
  /** Organisation / company (vCard ORG) */
  company: string;
  location: string;
  email: string;
  /** E.164 format, used for tel: links and the vCard */
  phone: string;
  /** Canonical URL of this card, also encoded in the QR code */
  url: string;
  website: string;
  social: CardLink[];
}

export const cardConfig: CardConfig = data;
