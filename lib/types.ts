export type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dark"
  | "Dragon"
  | "Steel"
  | "Fairy";

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonMove {
  name: string;
  levelLearnedAt?: number;
  learnMethod?: string;
}

export interface PokemonSummary {
  id: number;
  name: string;
  types: PokemonType[];
  height: string;
  weight: string;
  category?: string;
  artwork: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  abilities?: string[];
  description?: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  height: string;
  weight: string;
  category: string;
  description: string;
  baseExperience: number;
  artwork: string;
  shinyArtwork: string;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
}

export type Pokemon = PokemonSummary;

export const TYPE_COLORS: Record<
  string,
  { bg: string; text: string; border: string; badge: string; glow: string; gradient: string }
> = {
  Electric: {
    bg: "from-amber-500/10 via-yellow-500/5 to-transparent",
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/30 hover:border-amber-500/60",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30",
    glow: "rgba(245, 158, 11, 0.15)",
    gradient: "from-amber-400 to-yellow-500",
  },
  Fire: {
    bg: "from-rose-500/10 via-orange-500/5 to-transparent",
    text: "text-rose-500 dark:text-rose-400",
    border: "border-rose-500/30 hover:border-rose-500/60",
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30",
    glow: "rgba(244, 63, 94, 0.15)",
    gradient: "from-rose-500 to-orange-500",
  },
  Water: {
    bg: "from-sky-500/10 via-blue-500/5 to-transparent",
    text: "text-sky-500 dark:text-sky-400",
    border: "border-sky-500/30 hover:border-sky-500/60",
    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30",
    glow: "rgba(14, 165, 233, 0.15)",
    gradient: "from-sky-400 to-blue-600",
  },
  Grass: {
    bg: "from-emerald-500/10 via-green-500/5 to-transparent",
    text: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.15)",
    gradient: "from-emerald-400 to-green-600",
  },
  Poison: {
    bg: "from-purple-500/10 via-fuchsia-500/5 to-transparent",
    text: "text-purple-500 dark:text-purple-400",
    border: "border-purple-500/30 hover:border-purple-500/60",
    badge: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30",
    glow: "rgba(168, 85, 247, 0.15)",
    gradient: "from-purple-500 to-fuchsia-600",
  },
  Flying: {
    bg: "from-indigo-500/10 via-sky-500/5 to-transparent",
    text: "text-indigo-500 dark:text-indigo-400",
    border: "border-indigo-500/30 hover:border-indigo-500/60",
    badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30",
    glow: "rgba(99, 102, 241, 0.15)",
    gradient: "from-indigo-400 to-sky-500",
  },
  Ghost: {
    bg: "from-violet-500/10 via-purple-500/5 to-transparent",
    text: "text-violet-500 dark:text-violet-400",
    border: "border-violet-500/30 hover:border-violet-500/60",
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/30",
    glow: "rgba(139, 92, 246, 0.15)",
    gradient: "from-violet-600 to-indigo-800",
  },
  Psychic: {
    bg: "from-pink-500/10 via-rose-500/5 to-transparent",
    text: "text-pink-500 dark:text-pink-400",
    border: "border-pink-500/30 hover:border-pink-500/60",
    badge: "bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30",
    glow: "rgba(236, 72, 153, 0.15)",
    gradient: "from-pink-500 to-rose-600",
  },
  Normal: {
    bg: "from-zinc-500/10 via-stone-500/5 to-transparent",
    text: "text-zinc-600 dark:text-zinc-300",
    border: "border-zinc-400/30 hover:border-zinc-400/60",
    badge: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30",
    glow: "rgba(113, 113, 122, 0.15)",
    gradient: "from-zinc-400 to-stone-500",
  },
  Dragon: {
    bg: "from-teal-500/10 via-indigo-500/5 to-transparent",
    text: "text-teal-500 dark:text-teal-400",
    border: "border-teal-500/30 hover:border-teal-500/60",
    badge: "bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30",
    glow: "rgba(20, 184, 166, 0.15)",
    gradient: "from-teal-500 to-indigo-600",
  },
  Fighting: {
    bg: "from-orange-600/10 via-amber-600/5 to-transparent",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-600/30 hover:border-orange-600/60",
    badge: "bg-orange-600/15 text-orange-700 dark:text-orange-300 border-orange-600/30",
    glow: "rgba(234, 88, 12, 0.15)",
    gradient: "from-orange-600 to-amber-600",
  },
  Steel: {
    bg: "from-slate-500/10 via-cyan-500/5 to-transparent",
    text: "text-slate-500 dark:text-slate-400",
    border: "border-slate-500/30 hover:border-slate-500/60",
    badge: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30",
    glow: "rgba(100, 116, 139, 0.15)",
    gradient: "from-slate-400 to-zinc-600",
  },
  Dark: {
    bg: "from-stone-700/15 via-zinc-800/10 to-transparent",
    text: "text-stone-700 dark:text-stone-300",
    border: "border-stone-600/30 hover:border-stone-600/60",
    badge: "bg-stone-700/20 text-stone-800 dark:text-stone-200 border-stone-600/30",
    glow: "rgba(87, 83, 78, 0.2)",
    gradient: "from-stone-700 to-zinc-900",
  },
  Fairy: {
    bg: "from-pink-400/10 via-rose-300/5 to-transparent",
    text: "text-pink-500 dark:text-pink-300",
    border: "border-pink-400/30 hover:border-pink-400/60",
    badge: "bg-pink-400/15 text-pink-600 dark:text-pink-300 border-pink-400/30",
    glow: "rgba(244, 114, 182, 0.15)",
    gradient: "from-pink-400 to-rose-400",
  },
  Bug: {
    bg: "from-lime-500/10 via-emerald-500/5 to-transparent",
    text: "text-lime-600 dark:text-lime-400",
    border: "border-lime-500/30 hover:border-lime-500/60",
    badge: "bg-lime-500/15 text-lime-700 dark:text-lime-300 border-lime-500/30",
    glow: "rgba(132, 204, 22, 0.15)",
    gradient: "from-lime-500 to-emerald-600",
  },
  Ice: {
    bg: "from-cyan-400/10 via-sky-300/5 to-transparent",
    text: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-400/30 hover:border-cyan-400/60",
    badge: "bg-cyan-400/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/30",
    glow: "rgba(34, 211, 238, 0.15)",
    gradient: "from-cyan-400 to-sky-500",
  },
  Rock: {
    bg: "from-stone-600/10 via-amber-700/5 to-transparent",
    text: "text-stone-600 dark:text-stone-400",
    border: "border-stone-600/30 hover:border-stone-600/60",
    badge: "bg-stone-600/15 text-stone-700 dark:text-stone-300 border-stone-600/30",
    glow: "rgba(120, 113, 108, 0.15)",
    gradient: "from-stone-500 to-amber-700",
  },
  Ground: {
    bg: "from-amber-600/10 via-yellow-700/5 to-transparent",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-600/30 hover:border-amber-600/60",
    badge: "bg-amber-600/15 text-amber-800 dark:text-amber-300 border-amber-600/30",
    glow: "rgba(217, 119, 6, 0.15)",
    gradient: "from-amber-600 to-yellow-800",
  },
};
