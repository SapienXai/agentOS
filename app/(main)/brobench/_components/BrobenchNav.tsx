"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Flag, Layers3, ListChecks, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/brobench", label: "Overview", icon: BarChart3 },
  { href: "/brobench/levels", label: "Levels", icon: Layers3 },
  { href: "/brobench/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/brobench/runs/live-demo", label: "Live Run", icon: ListChecks },
  { href: "/brobench/tasks/l1-intake-basics", label: "Sample Task", icon: Flag }
];

export function BrobenchNav() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex min-w-full gap-2 rounded-xl border border-border/70 bg-card/70 p-2 backdrop-blur-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
