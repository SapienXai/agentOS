import { Card } from "@/components/ui/Card";
import { Activity, AlertCircle, CheckCircle2, Clock, Terminal } from "lucide-react";

const runs = [
  {
    id: "run_1",
    playbook: "Daily Market Briefing",
    status: "success",
    trigger: "Scheduled",
    duration: "2m 14s",
    startedAt: "2024-02-24 06:00:00",
    logs: [
      "Starting sequence...",
      "Scraping completed (14 sources)",
      "Summarization agent assigned",
      "Email draft generated",
      "Sent successfully"
    ]
  },
  {
    id: "run_2",
    playbook: "Competitor Alert System",
    status: "failed",
    trigger: "Webhook",
    duration: "45s",
    startedAt: "2024-02-24 07:15:22",
    logs: [
      "Starting sequence...",
      "Monitoring target: example-competitor.com",
      "Error: Connection timed out",
      "Retry attempt 1 failed",
      "Aborting run"
    ]
  },
  {
    id: "run_3",
    playbook: "Research Task: AI Trends",
    status: "running",
    trigger: "Manual",
    duration: "Running (5m)",
    startedAt: "2024-02-24 08:30:00",
    logs: [
      "Starting sequence...",
      "Agent Alpha assigned",
      "Searching query: 'Latest AI Regulations EU'",
      "Processing 12 documents..."
    ]
  }
];

export default function RunsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Runs & Logs</h1>
        <p className="text-muted-foreground mt-2">Execution history and real-time debugging.</p>
      </div>

      <div className="space-y-4">
        {runs.map((run) => (
          <Card key={run.id} className="overflow-hidden">
             <div className="flex flex-col md:flex-row md:items-stretch">
                {/* Status Strip */}
                <div className={`h-2 md:h-auto md:w-2 ${
                  run.status === 'success' ? 'bg-green-500' : 
                  run.status === 'failed' ? 'bg-red-500' : 
                  'bg-yellow-500'
                }`} />
                
                <div className="p-6 flex-1">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                           {run.playbook}
                           <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-full border border-border">
                             {run.id}
                           </span>
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
                           <span className="flex items-center gap-1">
                             <Clock className="w-3 h-3" /> {run.startedAt}
                           </span>
                           <span className="hidden sm:inline">•</span>
                           <span>Duration: {run.duration}</span>
                           <span className="hidden sm:inline">•</span>
                           <span>Trigger: {run.trigger}</span>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 self-start md:self-center ${
                          run.status === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                          run.status === 'failed' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                          'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }`}>
                        {run.status === 'success' && <CheckCircle2 className="w-4 h-4" />}
                        {run.status === 'failed' && <AlertCircle className="w-4 h-4" />}
                        {run.status === 'running' && <Activity className="w-4 h-4 animate-pulse" />}
                        {run.status.toUpperCase()}
                      </div>
                   </div>

                   {/* Terminal Output */}
                   <div className="bg-black/50 rounded-lg p-4 font-mono text-xs md:text-sm text-muted-foreground border border-border/50">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-muted-foreground/50">
                        <Terminal className="w-3 h-3" /> Console Output
                      </div>
                      <div className="space-y-1">
                        {run.logs.map((log, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-muted-foreground/30 select-none">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className={log.includes("Error") ? "text-red-400" : "text-foreground"}>
                              {log}
                            </span>
                          </div>
                        ))}
                        {run.status === 'running' && (
                          <div className="animate-pulse">_</div>
                        )}
                      </div>
                   </div>
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
