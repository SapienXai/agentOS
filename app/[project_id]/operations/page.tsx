"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ElementType } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { approvalItemsSeed, campaignSeed, executionTimeline, operationSnapshots, operationTasks, outreachLeadsSeed } from "@/lib/mock/operations";
import { ApprovalItem, OutreachLead } from "@/lib/types/operations";
import { CalendarClock, CheckCircle2, CircleDashed, Rocket, Send, TrendingUp } from "lucide-react";

const routine = [
  { key: "posts", label: "5 short posts", progress: 60, detail: "3 done • 1 scheduled • 1 pending" },
  { key: "thread", label: "1 thread", progress: 70, detail: "drafted • awaiting approval" },
  { key: "campaign", label: "1 campaign", progress: 50, detail: "planned • setup in progress" },
  { key: "outreach", label: "10 outreach", progress: 65, detail: "10 queued • 6 sent • 2 replied" },
];

const stages: Array<{ key: OutreachLead["stage"]; label: string }> = [
  { key: "to_contact", label: "To Contact" },
  { key: "contacted", label: "Contacted" },
  { key: "replied", label: "Replied" },
  { key: "negotiating", label: "Negotiating" },
  { key: "closed", label: "Closed" },
];

export default function OperationsPage() {
  const params = useParams<{ project_id: string }>();
  const projectId = params.project_id;
  const snapshot = operationSnapshots.find((item) => item.projectId === projectId) ?? operationSnapshots[0];
  const [activeWindow, setActiveWindow] = useState("today");
  const [drawerItem, setDrawerItem] = useState<string | null>(null);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(approvalItemsSeed);
  const [leads, setLeads] = useState<OutreachLead[]>(outreachLeadsSeed);

  const tasksByType = useMemo(
    () => operationTasks.filter((task) => task.projectId === projectId || projectId === "coincollect"),
    [projectId],
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations</h1>
          <p className="text-muted-foreground mt-2">What SapienX did today, what&apos;s running this week, and what needs your approval next.</p>
        </div>
        <Link href={`/${projectId}/runs`} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Open Runs / Logs</Link>
      </div>

      <Tabs value={activeWindow} onValueChange={setActiveWindow}>
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="next">Next</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SnapshotCard title="Posts published today" value={snapshot.posts.toString()} subtitle="2 auto + 1 reviewed" icon={CheckCircle2} />
            <SnapshotCard title="Threads" value={snapshot.threads.toString()} subtitle="1 ready for publishing" icon={CircleDashed} />
            <SnapshotCard title="Drafts awaiting approval" value={approvals.length.toString()} subtitle="Needs human review" icon={CalendarClock} />
            <SnapshotCard title="Active campaigns" value="2" subtitle="Next launch in 3 days" icon={Rocket} />
            <SnapshotCard title="DMs sent today" value={snapshot.dmsSent.toString()} subtitle={`${snapshot.replies} replies waiting`} icon={Send} />
            <SnapshotCard title="Momentum Δ7d" value={`${snapshot.followersDelta > 0 ? "+" : ""}${snapshot.followersDelta} followers`} subtitle={`${snapshot.engagementDelta > 0 ? "+" : ""}${snapshot.engagementDelta}% engagement`} icon={TrendingUp} />
          </section>
        </TabsContent>
        <TabsContent value="week" className="mt-4">
          <Card><CardContent className="p-4 text-sm text-muted-foreground">Weekly output trend and routines are live below. Keep approvals flowing to maintain momentum.</CardContent></Card>
        </TabsContent>
        <TabsContent value="next" className="mt-4">
          <Card><CardContent className="p-4 text-sm text-muted-foreground">Next up: finalize campaign setup, approve outreach templates, and schedule recap posts.</CardContent></Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Routine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {routine.map((item) => (
            <button key={item.key} className="w-full text-left p-4 border border-border rounded-xl hover:bg-accent/40 transition" onClick={() => setDrawerItem(item.key)}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{item.label}</p>
                <Badge variant="secondary">{item.progress}%</Badge>
              </div>
              <Progress value={item.progress} />
              <p className="text-xs text-muted-foreground mt-2">{item.detail}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvals.map((item) => (
              <div key={item.id} className="rounded-xl border border-border p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={item.riskLevel === "high" ? "danger" : item.riskLevel === "medium" ? "warning" : "success"}>{item.riskLevel} risk</Badge>
                  <span className="text-xs text-muted-foreground">{item.channel} • {item.suggestedSchedule}</span>
                </div>
                <p className="text-sm">{item.previewText}</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => setApprovals((prev) => prev.filter((a) => a.id !== item.id))}>Approve</Button>
                  <Button size="sm" variant="outline">Request changes</Button>
                  <Button size="sm" variant="ghost">Reject</Button>
                </div>
              </div>
            ))}
            {approvals.length === 0 && <p className="text-sm text-muted-foreground">No pending approvals. Newly approved items are now scheduled.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {executionTimeline.map((item) => (
              <Link key={item.id} href={`/${projectId}/runs?runId=${item.runId}`} className="flex gap-3 rounded-lg p-3 border border-border hover:bg-accent/40">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.at} • View run {item.runId}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Outreach Pipeline</CardTitle>
          <Button variant="outline" size="sm">Add lead</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {stages.map((stage) => (
              <div key={stage.key} className="rounded-xl border border-border bg-secondary/20 p-3 min-h-52">
                <h4 className="text-sm font-semibold mb-3">{stage.label}</h4>
                <div className="space-y-2">
                  {leads.filter((lead) => lead.stage === stage.key).map((lead) => (
                    <div key={lead.id} className="rounded-lg bg-card border border-border p-2 space-y-1">
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.channel} • Next: {lead.nextFollowUpAt}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{lead.notes}</p>
                      <select
                        value={lead.stage}
                        onChange={(e) => setLeads((prev) => prev.map((item) => (item.id === lead.id ? { ...item, stage: e.target.value as OutreachLead["stage"] } : item)))}
                        className="w-full rounded-md bg-secondary text-xs px-2 py-1"
                      >
                        {stages.map((opt) => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Campaign Calendar</CardTitle>
          <Button size="sm">Generate next campaign plan</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {campaignSeed.map((campaign) => (
            <div key={campaign.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h4 className="font-medium">{campaign.name}</h4>
                <Badge>{campaign.status}</Badge>
              </div>
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                {campaign.milestones.map((mile) => (
                  <div key={mile.label} className="rounded-lg border border-border p-2">
                    <p className="font-medium">{mile.label}</p>
                    <p className="text-muted-foreground text-xs">{mile.date}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Sheet open={Boolean(drawerItem)} onOpenChange={(open) => !open && setDrawerItem(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Routine Tasks: {drawerItem}</SheetTitle>
            <SheetDescription>Drill into jobs linked to this weekly routine area.</SheetDescription>
          </SheetHeader>
          <div className="space-y-3">
            {tasksByType.map((task) => (
              <Link key={task.id} href={`/${projectId}/runs?taskId=${task.id}`} className="block rounded-lg border border-border p-3 hover:bg-accent/40">
                <p className="font-medium text-sm capitalize">{task.type} • {task.status.replace("_", " ")}</p>
                <p className="text-xs text-muted-foreground">Due {new Date(task.dueAt).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SnapshotCard({ title, value, subtitle, icon: Icon }: { title: string; value: string; subtitle: string; icon: ElementType }) {
  return (
    <Card>
      <CardContent className="p-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="p-2 rounded-lg bg-primary/15 text-primary">
          <Icon className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}
