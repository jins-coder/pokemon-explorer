"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles, Search } from "lucide-react";
import { PokemonDetail, TYPE_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DetailClientProps {
  pokemon: PokemonDetail;
  formattedId: string;
  typeTheme: (typeof TYPE_COLORS)[string];
}

export function DetailClient({ pokemon, formattedId, typeTheme }: DetailClientProps) {
  const [isShiny, setIsShiny] = useState(false);
  const [moveSearch, setMoveSearch] = useState("");

  const currentArtwork = isShiny ? pokemon.shinyArtwork : pokemon.artwork;
  const totalStats = pokemon.stats.reduce((acc, curr) => acc + curr.value, 0);

  const filteredMoves = pokemon.moves.filter((m) =>
    m.name.toLowerCase().includes(moveSearch.toLowerCase().trim())
  );

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div
        className={cn(
          "rounded-2xl border p-6 bg-white dark:bg-zinc-900",
          typeTheme.border
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {formattedId}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                {pokemon.category}
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                {pokemon.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={cn(
                      "rounded-md border px-2.5 py-0.5 text-xs font-semibold",
                      (TYPE_COLORS[type] || TYPE_COLORS["Normal"]).badge
                    )}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {pokemon.description}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-2.5 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase text-zinc-400 font-semibold block">Height</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">{pokemon.height}</span>
              </div>
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-2.5 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase text-zinc-400 font-semibold block">Weight</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">{pokemon.weight}</span>
              </div>
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-2.5 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] uppercase text-zinc-400 font-semibold block">Base Exp</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">{pokemon.baseExperience}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative flex h-52 w-52 items-center justify-center">
              <Image
                src={currentArtwork}
                alt={pokemon.name}
                width={200}
                height={200}
                className="h-48 w-48 object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => setIsShiny(!isShiny)}
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                isShiny
                  ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isShiny ? "Shiny" : "Show Shiny"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats & Abilities */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Base Stats */}
        <div className="md:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Stats
            </h2>
            <span className="text-xs font-mono text-zinc-400">Total {totalStats}</span>
          </div>

          <div className="space-y-3">
            {pokemon.stats.map((stat) => {
              const pct = Math.min(100, Math.round((stat.value / 255) * 100));
              return (
                <div key={stat.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-medium">{stat.name}</span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">{stat.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abilities */}
        <div className="md:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Abilities
          </h2>
          <div className="space-y-2">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.name}
                className="flex items-center justify-between rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 px-3.5 py-2.5 text-xs"
              >
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {ability.name}
                </span>
                {ability.isHidden && (
                  <span className="rounded bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-300">
                    Hidden
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moves */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Moves ({pokemon.moves.length})
          </h2>

          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={moveSearch}
              onChange={(e) => setMoveSearch(e.target.value)}
              placeholder="Search moves..."
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 py-1.5 pl-8 pr-3 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
          {filteredMoves.length === 0 ? (
            <div className="col-span-full py-6 text-center text-xs text-zinc-400">
              No moves found
            </div>
          ) : (
            filteredMoves.map((move) => (
              <div
                key={move.name}
                className="flex items-center justify-between rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 px-2.5 py-2 text-xs"
              >
                <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  {move.name}
                </span>
                {move.levelLearnedAt ? (
                  <span className="text-[10px] font-mono text-zinc-400">
                    Lv.{move.levelLearnedAt}
                  </span>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
