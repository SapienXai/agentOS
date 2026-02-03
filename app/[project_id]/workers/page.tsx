import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Bot, Cpu, Plus } from "lucide-react";

const workers = [
  {
    id: 1,
    name: "Research Agent Alpha",
    role: "Information Gatherer",
    status: "busy",
    load: 78,
    capabilities: ["Web Scraping", "Data Analysis", "Summarization"],
    currentTask: "Scraping Bloomberg for 'AI Regulations'"
  },
  {
    id: 2,
    name: "Content Writer Beta",
    role: "Copywriter",
    status: "idle",
    load: 12,
    capabilities: ["Creative Writing", "SEO Optimization", "Editing"],
    currentTask: "Waiting for tasks..."
  },
  {
    id: 3,
    name: "Code Reviewer",
    role: "Developer Assistant",
    status: "busy",
    load: 92,
    capabilities: ["Python", "TypeScript", "Security Audit"],
    currentTask: "Analyzing PR #402 for vulnerabilities"
  },
  {
    id: 4,
    name: "QA Bot",
    role: "Tester",
    status: "offline",
    load: 0,
    capabilities: ["E2E Testing", "Regression Testing"],
    currentTask: "Offline"
  }
];

export default function WorkersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workers</h1>
          <p className="text-muted-foreground mt-2">Manage your AI workforce.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Hire Worker
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <Card key={worker.id} className="relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 ${
                worker.status === 'busy' ? 'bg-yellow-500' : 
                worker.status === 'idle' ? 'bg-green-500' : 
                'bg-muted'
            }`} />
            
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                       <Bot className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                       <h3 className="font-semibold text-lg">{worker.name}</h3>
                       <p className="text-xs text-muted-foreground">{worker.role}</p>
                    </div>
                 </div>
                 <div className={`px-2 py-1 rounded-full text-xs font-medium border ${
                     worker.status === 'busy' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                     worker.status === 'idle' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                     'bg-muted text-muted-foreground border-border'
                 }`}>
                   {worker.status.toUpperCase()}
                 </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                 <div className="flex justify-between text-xs mb-2">
                   <span className="text-muted-foreground">Current Load</span>
                   <span className="font-medium">{worker.load}%</span>
                 </div>
                 <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                          worker.load > 80 ? 'bg-red-500' : 'bg-primary'
                      }`} 
                      style={{ width: `${worker.load}%` }} 
                    />
                 </div>
               </div>

               <div className="p-3 bg-secondary/50 rounded-lg">
                 <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                   <Cpu className="w-3 h-3" />
                   Current Task
                 </div>
                 <p className="text-sm font-medium truncate" title={worker.currentTask}>{worker.currentTask}</p>
               </div>

               <div className="flex flex-wrap gap-2">
                 {worker.capabilities.map((cap) => (
                   <span key={cap} className="px-2 py-1 rounded text-xs bg-secondary border border-border/50 text-muted-foreground">
                     {cap}
                   </span>
                 ))}
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
