import { Navbar } from "@/components/navbar";

export default function DetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans animate-pulse">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="h-10 w-44 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-96 rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-72 rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="lg:col-span-5 h-72 rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </main>
    </div>
  );
}
