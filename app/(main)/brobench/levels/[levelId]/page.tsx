import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, PlayCircle, Radar } from "lucide-react";
import { getLevelById, getTasksForLevel } from "../../_data/catalog";
import { getDifficultyBadgeClass, getStatusBadgeClass } from "../../_engine/scoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type PageProps = {
  params: Promise<{ levelId: string }>;
  searchParams: Promise<{ runId?: string }>;
};

export default async function BrobenchLevelDetailPage({ params, searchParams }: PageProps) {
  const { levelId } = await params;
  const query = await searchParams;

  const level = getLevelById(levelId);
  if (!level) {
    notFound();
  }

  const runId = query.runId?.trim() || `run-${level.id}-demo`;
  const tasks = getTasksForLevel(level.id);
  const activeTasks = tasks.filter((task) => task.status === "active");
  const maxScore = activeTasks.reduce((sum, task) => sum + task.maxScore, 0);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardHeader>
          <CardTitle className="text-2xl">{level.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{level.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background/70 p-3 text-sm">
              <p className="text-xs text-muted-foreground">Benchmark Goal</p>
              <p className="mt-1 font-medium text-foreground">{level.benchmarkGoal}</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3 text-sm">
              <p className="text-xs text-muted-foreground">Target Score</p>
              <p className="mt-1 font-medium text-foreground">{level.targetScore}</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3 text-sm">
              <p className="text-xs text-muted-foreground">Current Run ID</p>
              <p className="mt-1 font-mono font-medium text-foreground">{runId}</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background/70 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Agent Prompt Snippet</p>
            <p className="mt-2 font-mono">
              Go to /brobench/levels/{level.id}?runId={runId} and complete all active tasks in order.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/brobench/runs/${runId}`} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Radar className="h-4 w-4" />
              Watch Live Run
            </Link>
            <Link href="/brobench/levels" className="inline-flex min-h-10 items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
              Back To All Levels
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Queue</CardTitle>
          <p className="text-sm text-muted-foreground">
            {activeTasks.length} active tasks • Max score {maxScore} • Recommended budget {level.timeBudgetMinutes} min
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((task, index) => {
            const isActive = task.status === "active";

            return (
              <div key={task.id} className="rounded-xl border border-border p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Task {index + 1}</p>
                    <p className="text-base font-semibold text-foreground">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.summary}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className={`rounded-full border px-2 py-1 ${getDifficultyBadgeClass(task)}`}>{task.difficulty}</span>
                      <span className={`rounded-full border px-2 py-1 ${getStatusBadgeClass(task.status)}`}>
                        {task.status.replace("_", " ")}
                      </span>
                      <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">{task.maxScore} pts</span>
                    </div>
                  </div>

                  {isActive ? (
                    <Link href={`${task.routePath}?runId=${encodeURIComponent(runId)}`} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
                      <PlayCircle className="h-4 w-4" />
                      Start Task
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-10 items-center rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
