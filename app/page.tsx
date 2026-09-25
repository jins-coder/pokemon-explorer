import { Explorer } from "@/components/explorer";
import { Navbar } from "@/components/navbar";
import { getPokemonList } from "@/lib/pokeapi";

export const revalidate = 3600; 

export default async function Home() {
  const pokemonList = await getPokemonList(100, 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      <Navbar />
      <main className="flex-1">
        <Explorer initialPokemon={pokemonList} />
      </main>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-400">
        <p>Pokemon and Pokemon character names are trademarks of Nintendo.</p>
      </footer>
    </div>
  );
}
