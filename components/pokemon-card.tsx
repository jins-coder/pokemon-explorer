"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PokemonSummary, TYPE_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: PokemonSummary;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0] || "Normal";
  const typeTheme = TYPE_COLORS[primaryType] || TYPE_COLORS["Normal"];
  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className={cn(
        "group flex flex-col justify-between rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-zinc-900",
        typeTheme.border
      )}
    >
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono font-semibold">{formattedId}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="relative my-3 flex h-40 w-full items-center justify-center">
          <Image
            src={pokemon.artwork}
            alt={pokemon.name}
            width={140}
            height={140}
            className="h-32 w-32 object-contain transition-transform duration-200 group-hover:scale-105"
            priority={pokemon.id <= 8}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {pokemon.name}
          </h3>

          <div className="flex flex-wrap gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[11px] font-medium",
                  (TYPE_COLORS[type] || TYPE_COLORS["Normal"]).badge
                )}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3 text-center text-xs">
        <div>
          <span className="text-[10px] uppercase text-zinc-400 font-semibold block">HP</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">{pokemon.hp}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-zinc-400 font-semibold block">ATK</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">{pokemon.attack}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-zinc-400 font-semibold block">SPD</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">{pokemon.speed}</span>
        </div>
      </div>
    </Link>
  );
}
