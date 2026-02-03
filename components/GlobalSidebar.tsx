"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderGit2,
  Settings,
  Hexagon,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Global Dashboard", href: "/", icon: LayoutDashboard },
  { name: "All Projects", href: "/projects", icon: FolderGit2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function GlobalSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-card/30 backdrop-blur-xl border-r border-white/10 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-center gap-3 w-full text-left p-2 -ml-2 rounded-lg relative z-10">
          <div className="bg-primary/20 p-2.5 rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] ring-1 ring-primary/30">
             <Globe className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-primary/80 uppercase tracking-widest mb-0.5">System</p>
            <h2 className="font-bold text-foreground text-lg tracking-tight truncate">AgentOS</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group overflow-hidden",
                isActive 
                  ? "text-primary bg-primary/10 shadow-[0_0_20px_rgba(56,189,248,0.1)]" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80")} />
              <span className="relative z-10">{item.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeNavGlobal"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_#38bdf8]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          );
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px] ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
            <div className="w-full h-full rounded-full bg-black/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@agentos.ai</p>
          </div>
        </div>
      </div>
    </div>
  );
}
