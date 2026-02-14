import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowRight, Hexagon, Plus, Search } from "lucide-react";

// Mock Data (Shared source of truth in a real app)
const projects = [
  {
    id: "coincollect",
    name: "CoinCollect",
    description: "Production environment for market analysis agents.",
    lastActive: "2 mins ago",
    status: "active",
    workers: 12,
    playbooks: 3
  },
  {
    id: "sapienx",
    name: "SapienX",
    description: "Social media content generation and scheduling.",
    lastActive: "2 days ago",
    status: "active",
    workers: 4,
    playbooks: 8
  },
  {
    id: "questlayer",
    name: "QuestLayer",
    description: "HR and Operations support bots.",
    lastActive: "5 days ago",
    status: "paused",
    workers: 2,
    playbooks: 1
  }
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
            <p className="text-muted-foreground text-lg">Run autonomous growth operations across all your projects.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/${project.id}/operations`} className="group block h-full">
              <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 group-hover:bg-accent/5">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                      <Hexagon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'}`} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2 rounded-lg bg-secondary/50 border border-border/50">
                      <div className="text-xs text-muted-foreground">Workers</div>
                      <div className="font-semibold text-sm">{project.workers}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/50 border border-border/50">
                      <div className="text-xs text-muted-foreground">Playbooks</div>
                      <div className="font-semibold text-sm">{project.playbooks}</div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 mt-4">
                    <span>Active {project.lastActive}</span>
                    <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Enter Project <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Create New Placeholder */}
          <button className="h-full min-h-[250px] border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 group">
             <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
               <Plus className="w-8 h-8" />
             </div>
             <div className="text-center">
               <p className="font-medium">Create New Project</p>
               <p className="text-xs text-muted-foreground/70 mt-1">Start from scratch or use a template</p>
             </div>
          </button>
        </div>
      </section>
    </div>
  );
}
