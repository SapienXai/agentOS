"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectLayout({ 
  children, 
  projectId 
}: { 
  children: React.ReactNode; 
  projectId: string 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projectNames: Record<string, string> = {
    coincollect: "CoinCollect",
    sapienx: "SapienX",
    questlayer: "QuestLayer",
  };

  const projectTitle = projectNames[projectId] || projectId;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar projectId={projectId} activeIndicatorId="activeNavDesktop" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute top-2 right-2 p-2" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground" />
        </div>
        <Sidebar projectId={projectId} activeIndicatorId="activeNavMobile" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
             <Menu className="w-6 h-6" />
           </button>
           <span className="relative font-semibold [-webkit-text-stroke:0.35px_rgba(255,255,255,0.18)] [text-shadow:0_0_10px_rgba(56,189,248,0.25)]">
             <span className="relative z-10">{projectTitle}</span>
             <span className="absolute -inset-x-1 -inset-y-0.5 rounded-full bg-primary/20 blur-[6px] opacity-80 pointer-events-none" />
           </span>
           <div className="w-6" /> {/* Spacer */}
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
