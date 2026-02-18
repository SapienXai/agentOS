"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, ClipboardCopy, Flag, PlayCircle } from "lucide-react";
import { BrobenchTask } from "../_types";
import { getTaskScenario, TaskScenario } from "../_data/taskScenarios";
import { ensureRun, recordTaskAttempt } from "../_engine/runStorage";
import { computeNormalizedPercent } from "../_engine/scoring";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type ValidationRow = {
  label: string;
  passed: boolean;
};

type AttemptResult = {
  passed: boolean;
  score: number;
  maxScore: number;
  checks: ValidationRow[];
};

function getRunId(rawRunId?: string): string {
  if (!rawRunId || rawRunId.trim().length < 2) {
    return "quickrun-brobench";
  }
  return rawRunId.trim();
}

function buildInitialValues(scenario?: TaskScenario): Record<string, string | boolean> {
  if (!scenario) {
    return {};
  }

  const base = Object.fromEntries(
    scenario.fields.map((field) => [field.id, field.type === "checkbox" ? false : ""])
  ) as Record<string, string | boolean>;

  return {
    ...base,
    ...(scenario.initialValues ?? {})
  };
}

function evaluateTask(task: BrobenchTask, scenario: TaskScenario | undefined, values: Record<string, string | boolean>): AttemptResult {
  if (!scenario) {
    return {
      passed: false,
      score: 0,
      maxScore: task.maxScore,
      checks: [{ label: "Task evaluator is not configured yet.", passed: false }]
    };
  }

  const checks = scenario.checks.map((check) => ({
    label: check.label,
    passed: check.test(values)
  }));

  const totalWeight = scenario.checks.reduce((total, check) => total + check.weight, 0);
  const passedWeight = scenario.checks.reduce(
    (total, check, index) => total + (checks[index].passed ? check.weight : 0),
    0
  );

  const score = totalWeight > 0 ? Math.round((task.maxScore * passedWeight) / totalWeight) : 0;

  return {
    passed: checks.every((check) => check.passed),
    score,
    maxScore: task.maxScore,
    checks
  };
}

export function TaskExercise({ task, initialRunId }: { task: BrobenchTask; initialRunId?: string }) {
  const runId = useMemo(() => getRunId(initialRunId), [initialRunId]);
  const scenario = useMemo(() => getTaskScenario(task.id), [task.id]);
  const didInit = useRef(false);

  const [values, setValues] = useState<Record<string, string | boolean>>(() => buildInitialValues(scenario));
  const [attempt, setAttempt] = useState<AttemptResult | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "done" | "error">("idle");

  useEffect(() => {
    if (didInit.current) {
      return;
    }

    ensureRun(runId);
    didInit.current = true;
  }, [runId]);

  const absoluteTaskUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `${task.routePath}?runId=${encodeURIComponent(runId)}`;
    }

    const origin = window.location.origin;
    return `${origin}${task.routePath}?runId=${encodeURIComponent(runId)}`;
  }, [runId, task.routePath]);

  function updateValue(key: string, value: string | boolean) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function submitAttempt() {
    const result = evaluateTask(task, scenario, values);
    setAttempt(result);

    recordTaskAttempt({
      runId,
      taskId: task.id,
      score: result.score,
      maxScore: result.maxScore,
      passed: result.passed,
      message: `${task.title}: ${result.passed ? "passed" : "failed"} (${result.score}/${result.maxScore})`
    });
  }

  async function copyDirectUrl() {
    if (typeof navigator === "undefined") {
      return;
    }

    try {
      await navigator.clipboard.writeText(absoluteTaskUrl);
      setCopyStatus("done");
      window.setTimeout(() => setCopyStatus("idle"), 1500);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 1500);
    }
  }

  const attemptPercent = attempt ? computeNormalizedPercent(attempt.score, attempt.maxScore) : 0;

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary/90">Task Console</p>
              <CardTitle className="mt-1 text-xl md:text-2xl">{task.title}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
            </div>
            <div className="rounded-xl border border-border bg-background/70 px-4 py-3 text-sm">
              <p className="text-muted-foreground">Run ID</p>
              <p className="font-mono font-semibold text-foreground">{runId}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Button onClick={copyDirectUrl} variant="outline" className="gap-2">
              <ClipboardCopy className="h-4 w-4" />
              Copy Direct Task Link
            </Button>
            <Link href={`/brobench/runs/${runId}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
              <PlayCircle className="h-4 w-4" />
              Open Live Run Monitor
            </Link>
            <p className="text-xs text-muted-foreground">
              {copyStatus === "done" && "Link copied."}
              {copyStatus === "error" && "Could not copy link."}
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Task Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {scenario ? (
              scenario.fields.map((field) => {
                if (field.conditional) {
                  const conditionValue = values[field.conditional.fieldId];
                  if (conditionValue !== field.conditional.equals) {
                    return null;
                  }
                }

                const value = values[field.id];

                if (field.type === "checkbox") {
                  return (
                    <label key={field.id} className="flex items-center gap-2 text-sm">
                      <input
                        id={field.id}
                        type="checkbox"
                        checked={value === true}
                        onChange={(event) => updateValue(field.id, event.target.checked)}
                      />
                      {field.label}
                    </label>
                  );
                }

                if (field.type === "select") {
                  return (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="text-sm font-medium">{field.label}</label>
                      <select
                        id={field.id}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={typeof value === "string" ? value : ""}
                        onChange={(event) => updateValue(field.id, event.target.value)}
                      >
                        {(field.options ?? []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="text-sm font-medium">{field.label}</label>
                      <textarea
                        id={field.id}
                        className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={typeof value === "string" ? value : ""}
                        placeholder={field.placeholder}
                        onChange={(event) => updateValue(field.id, event.target.value)}
                      />
                    </div>
                  );
                }

                if (field.type === "file") {
                  return (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="text-sm font-medium">{field.label}</label>
                      <Input
                        id={field.id}
                        type="file"
                        accept={field.accept}
                        onChange={(event) => {
                          const name = event.target.files?.[0]?.name ?? "";
                          updateValue(field.id, name);
                        }}
                      />
                      {typeof value === "string" && value.length > 0 ? (
                        <p className="text-xs text-muted-foreground">Selected file: {value}</p>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="text-sm font-medium">{field.label}</label>
                    <Input
                      id={field.id}
                      type={field.type}
                      value={typeof value === "string" ? value : ""}
                      placeholder={field.placeholder}
                      onChange={(event) => updateValue(field.id, event.target.value)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                Scenario definition not found for this task.
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={submitAttempt} className="gap-2">
                <Flag className="h-4 w-4" />
                Submit Task Attempt
              </Button>
              <Link href={`/brobench/levels/${task.levelId}?runId=${encodeURIComponent(runId)}`} className="inline-flex min-h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
                Back To Level Tasks
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Task Score</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {attempt ? `${attempt.score}/${attempt.maxScore}` : `0/${task.maxScore}`}
              </p>
              <p className="text-sm text-muted-foreground">{attempt ? `${attemptPercent}%` : "Submit an attempt to score."}</p>
            </div>

            {attempt ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Checks</p>
                {attempt.checks.map((check, index) => (
                  <div key={`${check.label}-${index}`} className="flex items-start gap-2 rounded-md border border-border p-2 text-sm">
                    {check.passed ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    )}
                    <span className={check.passed ? "text-foreground" : "text-muted-foreground"}>{check.label}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-sm font-medium text-foreground">Instruction Snapshot</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {task.instructions.map((instruction) => (
                  <li key={instruction}>- {instruction}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
