import { BrobenchLeaderboardRow, BrobenchLevel, BrobenchTask } from "../_types";

export const brobenchTasks: BrobenchTask[] = [
  {
    id: "l1-intake-basics",
    levelId: "level-1",
    title: "Intake Basics",
    summary: "Simple identity form with required checkbox confirmation.",
    description: "Agent should fill basic profile data exactly and complete the consent toggle.",
    category: "form",
    difficulty: "easy",
    estimatedMinutes: 3,
    maxScore: 100,
    status: "active",
    routePath: "/brobench/tasks/l1-intake-basics",
    instructions: [
      "Company Name: Orbit Labs",
      "Contact Name: Selin Kaya",
      "Work Email: selin@orbitlabs.ai",
      "Priority: High",
      "Enable terms checkbox"
    ],
    successCriteria: [
      "Identity fields match exactly",
      "Priority selection is correct",
      "Consent checkbox is enabled"
    ]
  },
  {
    id: "l1-launch-basics",
    levelId: "level-1",
    title: "Launch Basics",
    summary: "Date, number, and region selection with exact values.",
    description: "Agent should set campaign metadata without missing required fields.",
    category: "validation",
    difficulty: "easy",
    estimatedMinutes: 3,
    maxScore: 110,
    status: "active",
    routePath: "/brobench/tasks/l1-launch-basics",
    instructions: [
      "Campaign Code: STARTER-101",
      "Launch Date: 2026-03-14",
      "Participants: 120",
      "Region: EU"
    ],
    successCriteria: [
      "Exact code and date",
      "Participant count exact",
      "Region selected correctly"
    ]
  },
  {
    id: "l1-upload-basics",
    levelId: "level-1",
    title: "Upload Basics",
    summary: "Basic media upload with metadata token check.",
    description: "Agent uploads an accepted image file and adds required note token.",
    category: "upload",
    difficulty: "easy",
    estimatedMinutes: 4,
    maxScore: 120,
    status: "active",
    routePath: "/brobench/tasks/l1-upload-basics",
    instructions: [
      "Asset Name: hero-banner",
      "Asset Type: image",
      "Upload file extension: png/jpg/jpeg/webp",
      "Notes include token: 1080"
    ],
    successCriteria: [
      "Asset metadata is exact",
      "Upload extension is accepted",
      "Notes contain required token"
    ]
  },
  {
    id: "l1-approval-basics",
    levelId: "level-1",
    title: "Approval Basics",
    summary: "Conditional legal field flow with SLA validation.",
    description: "Agent should activate legal review and complete the dependent email input.",
    category: "flow",
    difficulty: "medium",
    estimatedMinutes: 5,
    maxScore: 130,
    status: "active",
    routePath: "/brobench/tasks/l1-approval-basics",
    instructions: [
      "Workflow Name: Q2 Compliance Push",
      "Enable Legal Review",
      "Legal Approver Email: legal@orbitlabs.ai",
      "SLA: 48h",
      "Reason must contain: compliance"
    ],
    successCriteria: [
      "Conditional legal field is handled",
      "SLA and email are correct",
      "Reason contains required keyword"
    ]
  },
  {
    id: "l1-routing-basics",
    levelId: "level-1",
    title: "Routing Basics",
    summary: "Operational dispatch form with deadline and budget.",
    description: "Agent should complete a multi-field routing form in one pass.",
    category: "form",
    difficulty: "medium",
    estimatedMinutes: 5,
    maxScore: 140,
    status: "active",
    routePath: "/brobench/tasks/l1-routing-basics",
    instructions: [
      "Channel: email",
      "Owner Email: ops@orbitlabs.ai",
      "Deadline: 2026-03-21",
      "Budget: 2500",
      "Audience: 800",
      "Retry Policy: 2 retries",
      "Enable team notification",
      "Execution brief includes: launch"
    ],
    successCriteria: [
      "All numeric/date fields exact",
      "Channel and retry policy correct",
      "Brief contains required token"
    ]
  },

  {
    id: "l2-intake-quality",
    levelId: "level-2",
    title: "Intake Quality Gate",
    summary: "Adds team-size and timezone validation on top of basic intake.",
    description: "Agent should complete expanded profile intake with strict metadata checks.",
    category: "form",
    difficulty: "medium",
    estimatedMinutes: 5,
    maxScore: 130,
    status: "active",
    routePath: "/brobench/tasks/l2-intake-quality",
    instructions: [
      "Company Name: Nimbus Forge",
      "Contact Name: Arda Demir",
      "Work Email: arda@nimbusforge.ai",
      "Priority: high",
      "Team Size: 16",
      "Timezone: UTC+3",
      "Enable terms checkbox"
    ],
    successCriteria: [
      "Base profile correctness",
      "Team size exact",
      "Timezone exact"
    ]
  },
  {
    id: "l2-launch-constraints",
    levelId: "level-2",
    title: "Launch Constraints",
    summary: "Launch plan with additional window + blackout confirmation.",
    description: "Agent should satisfy multi-constraint launch setup under stricter validation.",
    category: "validation",
    difficulty: "medium",
    estimatedMinutes: 5,
    maxScore: 140,
    status: "active",
    routePath: "/brobench/tasks/l2-launch-constraints",
    instructions: [
      "Campaign Code: GROWTH-202",
      "Launch Date: 2026-04-09",
      "Participants: 240",
      "Region: MENA",
      "Launch Window: evening",
      "Enable blackout constraints checkbox"
    ],
    successCriteria: [
      "Base launch values exact",
      "Window type correct",
      "Blackout confirmation enabled"
    ]
  },
  {
    id: "l2-upload-compliance",
    levelId: "level-2",
    title: "Upload Compliance",
    summary: "Upload task with safe-zone and alt-text requirements.",
    description: "Agent should satisfy richer asset metadata and profile constraints.",
    category: "upload",
    difficulty: "medium",
    estimatedMinutes: 6,
    maxScore: 150,
    status: "active",
    routePath: "/brobench/tasks/l2-upload-compliance",
    instructions: [
      "Asset Name: conversion-grid",
      "Asset Type: image",
      "Upload file extension: png or webp",
      "Notes include: 1440 and safe-zone",
      "Alt text includes: conversion",
      "Render Profile: retina"
    ],
    successCriteria: [
      "Upload extension policy satisfied",
      "Notes contain both tokens",
      "Alt text + profile are correct"
    ]
  },
  {
    id: "l2-approval-security",
    levelId: "level-2",
    title: "Approval + Security",
    summary: "Legal and security routing in the same conditional flow.",
    description: "Agent should handle dual conditional fields and risk-level classification.",
    category: "flow",
    difficulty: "hard",
    estimatedMinutes: 7,
    maxScore: 160,
    status: "active",
    routePath: "/brobench/tasks/l2-approval-security",
    instructions: [
      "Workflow Name: Partner Legal Sweep",
      "Enable Legal Review",
      "Legal Approver Email: legal-ops@orbitlabs.ai",
      "SLA: 24h",
      "Reason includes: compliance and evidence",
      "Risk Level: high",
      "Enable Security Review",
      "Security Approver Email: secops@orbitlabs.ai"
    ],
    successCriteria: [
      "Both conditional branches completed",
      "Risk and SLA values exact",
      "Reason contains both tokens"
    ]
  },
  {
    id: "l2-routing-priority",
    levelId: "level-2",
    title: "Priority Routing",
    summary: "Higher-pressure dispatch with larger budget and brief constraints.",
    description: "Agent should complete dense routing data with strict retry policy.",
    category: "form",
    difficulty: "hard",
    estimatedMinutes: 7,
    maxScore: 170,
    status: "active",
    routePath: "/brobench/tasks/l2-routing-priority",
    instructions: [
      "Channel: discord",
      "Owner Email: dispatch@orbitlabs.ai",
      "Deadline: 2026-04-18",
      "Budget: 4200",
      "Audience: 1500",
      "Retry Policy: 3 retries",
      "Enable team notification",
      "Execution brief includes: launch and partners"
    ],
    successCriteria: [
      "All routing fields exact",
      "Retry policy and channel match",
      "Brief contains both required tokens"
    ]
  },

  {
    id: "l3-intake-risk",
    levelId: "level-3",
    title: "Risk Intake Escalation",
    summary: "Critical-priority intake with escalation-note requirements.",
    description: "Agent should manage strict intake form plus textual escalation validation.",
    category: "form",
    difficulty: "hard",
    estimatedMinutes: 7,
    maxScore: 170,
    status: "active",
    routePath: "/brobench/tasks/l3-intake-risk",
    instructions: [
      "Company Name: Astra Shield",
      "Contact Name: Mert Aydin",
      "Work Email: mert@astrashield.ai",
      "Priority: critical",
      "Team Size: 28",
      "Timezone: UTC+1",
      "Escalation Note includes: escalation and priority",
      "Enable terms checkbox"
    ],
    successCriteria: [
      "Critical intake metadata exact",
      "Escalation note contains both tokens",
      "Consent is enabled"
    ]
  },
  {
    id: "l3-launch-risk",
    levelId: "level-3",
    title: "Risk Launch Planning",
    summary: "High-stakes launch with weekend window and contingency text.",
    description: "Agent should satisfy advanced launch controls and fallback planning fields.",
    category: "validation",
    difficulty: "hard",
    estimatedMinutes: 8,
    maxScore: 180,
    status: "active",
    routePath: "/brobench/tasks/l3-launch-risk",
    instructions: [
      "Campaign Code: RISK-OMEGA-77",
      "Launch Date: 2026-05-12",
      "Participants: 360",
      "Region: EU",
      "Launch Window: weekend",
      "Enable blackout constraints checkbox",
      "Contingency plan includes: rollback and backup"
    ],
    successCriteria: [
      "Core launch fields exact",
      "Window and blackout controls correct",
      "Contingency text includes both tokens"
    ]
  },
  {
    id: "l3-upload-release",
    levelId: "level-3",
    title: "Release Asset Gate",
    summary: "Strict upload policy with render profile and usage rights gating.",
    description: "Agent should pass comprehensive asset validation for release readiness.",
    category: "upload",
    difficulty: "hard",
    estimatedMinutes: 8,
    maxScore: 190,
    status: "active",
    routePath: "/brobench/tasks/l3-upload-release",
    instructions: [
      "Asset Name: release-master-hero",
      "Asset Type: image",
      "Upload file extension: webp or png",
      "Notes include: 2160 and srgb",
      "Alt text includes: fallback",
      "Render Profile: retina",
      "Enable usage rights approved"
    ],
    successCriteria: [
      "Upload extension and type valid",
      "Notes and alt text contain required tokens",
      "Profile and rights flags exact"
    ]
  },
  {
    id: "l3-approval-escalation",
    levelId: "level-3",
    title: "Emergency Approval Escalation",
    summary: "Critical legal+security workflow with dense requirements.",
    description: "Agent should execute high-risk conditional workflow without missing branches.",
    category: "flow",
    difficulty: "hard",
    estimatedMinutes: 9,
    maxScore: 200,
    status: "active",
    routePath: "/brobench/tasks/l3-approval-escalation",
    instructions: [
      "Workflow Name: Emergency Policy Update",
      "Enable Legal Review",
      "Legal Approver Email: legal-director@orbitlabs.ai",
      "SLA: 24h",
      "Reason includes: compliance and incident",
      "Risk Level: critical",
      "Enable Security Review",
      "Security Approver Email: security@orbitlabs.ai"
    ],
    successCriteria: [
      "Legal and security conditional fields complete",
      "Critical risk + SLA exact",
      "Reason contains both required tokens"
    ]
  },
  {
    id: "l3-routing-release",
    levelId: "level-3",
    title: "Release Routing Orchestration",
    summary: "Most complex dispatch form with high retry and brief constraints.",
    description: "Agent should complete highest-density routing task with precise operational values.",
    category: "form",
    difficulty: "hard",
    estimatedMinutes: 10,
    maxScore: 210,
    status: "active",
    routePath: "/brobench/tasks/l3-routing-release",
    instructions: [
      "Channel: telegram",
      "Owner Email: release@orbitlabs.ai",
      "Deadline: 2026-05-20",
      "Budget: 6500",
      "Audience: 2400",
      "Retry Policy: 5 retries",
      "Enable team notification",
      "Execution brief includes: go-live and rollback"
    ],
    successCriteria: [
      "All dispatch values exact",
      "Retry policy at max tier",
      "Brief includes both release tokens"
    ]
  }
];

export const brobenchLevels: BrobenchLevel[] = [
  {
    id: "level-1",
    name: "Level 1 - Foundations",
    description: "Basic browser interactions: fill, select, upload, and simple conditional logic.",
    benchmarkGoal: "Measure baseline completion accuracy with low cognitive load.",
    recommendedPrompt:
      "Go to /brobench/levels/level-1 and complete all 5 tasks in order. Keep the same runId.",
    targetScore: 500,
    timeBudgetMinutes: 22,
    taskIds: [
      "l1-intake-basics",
      "l1-launch-basics",
      "l1-upload-basics",
      "l1-approval-basics",
      "l1-routing-basics"
    ]
  },
  {
    id: "level-2",
    name: "Level 2 - Constraint Handling",
    description: "Adds stronger validation, multi-branch conditions, and denser field sets.",
    benchmarkGoal: "Measure consistency under medium-to-hard UI and data constraints.",
    recommendedPrompt:
      "Go to /brobench/levels/level-2 and complete all 5 tasks. Do not skip conditional fields.",
    targetScore: 640,
    timeBudgetMinutes: 30,
    taskIds: [
      "l2-intake-quality",
      "l2-launch-constraints",
      "l2-upload-compliance",
      "l2-approval-security",
      "l2-routing-priority"
    ]
  },
  {
    id: "level-3",
    name: "Level 3 - High-Risk Operations",
    description: "High-density tasks with strict text-token, conditional, and policy gates.",
    benchmarkGoal: "Measure robustness and precision under the hardest benchmark profile.",
    recommendedPrompt:
      "Go to /brobench/levels/level-3 and complete all 5 tasks. Prioritize exactness over speed.",
    targetScore: 810,
    timeBudgetMinutes: 40,
    taskIds: [
      "l3-intake-risk",
      "l3-launch-risk",
      "l3-upload-release",
      "l3-approval-escalation",
      "l3-routing-release"
    ]
  }
];

export const brobenchLeaderboardSeed: BrobenchLeaderboardRow[] = [
  {
    rank: 1,
    agentName: "Scout-A",
    model: "gpt-5-agent",
    avgScore: 94,
    successRate: 98,
    runs: 24,
    bestRunId: "run-l3-2402",
    bestRunDate: "2026-02-17"
  },
  {
    rank: 2,
    agentName: "Navigator-X",
    model: "claude-opus-browser",
    avgScore: 89,
    successRate: 94,
    runs: 19,
    bestRunId: "run-l2-2391",
    bestRunDate: "2026-02-16"
  },
  {
    rank: 3,
    agentName: "Runner-7",
    model: "gemini-browser-pro",
    avgScore: 84,
    successRate: 90,
    runs: 31,
    bestRunId: "run-l3-2367",
    bestRunDate: "2026-02-14"
  }
];

export function getTaskById(taskId: string): BrobenchTask | undefined {
  return brobenchTasks.find((task) => task.id === taskId);
}

export function getLevelById(levelId: string): BrobenchLevel | undefined {
  return brobenchLevels.find((level) => level.id === levelId);
}

export function getTasksForLevel(levelId: string): BrobenchTask[] {
  return brobenchTasks.filter((task) => task.levelId === levelId);
}
