import { BrobenchNav } from "./_components/BrobenchNav";

export default function BrobenchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-[0_20px_80px_-50px_rgba(14,165,233,0.65)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative z-10 space-y-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-primary/90">Agent Browser Benchmark</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">BroBench Arena</h1>
            <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
              Give your browser agent only a link and objective. Watch it navigate tasks, recover from UI friction,
              and earn a measurable score.
            </p>
          </div>

          <BrobenchNav />
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
