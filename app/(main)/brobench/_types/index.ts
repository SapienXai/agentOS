export type BrobenchDifficulty = "easy" | "medium" | "hard";
export type BrobenchTaskStatus = "draft" | "active" | "coming_soon";

export interface BrobenchTask {
  id: string;
  levelId: string;
  title: string;
  summary: string;
  description: string;
  category: "form" | "upload" | "flow" | "validation";
  difficulty: BrobenchDifficulty;
  estimatedMinutes: number;
  maxScore: number;
  status: BrobenchTaskStatus;
  routePath: string;
  instructions: string[];
  successCriteria: string[];
}

export interface BrobenchLevel {
  id: string;
  name: string;
  description: string;
  benchmarkGoal: string;
  recommendedPrompt: string;
  targetScore: number;
  timeBudgetMinutes: number;
  taskIds: string[];
}

export interface BrobenchLeaderboardRow {
  rank: number;
  agentName: string;
  model: string;
  avgScore: number;
  successRate: number;
  runs: number;
  bestRunId: string;
  bestRunDate: string;
}

export interface BrobenchRunEvent {
  id: string;
  taskId?: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  atIso: string;
}

export interface BrobenchStoredRun {
  runId: string;
  startedAtIso: string;
  updatedAtIso: string;
  attemptsByTask: Record<string, number>;
  taskScores: Record<string, number>;
  completedTaskIds: string[];
  events: BrobenchRunEvent[];
}
