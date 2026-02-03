import { Card, CardContent } from "@/components/ui/Card";
import { Clock, MoreHorizontal, Play, Pause, Zap } from "lucide-react";

const playbooks = [
  {
    id: 1,
    name: "Daily Market Briefing",
    description: "Scrapes financial news, summarizes key trends, and drafts an email report.",
    schedule: "Daily at 6:00 AM",
    status: "active",
    lastRun: "4 hours ago",
    nextRun: "in 20 hours",
    steps: 4
  },
  {
    id: 2,
    name: "Competitor Alert System",
    description: "Monitors competitor websites for changes and alerts the Slack channel.",
    schedule: "Every 1 hour",
    status: "active",
    lastRun: "15 mins ago",
    nextRun: "in 45 mins",
    steps: 2
  },
  {
    id: 3,
    name: "Monthly Report Generator",
    description: "Aggregates monthly metrics and generates a PDF report.",
    schedule: "1st of every month",
    status: "paused",
    lastRun: "28 days ago",
    nextRun: "Paused",
    steps: 6
  }
];

export default function PlaybooksPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Playbooks</h1>
          <p className="text-muted-foreground mt-2">Define workflows and automation schedules.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Zap className="w-4 h-4" />
          New Playbook
        </button>
      </div>

      <div className="grid gap-4">
        {playbooks.map((playbook) => (
          <Card key={playbook.id} className="group hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="p-3 bg-secondary rounded-xl">
                 <Zap className={`w-6 h-6 ${playbook.status === 'active' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold truncate">{playbook.name}</h3>
                  {playbook.status === 'active' ? (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">Active</span>
                  ) : (
                     <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium">Paused</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mt-1">{playbook.description}</p>
                
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                   <div className="flex items-center gap-1">
                     <Clock className="w-3 h-3" />
                     {playbook.schedule}
                   </div>
                   <div>•</div>
                   <div>Last run: {playbook.lastRun}</div>
                   <div>•</div>
                   <div>{playbook.steps} Steps</div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                 <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground" title="Run Now">
                   <Play className="w-5 h-5" />
                 </button>
                 <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                   <MoreHorizontal className="w-5 h-5" />
                 </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
