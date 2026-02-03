import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity, CheckCircle2, Cpu, Zap } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your project's intelligence and operations.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="System Health" 
          value="Operational" 
          icon={CheckCircle2} 
          trend="100% uptime"
          trendColor="text-green-500"
        />
        <KpiCard 
          title="Active Workers" 
          value="8/12" 
          icon={Cpu} 
          trend="+2 added"
          trendColor="text-blue-500"
        />
        <KpiCard 
          title="Active Playbooks" 
          value="3" 
          icon={Zap} 
          trend="Running now"
          trendColor="text-yellow-500"
        />
        <KpiCard 
          title="Total Runs (24h)" 
          value="1,284" 
          icon={Activity} 
          trend="+12% vs yesterday"
          trendColor="text-muted-foreground"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Runs */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-2 h-2 flex-none rounded-full ${i === 1 ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                    <div className="min-w-0">
                      <p className="font-medium truncate">Data Sync Pipeline</p>
                      <p className="text-xs text-muted-foreground truncate">Executed by Worker-0{i}</p>
                    </div>
                  </div>
                  <div className="text-right flex-none ml-4">
                    <p className="text-sm font-medium">{i === 1 ? 'Running...' : 'Success'}</p>
                    <p className="text-xs text-muted-foreground">{i * 15} min ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Worker Status */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Worker Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
               <WorkerStatus name="Research Agent Alpha" load={75} status="busy" />
               <WorkerStatus name="Content Writer Beta" load={30} status="idle" />
               <WorkerStatus name="Code Reviewer" load={90} status="busy" />
               <WorkerStatus name="QA Bot" load={0} status="offline" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, trend, trendColor }: any) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between space-y-0">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${trendColor}`}>{trend}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}

function WorkerStatus({ name, load, status }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-2 h-2 flex-none rounded-full ${status === 'busy' ? 'bg-yellow-500' : status === 'idle' ? 'bg-green-500' : 'bg-gray-500'}`} />
          <span className="font-medium truncate">{name}</span>
        </div>
        <span className="text-muted-foreground whitespace-nowrap ml-2">{load}% Load</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${load > 80 ? 'bg-red-500' : 'bg-primary'}`} 
          style={{ width: `${load}%` }} 
        />
      </div>
    </div>
  )
}
