"use client";

import { BrobenchRunEvent, BrobenchStoredRun } from "../_types";

const STORAGE_KEY = "brobench.runs.v1";
const MAX_EVENTS = 120;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStore(): Record<string, BrobenchStoredRun> {
  if (!isBrowser()) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, BrobenchStoredRun>;
    return parsed;
  } catch {
    return {};
  }
}

function writeStore(value: Record<string, BrobenchStoredRun>): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function ensureRun(runId: string): BrobenchStoredRun {
  const store = readStore();

  if (!store[runId]) {
    const now = new Date().toISOString();
    store[runId] = {
      runId,
      startedAtIso: now,
      updatedAtIso: now,
      attemptsByTask: {},
      taskScores: {},
      completedTaskIds: [],
      events: [
        {
          id: `evt-${Date.now()}`,
          message: "Run initialized.",
          type: "info",
          atIso: now
        }
      ]
    };
    writeStore(store);
  }

  return store[runId];
}

export function getRun(runId: string): BrobenchStoredRun {
  const existing = ensureRun(runId);
  return existing;
}

export function listRuns(): BrobenchStoredRun[] {
  return Object.values(readStore()).sort((a, b) =>
    b.updatedAtIso.localeCompare(a.updatedAtIso)
  );
}

export function appendRunEvent(runId: string, event: Omit<BrobenchRunEvent, "id" | "atIso">): BrobenchStoredRun {
  const store = readStore();
  const run = store[runId] ?? ensureRun(runId);
  const now = new Date().toISOString();

  const fullEvent: BrobenchRunEvent = {
    ...event,
    id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    atIso: now
  };

  const next: BrobenchStoredRun = {
    ...run,
    updatedAtIso: now,
    events: [fullEvent, ...run.events].slice(0, MAX_EVENTS)
  };

  store[runId] = next;
  writeStore(store);
  return next;
}

export function recordTaskAttempt(params: {
  runId: string;
  taskId: string;
  score: number;
  maxScore: number;
  passed: boolean;
  message: string;
}): BrobenchStoredRun {
  const store = readStore();
  const run = store[params.runId] ?? ensureRun(params.runId);
  const now = new Date().toISOString();

  const attempts = (run.attemptsByTask[params.taskId] ?? 0) + 1;
  const prevScore = run.taskScores[params.taskId] ?? 0;
  const nextScore = Math.max(prevScore, Math.min(params.score, params.maxScore));

  const completedTaskIds = params.passed
    ? Array.from(new Set([...run.completedTaskIds, params.taskId]))
    : run.completedTaskIds;
  const taskEvent: BrobenchRunEvent = {
    id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    taskId: params.taskId,
    message: params.message,
    type: params.passed ? "success" : "warning",
    atIso: now
  };

  const next: BrobenchStoredRun = {
    ...run,
    updatedAtIso: now,
    attemptsByTask: {
      ...run.attemptsByTask,
      [params.taskId]: attempts
    },
    taskScores: {
      ...run.taskScores,
      [params.taskId]: nextScore
    },
    completedTaskIds,
    events: [taskEvent, ...run.events].slice(0, MAX_EVENTS)
  };

  store[params.runId] = next;
  writeStore(store);
  return next;
}

export function clearRun(runId: string): void {
  const store = readStore();
  delete store[runId];
  writeStore(store);
}
