import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

const projects = [
  { id: "coincollect", name: "CoinCollect", outputs: "14 posts • 2 threads", approvals: 1, campaign: "Builder Sprint (live)", pipeline: 23, momentum: "+8.4%" },
  { id: "sapienx", name: "SapienX", outputs: "9 posts • 1 thread", approvals: 3, campaign: "Referral Week (setup)", pipeline: 17, momentum: "+6.2%" },
  { id: "questlayer", name: "QuestLayer", outputs: "0 posts", approvals: 2, campaign: "No active campaign", pipeline: 4, momentum: "-1.1%" },
];

export default function GlobalDashboardPage() {
  const attentionNeeded = projects.filter((p) => p.approvals > 1 || p.outputs === "0 posts");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Global Operations Dashboard</h1>
          <p className="text-muted-foreground mt-2">Cross-project execution view: outputs, approvals, campaigns, outreach, and momentum.</p>
        </div>
        <Link href="/projects" className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto">Open All Projects</Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>This Week Across Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>This week outputs</TableHead>
                <TableHead>Pending approvals</TableHead>
                <TableHead>Active campaign</TableHead>
                <TableHead>Outreach pipeline</TableHead>
                <TableHead>Momentum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium"><Link href={`/${project.id}/operations`} className="hover:text-primary">{project.name}</Link></TableCell>
                  <TableCell>{project.outputs}</TableCell>
                  <TableCell><Badge variant={project.approvals > 0 ? "warning" : "success"}>{project.approvals}</Badge></TableCell>
                  <TableCell>{project.campaign}</TableCell>
                  <TableCell>{project.pipeline} leads</TableCell>
                  <TableCell className={project.momentum.startsWith("-") ? "text-red-400" : "text-emerald-400"}>{project.momentum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attention Needed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {attentionNeeded.map((project) => (
            <Link key={project.id} href={`/${project.id}/operations`} className="block rounded-xl border border-border p-3 hover:bg-accent/40">
              <p className="font-medium">{project.name}</p>
              <p className="text-sm text-muted-foreground">
                {project.outputs === "0 posts"
                  ? "Zero outputs in last 7 days."
                  : `${project.approvals} approvals are blocking scheduled execution.`}
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
