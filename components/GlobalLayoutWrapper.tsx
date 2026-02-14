"use client";

import { useState } from "react";
import { GlobalSidebar } from "@/components/GlobalSidebar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalLayoutWrapper({ 
  children 
}: { 
  children: React.ReactNode; 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-transparent text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full z-20">
        <GlobalSidebar activeIndicatorId="activeNavGlobalDesktop" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full relative">
           <div className="absolute top-2 right-2 p-2 z-50" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
           </div>
           <GlobalSidebar
             activeIndicatorId="activeNavGlobalMobile"
             onNavigate={() => setIsMobileMenuOpen(false)}
           />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/30 backdrop-blur-xl sticky top-0 z-30">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
             <Menu className="w-6 h-6" />
           </button>
           <span className="text-lg tracking-tight relative font-semibold [-webkit-text-stroke:0.35px_rgba(255,255,255,0.18)] [text-shadow:0_0_10px_rgba(56,189,248,0.25)]">
             <span className="relative z-10">AgentOS</span>
             <span className="absolute -inset-x-1 -inset-y-0.5 rounded-full bg-primary/20 blur-[6px] opacity-80 pointer-events-none" />
           </span>
           <div className="w-6" /> {/* Spacer */}
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-0 w-full scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
}
