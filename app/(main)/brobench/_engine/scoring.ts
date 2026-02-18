import { BrobenchTask } from "../_types";

export function computeNormalizedPercent(score: number, maxScore: number): number {
  if (maxScore <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));
}

export function getDifficultyBadgeClass(task: BrobenchTask): string {
  if (task.difficulty === "hard") {
    return "bg-red-500/10 text-red-400 border-red-500/30";
  }

  if (task.difficulty === "medium") {
    return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  }

  return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
}

export function getStatusBadgeClass(status: BrobenchTask["status"]): string {
  if (status === "coming_soon") {
    return "bg-muted text-muted-foreground border-border";
  }

  if (status === "draft") {
    return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
  }

  return "bg-primary/10 text-primary border-primary/30";
}
