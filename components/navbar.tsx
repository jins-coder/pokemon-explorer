import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-bold text-sm shadow">
            P
          </div>
          <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
            Pokemon Explorer
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            PokéAPI
          </span>
        </div>
      </div>
    </header>
  );
}
