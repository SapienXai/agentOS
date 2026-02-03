import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn(
      "bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden flex flex-col h-full shadow-lg transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20", 
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("p-6 border-b border-border/50 flex-none", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <h3 className={cn("text-lg font-semibold text-foreground tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("p-6 flex-1", className)}>
      {children}
    </div>
  );
}
