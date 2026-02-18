"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, Clock3, FlagTriangleRight } from "lucide-react";
import { brobenchLevels, getTasksForLevel } from "../_data/catalog";
import { getDifficultyBadgeClass, getStatusBadgeClass } from "../_engine/scoring";
import { Card, CardContent } from "@/components/ui/Card";

export default function BrobenchLevelsPage() {
  const [expandedLevelIds, setExpandedLevelIds] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        brobenchLevels.map((level) => [level.id, level.id === "level-1"])
      ) as Record<string, boolean>
  );

  function toggleLevel(levelId: string) {
    setExpandedLevelIds((prev) => ({
      ...prev,
      [levelId]: !prev[levelId]
    }));
  }

  return (
    <div className="space-y-5">
      {brobenchLevels.map((level) => {
        const tasks = getTasksForLevel(level.id);
        const activeTasks = tasks.filter((task) => task.status === "active");
        const maxScore = activeTasks.reduce((sum, task) => sum + task.maxScore, 0);
        const isExpanded = expandedLevelIds[level.id] === true;

        return (
          <Card key={level.id} className="overflow-hidden border-border/70">
            <div
              className="cursor-pointer bg-gradient-to-r from-primary/5 via-card to-card p-5"
              onClick={() => toggleLevel(level.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleLevel(level.id);
                }
              }}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">{level.name}</h2>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-primary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Goal: {level.benchmarkGoal}</p>
                </div>

                <div className="w-full max-w-sm space-y-3" onClick={(event) => event.stopPropagation()}>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md border border-border bg-background/70 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Target Score</p>
                      <p className="font-semibold text-foreground">{level.targetScore}</p>
                    </div>
                    <div className="rounded-md border border-border bg-background/70 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Time Budget</p>
                      <p className="font-semibold text-foreground">{level.timeBudgetMinutes}m</p>
                    </div>
                  </div>

                  <Link
                    href={`/brobench/levels/${level.id}`}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
                  >
                    Open Level
                  </Link>
                </div>
              </div>
            </div>

            {isExpanded ? (
              <CardContent className="space-y-4 border-t border-border/60">
                <div className="rounded-lg border border-border bg-background/70 p-3 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Recommended agent prompt</p>
                  <p className="mt-1 font-mono">{level.recommendedPrompt}</p>
                </div>

                <div className="space-y-2">
                  {tasks.map((task, taskIndex) => (
                    <div key={task.id} className="rounded-lg border border-border p-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-medium text-foreground">{`${taskIndex + 1}. Task : ${task.title}`}</p>
                          <p className="text-sm text-muted-foreground">{task.summary}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
                          <span className={`rounded-full border px-2 py-1 ${getDifficultyBadgeClass(task)}`}>{task.difficulty}</span>
                          <span className={`rounded-full border px-2 py-1 ${getStatusBadgeClass(task.status)}`}>
                            {task.status.replace("_", " ")}
                          </span>
                          <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">{task.maxScore} pts</span>
                          <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">{task.estimatedMinutes}m</span>
                          {task.status === "active" ? (
                            <Link
                              href={task.routePath}
                              className="inline-flex min-h-8 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90"
                            >
                              Start Task
                            </Link>
                          ) : (
                            <span className="inline-flex min-h-8 items-center justify-center rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                              Start Task
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><FlagTriangleRight className="h-4 w-4" /> {activeTasks.length} active tasks</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> {level.timeBudgetMinutes} min budget</span>
                  <span>Max Score: {maxScore}</span>
                </div>
              </CardContent>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
