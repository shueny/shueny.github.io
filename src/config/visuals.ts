// ---------------------------------------------------------------------------
// Visual Stories page content (Travel & Documentary)
//
// This drives /visuals — a cinematic, emons.de-style media page.
//
// HOW TO SWAP PLACEHOLDERS FOR YOUR REAL WORK
// 1. Video: drop your files into /public/videos/ (e.g. hero.mp4, reel.mp4)
//    and point `video` below at them, e.g. video: "/videos/hero.mp4".
//    Until a real video exists the `poster` image is shown, so the page
//    always looks complete.
// 2. Photos: replace the `src` paths. Local images live in /public/images.
//    External (Pexels) URLs work too — both are already used on this site.
// ---------------------------------------------------------------------------

export interface VisualsHero {
  /** Headline shown over the hero video. */
  title: string;
  /** Smaller line under the headline. */
  subtitle: string;
  /** Path to a looping background video. Falls back to `poster` if missing. */
  video?: string;
  /** Still image shown before/while the video loads, or if it is missing. */
  poster: string;
}

export interface VisualsStat {
  value: string;
  label: string;
}

export interface VisualsFeatured {
  eyebrow: string;
  title: string;
  description: string;
  /** Local mp4 (e.g. /videos/reel.mp4) or an external embed/file. Optional. */
  video?: string;
  poster: string;
}

export interface VisualsStory {
  title: string;
  location: string;
  year: string;
  description: string;
  image: string;
}

export interface VisualsService {
  icon: string; // lucide icon name, e.g. "film"
  title: string;
  description: string;
}

export const visualsHero: VisualsHero = {
  title: "Visual Stories from the Road",
  subtitle: "Travel & Documentary Films · 5+ Years Behind the Lens",
  video: "/videos/hero.mp4", // add this file to enable motion (optional)
  poster: "/images/section1-bg.jpg",
};

export const visualsIntro = {
  eyebrow: "Shueny · Travel & Documentary",
  statement:
    "For over five years I have travelled across continents, capturing the people, places and quiet moments most cameras pass by — turning real journeys into films and frames that stay with you.",
};

export const visualsStats: VisualsStat[] = [
  { value: "5+", label: "Years filming" },
  { value: "20+", label: "Countries documented" },
  { value: "60+", label: "Stories told" },
  { value: "3", label: "Continents" },
];

export const visualsFeatured: VisualsFeatured = {
  eyebrow: "Featured Film",
  title: "Across Namibia — A Desert Diary",
  description:
    "A short documentary following life at the edge of the Namib desert: the light, the silence, and the people who call it home. Replace this with your own showreel or signature film.",
  video: "/videos/reel.mp4", // add this file to enable playback (optional)
  poster: "/images/africa_namibia.jpg",
};

export const visualsStories: VisualsStory[] = [
  {
    title: "Under the Northern Lights",
    location: "Yukon, Canada",
    year: "2024",
    description:
      "Chasing the aurora through frozen nights — a study in patience and cold light.",
    image: "/images/canada_northernlight.jpg",
  },
  {
    title: "The Long Way South",
    location: "Patagonia, South America",
    year: "2023",
    description:
      "A self-guided journey down the spine of the Andes, camera always rolling.",
    image: "/images/south-america-self-guided.jpg",
  },
  {
    title: "Edge of the Namib",
    location: "Namibia, Africa",
    year: "2023",
    description:
      "Desert dunes, golden hour, and the rhythm of a land that never hurries.",
    image: "/images/africa_namibia.jpg",
  },
  {
    title: "Lanterns & Streets",
    location: "Taiwan, Asia",
    year: "2022",
    description:
      "Festival nights and everyday corners — documentary frames from home.",
    image:
      "https://images.pexels.com/photos/5500779/pexels-photo-5500779.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const visualsServices: VisualsService[] = [
  {
    icon: "film",
    title: "Travel Films",
    description:
      "Cinematic short films that turn a trip into a story worth rewatching.",
  },
  {
    icon: "clapperboard",
    title: "Documentary",
    description:
      "Honest, character-led documentary work — people, places and real moments.",
  },
  {
    icon: "camera",
    title: "Photography",
    description:
      "Stills that stand on their own: landscapes, portraits and reportage.",
  },
];

export const visualsCta = {
  title: "Have a story worth telling?",
  description:
    "Whether it's a journey, a brand, or a moment you want remembered — let's make something that lasts.",
  email: "shuen29@gmail.com",
  instagram: "https://www.instagram.com/shueny_wang/",
};
