"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  Workflow,
  Bot,
  Activity,
  Settings,
  Hexagon,
  ArrowLeftCircle,
  GaugeCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/ThemeToggle";

const navSections = [
  {
    label: "Operations",
    items: [{ name: "Operations", href: "/operations", icon: GaugeCircle }],
  },
  {
    label: "Configuration",
    items: [
      { name: "Blueprint", href: "/blueprint", icon: BrainCircuit },
      { name: "Playbooks", href: "/playbooks", icon: Workflow },
    ],
  },
  {
    label: "System",
    items: [
      { name: "System Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Workers", href: "/workers", icon: Bot },
      { name: "Runs / Logs", href: "/runs", icon: Activity },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar({
  projectId = "coincollect",
  activeIndicatorId = "activeNav",
}: {
  projectId?: string;
  activeIndicatorId?: string;
}) {
  const pathname = usePathname();

  const projectNames: Record<string, string> = {
    coincollect: "CoinCollect",
    sapienx: "SapienX",
    questlayer: "QuestLayer",
  };

  return (
    <div className="flex flex-col h-full w-64 bg-card border-r border-border/50">
      <div className="p-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-3 w-full text-left hover:bg-accent/50 p-2 -ml-2 rounded-lg transition-colors group relative">
          <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
            <Hexagon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Project</p>
            <h2 className="font-semibold text-foreground truncate">{projectNames[projectId] || projectId}</h2>
          </div>
          <div className="text-muted-foreground hover:text-foreground">
            <ArrowLeftCircle className="w-4 h-4" />
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-1">
            <p className="px-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{section.label}</p>
            {section.items.map((item) => {
              const href = `/${projectId}${item.href}`;
              const isActive = pathname === href || pathname?.startsWith(href + "/");

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group overflow-hidden",
                    isActive
                      ? "text-primary bg-primary/10 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  <item.icon className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80")} />
                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <motion.div
                      layoutId={activeIndicatorId}
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_18px_rgba(56,189,248,0.95)] drop-shadow-[0_0_14px_rgba(56,189,248,0.85)] pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@agentos.ai</p>
          </div>
        </div>
      </div>
    </div>
  );
}
