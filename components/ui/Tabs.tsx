"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

const TabsContext = createContext<{ value: string; onValueChange: (value: string) => void } | null>(null);

export function Tabs({ value, onValueChange, className, children }: { value: string; onValueChange: (v: string) => void; className?: string; children: React.ReactNode }) {
  return <TabsContext.Provider value={{ value, onValueChange }}><div className={className}>{children}</div></TabsContext.Provider>;
}

export const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex w-full flex-wrap items-center gap-1 rounded-lg bg-secondary p-1 sm:inline-flex sm:h-10 sm:w-auto sm:flex-nowrap sm:gap-0", className)} {...props} />
);

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  const active = ctx.value === value;
  return (
    <button onClick={() => ctx.onValueChange(value)} className={cn("inline-flex min-h-9 flex-1 items-center justify-center rounded-md px-3 py-1.5 text-sm sm:flex-none", active ? "bg-background text-foreground" : "text-muted-foreground", className)}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  if (!ctx || ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
