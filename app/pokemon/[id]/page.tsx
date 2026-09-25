import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getPokemonDetail } from "@/lib/pokeapi";
import { TYPE_COLORS } from "@/lib/types";
import { Navbar } from "@/components/navbar";
import { DetailClient } from "./detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  if (!pokemon) {
    return { title: "Not Found" };
  }

  return {
    title: `${pokemon.name} (#${pokemon.id}) - Pokemon Explorer`,
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  if (!pokemon) {
    notFound();
  }

  const primaryType = pokemon.types[0] || "Normal";
  const typeTheme = TYPE_COLORS[primaryType] || TYPE_COLORS["Normal"];
  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id + 1;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to list
          </Link>

          <div className="flex items-center gap-1.5">
            {prevId && (
              <Link
                href={`/pokemon/${prevId}`}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> #{prevId}
              </Link>
            )}
            <Link
              href={`/pokemon/${nextId}`}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              #{nextId} <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <DetailClient pokemon={pokemon} formattedId={formattedId} typeTheme={typeTheme} />
      </main>
    </div>
  );
}
