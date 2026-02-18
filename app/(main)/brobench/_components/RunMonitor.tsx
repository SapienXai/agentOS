"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Activity, CheckCircle2, RefreshCcw, Timer, Trophy } from "lucide-react";
import { brobenchTasks, getTaskById } from "../_data/catalog";
import { clearRun, ensureRun, getRun } from "../_engine/runStorage";
import { computeNormalizedPercent } from "../_engine/scoring";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export function RunMonitor({ runId }: { runId: string }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    ensureRun(runId);
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 1200);

    return () => {
      window.clearInterval(timer);
    };
  }, [runId]);

  const currentRun = getRun(runId);

  const trackedTaskIds = useMemo(() => {
    return brobenchTasks
      .filter((task) => task.status === "active")
      .map((task) => task.id);
  }, []);

  const totalMaxScore = useMemo(
    () => trackedTaskIds.reduce((total, taskId) => total + (getTaskById(taskId)?.maxScore ?? 0), 0),
    [trackedTaskIds]
  );

  const totalScore = useMemo(
    () => trackedTaskIds.reduce((total, taskId) => total + (currentRun.taskScores[taskId] ?? 0), 0),
    [currentRun.taskScores, trackedTaskIds]
  );

  const completed = trackedTaskIds.filter((taskId) => currentRun.completedTaskIds.includes(taskId)).length;
  const completionPercent = trackedTaskIds.length > 0 ? Math.round((completed / trackedTaskIds.length) * 100) : 0;
  const scorePercent = computeNormalizedPercent(totalScore, totalMaxScore);

  function resetRun() {
    clearRun(runId);
    setTick((value) => value + 1);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2 text-2xl font-bold">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              {completed}/{trackedTaskIds.length}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{completionPercent}% tasks completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2 text-2xl font-bold">
              <Trophy className="h-5 w-5 text-amber-400" />
              {totalScore}/{totalMaxScore}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{scorePercent}% normalized score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Run Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2 text-2xl font-bold">
              <Activity className="h-5 w-5 text-primary" />
              {currentRun.events.length}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Logged events</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Live Event Stream</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">This page auto-refreshes from local run state every 1.2s.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setTick((value) => value + 1)}>
              <Timer className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="destructive" className="gap-2" onClick={resetRun}>
              <RefreshCcw className="h-4 w-4" />
              Reset Run
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentRun.events.length === 0 ? (
            <p className="rounded-md border border-border p-3 text-sm text-muted-foreground">No events yet.</p>
          ) : (
            currentRun.events.map((event) => (
              <div key={event.id} className="rounded-md border border-border bg-background/50 p-3">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{formatDateLabel(event.atIso)}</span>
                  <span className="font-mono">{event.type.toUpperCase()}</span>
                </div>
                <p className="mt-1 text-sm text-foreground">{event.message}</p>
                {event.taskId ? <p className="mt-1 text-xs text-muted-foreground">Task: {event.taskId}</p> : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Jump</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {trackedTaskIds.map((taskId) => {
            const task = getTaskById(taskId);
            if (!task) {
              return null;
            }

            const isDone = currentRun.completedTaskIds.includes(task.id);

            return (
              <Link
                key={task.id}
                href={`${task.routePath}?runId=${encodeURIComponent(runId)}`}
                className="rounded-lg border border-border p-3 transition-colors hover:bg-accent"
              >
                <p className="font-medium text-foreground">{task.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {task.levelId.toUpperCase()} •{" "}
                  {isDone ? "Completed" : "Pending"} • Best Score: {currentRun.taskScores[task.id] ?? 0}/{task.maxScore}
                </p>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
