export const profile = {
  name: "Paul Denis Navero",
  nickname: "Paul Dena",
  tagline: "Combattant MMA professionnel — Mentalité d'entrepreneur.",
  birthYear: 2002,
  city: "Colmar, France",
  disciplines: ["MMA", "Boxe", "Grappling"],
  weightClass: "Bantamweight (-61,2 kg)",
  height: "173 cm",
  stance: "Orthodoxe",
  team: "Hexagone MMA",
};

export const socials = {
  instagram: { handle: "pauldenisnavero", url: "https://www.instagram.com/pauldenisnavero/" },
  tiktok: { handle: "pauldenisnavero", url: "https://www.tiktok.com/@pauldenisnavero" },
  youtube: { handle: "pauldenisnavero", url: "https://www.youtube.com/@pauldenisnavero" },
  twitter: { handle: "PauldenisMMA", url: "https://x.com/pauldenismma" },
};

export type Fight = {
  date: string;
  opponent: string;
  event: string;
  venue?: string;
  result: "W" | "L" | "D" | "NC";
  method?: string;
  round?: number;
  time?: string;
  isAmateur?: boolean;
  videoUrl?: string;
  note?: string;
};

export const fights: Fight[] = [
  {
    date: "2026-01-09",
    opponent: "Paulo Santos",
    event: "Hexagone MMA 37",
    venue: "Zénith Paris–La Villette",
    result: "W",
    method: "TKO (crochet droit)",
    round: 2,
  },
  {
    date: "2025-09-19",
    opponent: "David Daniel Komar",
    event: "Hexagone MMA 36",
    venue: "Zénith Paris–La Villette",
    result: "W",
    method: "TKO (coup au foie)",
    round: 1,
  },
  {
    date: "2025-05-24",
    opponent: "Sabir Talmoust",
    event: "Hexagone MMA",
    venue: "Arkéa Arena, Bordeaux",
    result: "W",
    method: "TKO",
    round: 1,
    note: "Débuts professionnels.",
  },
  {
    date: "2024-09-14",
    opponent: "Alex Andrews",
    event: "Hexagone MMA",
    venue: "Colmar",
    result: "W",
    method: "KO",
    round: 1,
    time: "0:05",
    isAmateur: true,
    note: "Record du KO le plus rapide de l'histoire d'Hexagone MMA.",
  },
];

export type UpcomingFight = {
  date: string;
  opponent: string;
  event: string;
  venue: string;
  ticketsUrl?: string;
};

export const upcomingFights: UpcomingFight[] = [
  {
    date: "2026-06-12",
    opponent: "Anzor Baybatyrov",
    event: "Hexagone MMA — Main Event",
    venue: "LDLC Arena, Lyon",
  },
];

export const record = {
  pro: { w: 3, l: 0, d: 0, finishRate: "100% (KO/TKO)" },
};
