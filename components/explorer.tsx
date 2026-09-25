"use client";

import { useMemo, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { PokemonSummary, PokemonType, TYPE_COLORS } from "@/lib/types";
import { PokemonCard } from "./pokemon-card";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

const TYPES: PokemonType[] = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dark",
  "Dragon",
  "Steel",
  "Fairy",
];

type SortOption = "id" | "name" | "hp" | "attack" | "speed";

interface ExplorerProps {
  initialPokemon: PokemonSummary[];
}

export function Explorer({ initialPokemon }: ExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonType | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("id");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredPokemon = useMemo(() => {
    let list = initialPokemon.filter((p) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toString().includes(q) ||
        p.types.some((t) => t.toLowerCase().includes(q));

      const matchesType =
        selectedType === "All" || p.types.includes(selectedType);

      return matchesQuery && matchesType;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "hp") return b.hp - a.hp;
      if (sortBy === "attack") return b.attack - a.attack;
      if (sortBy === "speed") return b.speed - a.speed;
      return a.id - b.id;
    });

    return list;
  }, [initialPokemon, query, selectedType, sortBy]);

  const visibleList = filteredPokemon.slice(0, visibleCount);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Pokémon Explorer
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Browse and search Pokémon from PokéAPI.
          </p>
        </div>

        <div className="text-xs text-zinc-500 font-medium">
          {filteredPokemon.length} {filteredPokemon.length === 1 ? "result" : "results"}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search by name or number..."
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2.5 pl-10 pr-9 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setVisibleCount(PAGE_SIZE);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative w-full md:w-56">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full appearance-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2.5 pl-3.5 pr-8 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 cursor-pointer"
          >
            <option value="id">Number (#)</option>
            <option value="name">Name (A-Z)</option>
            <option value="hp">Highest HP</option>
            <option value="attack">Highest Attack</option>
            <option value="speed">Highest Speed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            setSelectedType("All");
            setVisibleCount(PAGE_SIZE);
          }}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            selectedType === "All"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          )}
        >
          All
        </button>
        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setSelectedType(type);
              setVisibleCount(PAGE_SIZE);
            }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors",
              selectedType === type
                ? cn(TYPE_COLORS[type].badge, "border-current font-bold")
                : "border-transparent bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredPokemon.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center text-sm text-zinc-500">
          No Pokémon found matching "{query}".
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {visibleCount < filteredPokemon.length && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}