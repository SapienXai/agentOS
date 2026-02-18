"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listRuns } from "../_engine/runStorage";
import { brobenchTasks, getTaskById } from "../_data/catalog";

export function LocalRunTable() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setTick((value) => value + 1), 1500);
    return () => window.clearInterval(interval);
  }, []);

  const rows = listRuns();
  const activeTaskIds = brobenchTasks
    .filter((task) => task.status === "active")
    .map((task) => task.id);
  const maxScore = activeTaskIds.reduce((sum, taskId) => sum + (getTaskById(taskId)?.maxScore ?? 0), 0);

  if (rows.length === 0) {
    return <p className="rounded-lg border border-border p-4 text-sm text-muted-foreground">No local runs yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-card/70 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Run ID</th>
            <th className="px-4 py-3 text-left font-medium">Completed</th>
            <th className="px-4 py-3 text-left font-medium">Score</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((run) => {
            const score = activeTaskIds.reduce((sum, taskId) => sum + (run.taskScores[taskId] ?? 0), 0);
            return (
              <tr key={run.runId} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">{run.runId}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {run.completedTaskIds.length}/{activeTaskIds.length}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {score}/{maxScore}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(run.updatedAtIso).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/brobench/runs/${run.runId}`} className="text-primary hover:underline">
                    Open
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
