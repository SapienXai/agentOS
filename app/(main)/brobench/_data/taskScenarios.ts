export type ScenarioFieldType = "text" | "email" | "number" | "date" | "select" | "textarea" | "checkbox" | "file";

export interface ScenarioField {
  id: string;
  label: string;
  type: ScenarioFieldType;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  accept?: string;
  conditional?: {
    fieldId: string;
    equals: string | boolean;
  };
}

export interface ScenarioCheck {
  label: string;
  weight: number;
  test: (values: Record<string, string | boolean>) => boolean;
}

export interface TaskScenario {
  fields: ScenarioField[];
  initialValues?: Record<string, string | boolean>;
  checks: ScenarioCheck[];
}

function asText(values: Record<string, string | boolean>, key: string): string {
  const value = values[key];
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

function asBool(values: Record<string, string | boolean>, key: string): boolean {
  return values[key] === true;
}

function asNum(values: Record<string, string | boolean>, key: string): number {
  const value = Number(asText(values, key));
  return Number.isFinite(value) ? value : 0;
}

function includesEveryToken(values: Record<string, string | boolean>, key: string, tokens: string[]): boolean {
  const text = asText(values, key).toLowerCase();
  return tokens.every((token) => text.includes(token.toLowerCase()));
}

function fileExtension(values: Record<string, string | boolean>, key: string): string {
  const name = asText(values, key);
  if (!name.includes(".")) {
    return "";
  }

  const ext = name.split(".").pop();
  return ext ? ext.toLowerCase() : "";
}

function intakeScenario(config: {
  companyName: string;
  contactName: string;
  workEmail: string;
  priority: string;
  teamSize?: number;
  timezone?: string;
  noteTokens?: string[];
}): TaskScenario {
  const fields: ScenarioField[] = [
    { id: "companyName", label: "Company Name", type: "text" },
    { id: "contactName", label: "Contact Name", type: "text" },
    { id: "workEmail", label: "Work Email", type: "email" },
    {
      id: "priority",
      label: "Priority",
      type: "select",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" }
      ]
    },
    { id: "terms", label: "I approve benchmark terms", type: "checkbox" }
  ];

  const checks: ScenarioCheck[] = [
    { label: `Company Name is ${config.companyName}`, weight: 20, test: (values) => asText(values, "companyName") === config.companyName },
    { label: `Contact Name is ${config.contactName}`, weight: 20, test: (values) => asText(values, "contactName") === config.contactName },
    {
      label: `Work Email is ${config.workEmail}`,
      weight: 22,
      test: (values) => asText(values, "workEmail").toLowerCase() === config.workEmail.toLowerCase()
    },
    { label: `Priority is ${config.priority}`, weight: 18, test: (values) => asText(values, "priority") === config.priority },
    { label: "Terms checkbox enabled", weight: 20, test: (values) => asBool(values, "terms") }
  ];

  if (typeof config.teamSize === "number") {
    fields.push({ id: "teamSize", label: "Team Size", type: "number" });
    checks.push({ label: `Team Size is ${config.teamSize}`, weight: 20, test: (values) => asNum(values, "teamSize") === config.teamSize });
  }

  if (config.timezone) {
    fields.push({
      id: "timezone",
      label: "Timezone",
      type: "select",
      options: [
        { value: "UTC-5", label: "UTC-5" },
        { value: "UTC", label: "UTC" },
        { value: "UTC+1", label: "UTC+1" },
        { value: "UTC+3", label: "UTC+3" }
      ]
    });
    checks.push({ label: `Timezone is ${config.timezone}`, weight: 16, test: (values) => asText(values, "timezone") === config.timezone });
  }

  if (config.noteTokens && config.noteTokens.length > 0) {
    fields.push({ id: "intakeNote", label: "Escalation Note", type: "textarea", placeholder: "Add operational context" });
    checks.push({
      label: `Escalation Note contains: ${config.noteTokens.join(", ")}`,
      weight: 24,
      test: (values) => includesEveryToken(values, "intakeNote", config.noteTokens ?? [])
    });
  }

  return {
    fields,
    checks,
    initialValues: {
      priority: "low",
      terms: false,
      timezone: "UTC"
    }
  };
}

function launchScenario(config: {
  campaignCode: string;
  launchDate: string;
  participants: number;
  region: string;
  window?: string;
  blackoutAware?: boolean;
  contingencyTokens?: string[];
}): TaskScenario {
  const fields: ScenarioField[] = [
    { id: "campaignCode", label: "Campaign Code", type: "text" },
    { id: "launchDate", label: "Launch Date", type: "date" },
    { id: "participants", label: "Participants", type: "number" },
    {
      id: "region",
      label: "Region",
      type: "select",
      options: [
        { value: "us", label: "US" },
        { value: "eu", label: "EU" },
        { value: "mena", label: "MENA" },
        { value: "apac", label: "APAC" }
      ]
    }
  ];

  const checks: ScenarioCheck[] = [
    { label: `Campaign Code is ${config.campaignCode}`, weight: 22, test: (values) => asText(values, "campaignCode") === config.campaignCode },
    { label: `Launch Date is ${config.launchDate}`, weight: 24, test: (values) => asText(values, "launchDate") === config.launchDate },
    { label: `Participants is ${config.participants}`, weight: 28, test: (values) => asNum(values, "participants") === config.participants },
    { label: `Region is ${config.region.toUpperCase()}`, weight: 22, test: (values) => asText(values, "region") === config.region }
  ];

  if (config.window) {
    fields.push({
      id: "window",
      label: "Launch Window",
      type: "select",
      options: [
        { value: "morning", label: "Morning" },
        { value: "evening", label: "Evening" },
        { value: "weekend", label: "Weekend" }
      ]
    });
    checks.push({ label: `Launch Window is ${config.window}`, weight: 16, test: (values) => asText(values, "window") === config.window });
  }

  if (typeof config.blackoutAware === "boolean") {
    fields.push({ id: "blackoutAware", label: "I reviewed blackout constraints", type: "checkbox" });
    checks.push({
      label: config.blackoutAware ? "Blackout constraint checkbox enabled" : "Blackout constraint checkbox disabled",
      weight: 16,
      test: (values) => asBool(values, "blackoutAware") === config.blackoutAware
    });
  }

  if (config.contingencyTokens && config.contingencyTokens.length > 0) {
    fields.push({ id: "contingency", label: "Contingency Plan", type: "textarea" });
    checks.push({
      label: `Contingency plan contains: ${config.contingencyTokens.join(", ")}`,
      weight: 20,
      test: (values) => includesEveryToken(values, "contingency", config.contingencyTokens ?? [])
    });
  }

  return {
    fields,
    checks,
    initialValues: {
      region: "us",
      window: "morning",
      blackoutAware: false
    }
  };
}

function uploadScenario(config: {
  assetName: string;
  assetType: string;
  acceptedExtensions: string[];
  notesTokens: string[];
  altTextToken?: string;
  profile?: string;
  rightsConfirmed?: boolean;
}): TaskScenario {
  const fields: ScenarioField[] = [
    { id: "assetName", label: "Asset Name", type: "text" },
    {
      id: "assetType",
      label: "Asset Type",
      type: "select",
      options: [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
        { value: "gif", label: "GIF" }
      ]
    },
    {
      id: "assetFile",
      label: "Upload Asset",
      type: "file",
      accept: config.acceptedExtensions.map((ext) => `.${ext}`).join(",")
    },
    { id: "notes", label: "Asset Notes", type: "textarea", placeholder: "Include format and size details" }
  ];

  const checks: ScenarioCheck[] = [
    { label: `Asset Name is ${config.assetName}`, weight: 20, test: (values) => asText(values, "assetName") === config.assetName },
    { label: `Asset Type is ${config.assetType}`, weight: 18, test: (values) => asText(values, "assetType") === config.assetType },
    {
      label: `File extension in [${config.acceptedExtensions.join(", ")}]`,
      weight: 34,
      test: (values) => config.acceptedExtensions.includes(fileExtension(values, "assetFile"))
    },
    {
      label: `Notes contain: ${config.notesTokens.join(", ")}`,
      weight: 28,
      test: (values) => includesEveryToken(values, "notes", config.notesTokens)
    }
  ];

  if (config.altTextToken) {
    fields.push({ id: "altText", label: "Alt Text", type: "textarea" });
    checks.push({
      label: `Alt text contains '${config.altTextToken}'`,
      weight: 18,
      test: (values) => includesEveryToken(values, "altText", [config.altTextToken ?? ""])
    });
  }

  if (config.profile) {
    fields.push({
      id: "profile",
      label: "Render Profile",
      type: "select",
      options: [
        { value: "standard", label: "Standard" },
        { value: "retina", label: "Retina" },
        { value: "cinematic", label: "Cinematic" }
      ]
    });
    checks.push({ label: `Render profile is ${config.profile}`, weight: 12, test: (values) => asText(values, "profile") === config.profile });
  }

  if (typeof config.rightsConfirmed === "boolean") {
    fields.push({ id: "rightsConfirmed", label: "Usage rights approved", type: "checkbox" });
    checks.push({
      label: config.rightsConfirmed ? "Usage rights approved" : "Usage rights not approved",
      weight: 14,
      test: (values) => asBool(values, "rightsConfirmed") === config.rightsConfirmed
    });
  }

  return {
    fields,
    checks,
    initialValues: {
      assetType: "image",
      profile: "standard",
      rightsConfirmed: false
    }
  };
}

function approvalScenario(config: {
  workflowName: string;
  legalEmail: string;
  sla: string;
  reasonTokens: string[];
  riskLevel?: string;
  securityEmail?: string;
}): TaskScenario {
  const fields: ScenarioField[] = [
    { id: "workflowName", label: "Workflow Name", type: "text" },
    { id: "enableLegal", label: "Enable Legal Review", type: "checkbox" },
    {
      id: "legalEmail",
      label: "Legal Approver Email",
      type: "email",
      conditional: { fieldId: "enableLegal", equals: true }
    },
    {
      id: "sla",
      label: "SLA",
      type: "select",
      options: [
        { value: "24", label: "24h" },
        { value: "48", label: "48h" },
        { value: "72", label: "72h" }
      ]
    },
    { id: "reason", label: "Approval Reason", type: "textarea" }
  ];

  const checks: ScenarioCheck[] = [
    { label: `Workflow Name is ${config.workflowName}`, weight: 20, test: (values) => asText(values, "workflowName") === config.workflowName },
    { label: "Legal Review enabled", weight: 18, test: (values) => asBool(values, "enableLegal") },
    {
      label: `Legal Approver is ${config.legalEmail}`,
      weight: 22,
      test: (values) => asText(values, "legalEmail").toLowerCase() === config.legalEmail.toLowerCase()
    },
    { label: `SLA is ${config.sla}h`, weight: 18, test: (values) => asText(values, "sla") === config.sla },
    {
      label: `Reason contains: ${config.reasonTokens.join(", ")}`,
      weight: 22,
      test: (values) => includesEveryToken(values, "reason", config.reasonTokens)
    }
  ];

  if (config.riskLevel) {
    fields.push({
      id: "riskLevel",
      label: "Risk Level",
      type: "select",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" }
      ]
    });
    checks.push({ label: `Risk level is ${config.riskLevel}`, weight: 16, test: (values) => asText(values, "riskLevel") === config.riskLevel });
  }

  if (config.securityEmail) {
    fields.push({ id: "securityReview", label: "Enable Security Review", type: "checkbox" });
    fields.push({
      id: "securityEmail",
      label: "Security Approver Email",
      type: "email",
      conditional: { fieldId: "securityReview", equals: true }
    });

    checks.push({ label: "Security review enabled", weight: 12, test: (values) => asBool(values, "securityReview") });
    checks.push({
      label: `Security approver is ${config.securityEmail}`,
      weight: 14,
      test: (values) => asText(values, "securityEmail").toLowerCase() === config.securityEmail?.toLowerCase()
    });
  }

  return {
    fields,
    checks,
    initialValues: {
      enableLegal: false,
      sla: "24",
      riskLevel: "low",
      securityReview: false
    }
  };
}

function routingScenario(config: {
  channel: string;
  ownerEmail: string;
  deadline: string;
  budget: number;
  audience: number;
  retryCount: string;
  notifyTeam: boolean;
  briefTokens?: string[];
}): TaskScenario {
  const fields: ScenarioField[] = [
    {
      id: "channel",
      label: "Delivery Channel",
      type: "select",
      options: [
        { value: "email", label: "Email" },
        { value: "discord", label: "Discord" },
        { value: "telegram", label: "Telegram" }
      ]
    },
    { id: "ownerEmail", label: "Owner Email", type: "email" },
    { id: "deadline", label: "Deadline", type: "date" },
    { id: "budget", label: "Budget (USD)", type: "number" },
    { id: "audience", label: "Audience Target", type: "number" },
    {
      id: "retryCount",
      label: "Retry Policy",
      type: "select",
      options: [
        { value: "1", label: "1 retry" },
        { value: "2", label: "2 retries" },
        { value: "3", label: "3 retries" },
        { value: "5", label: "5 retries" }
      ]
    },
    { id: "notifyTeam", label: "Notify team channel", type: "checkbox" },
    { id: "brief", label: "Execution Brief", type: "textarea" }
  ];

  const checks: ScenarioCheck[] = [
    { label: `Channel is ${config.channel}`, weight: 14, test: (values) => asText(values, "channel") === config.channel },
    {
      label: `Owner Email is ${config.ownerEmail}`,
      weight: 14,
      test: (values) => asText(values, "ownerEmail").toLowerCase() === config.ownerEmail.toLowerCase()
    },
    { label: `Deadline is ${config.deadline}`, weight: 12, test: (values) => asText(values, "deadline") === config.deadline },
    { label: `Budget is ${config.budget}`, weight: 14, test: (values) => asNum(values, "budget") === config.budget },
    { label: `Audience target is ${config.audience}`, weight: 14, test: (values) => asNum(values, "audience") === config.audience },
    { label: `Retry policy is ${config.retryCount}`, weight: 12, test: (values) => asText(values, "retryCount") === config.retryCount },
    {
      label: config.notifyTeam ? "Team notification enabled" : "Team notification disabled",
      weight: 10,
      test: (values) => asBool(values, "notifyTeam") === config.notifyTeam
    }
  ];

  if (config.briefTokens && config.briefTokens.length > 0) {
    checks.push({
      label: `Execution brief contains: ${config.briefTokens.join(", ")}`,
      weight: 20,
      test: (values) => includesEveryToken(values, "brief", config.briefTokens ?? [])
    });
  }

  return {
    fields,
    checks,
    initialValues: {
      channel: "email",
      retryCount: "1",
      notifyTeam: false
    }
  };
}

const scenarios: Record<string, TaskScenario> = {
  "l1-intake-basics": intakeScenario({
    companyName: "Orbit Labs",
    contactName: "Selin Kaya",
    workEmail: "selin@orbitlabs.ai",
    priority: "high"
  }),
  "l1-launch-basics": launchScenario({
    campaignCode: "STARTER-101",
    launchDate: "2026-03-14",
    participants: 120,
    region: "eu"
  }),
  "l1-upload-basics": uploadScenario({
    assetName: "hero-banner",
    assetType: "image",
    acceptedExtensions: ["png", "jpg", "jpeg", "webp"],
    notesTokens: ["1080"]
  }),
  "l1-approval-basics": approvalScenario({
    workflowName: "Q2 Compliance Push",
    legalEmail: "legal@orbitlabs.ai",
    sla: "48",
    reasonTokens: ["compliance"]
  }),
  "l1-routing-basics": routingScenario({
    channel: "email",
    ownerEmail: "ops@orbitlabs.ai",
    deadline: "2026-03-21",
    budget: 2500,
    audience: 800,
    retryCount: "2",
    notifyTeam: true,
    briefTokens: ["launch"]
  }),

  "l2-intake-quality": intakeScenario({
    companyName: "Nimbus Forge",
    contactName: "Arda Demir",
    workEmail: "arda@nimbusforge.ai",
    priority: "high",
    teamSize: 16,
    timezone: "UTC+3"
  }),
  "l2-launch-constraints": launchScenario({
    campaignCode: "GROWTH-202",
    launchDate: "2026-04-09",
    participants: 240,
    region: "mena",
    window: "evening",
    blackoutAware: true
  }),
  "l2-upload-compliance": uploadScenario({
    assetName: "conversion-grid",
    assetType: "image",
    acceptedExtensions: ["png", "webp"],
    notesTokens: ["1440", "safe-zone"],
    altTextToken: "conversion",
    profile: "retina"
  }),
  "l2-approval-security": approvalScenario({
    workflowName: "Partner Legal Sweep",
    legalEmail: "legal-ops@orbitlabs.ai",
    sla: "24",
    reasonTokens: ["compliance", "evidence"],
    riskLevel: "high",
    securityEmail: "secops@orbitlabs.ai"
  }),
  "l2-routing-priority": routingScenario({
    channel: "discord",
    ownerEmail: "dispatch@orbitlabs.ai",
    deadline: "2026-04-18",
    budget: 4200,
    audience: 1500,
    retryCount: "3",
    notifyTeam: true,
    briefTokens: ["launch", "partners"]
  }),

  "l3-intake-risk": intakeScenario({
    companyName: "Astra Shield",
    contactName: "Mert Aydin",
    workEmail: "mert@astrashield.ai",
    priority: "critical",
    teamSize: 28,
    timezone: "UTC+1",
    noteTokens: ["escalation", "priority"]
  }),
  "l3-launch-risk": launchScenario({
    campaignCode: "RISK-OMEGA-77",
    launchDate: "2026-05-12",
    participants: 360,
    region: "eu",
    window: "weekend",
    blackoutAware: true,
    contingencyTokens: ["rollback", "backup"]
  }),
  "l3-upload-release": uploadScenario({
    assetName: "release-master-hero",
    assetType: "image",
    acceptedExtensions: ["webp", "png"],
    notesTokens: ["2160", "srgb"],
    altTextToken: "fallback",
    profile: "retina",
    rightsConfirmed: true
  }),
  "l3-approval-escalation": approvalScenario({
    workflowName: "Emergency Policy Update",
    legalEmail: "legal-director@orbitlabs.ai",
    sla: "24",
    reasonTokens: ["compliance", "incident"],
    riskLevel: "critical",
    securityEmail: "security@orbitlabs.ai"
  }),
  "l3-routing-release": routingScenario({
    channel: "telegram",
    ownerEmail: "release@orbitlabs.ai",
    deadline: "2026-05-20",
    budget: 6500,
    audience: 2400,
    retryCount: "5",
    notifyTeam: true,
    briefTokens: ["go-live", "rollback"]
  })
};

export function getTaskScenario(taskId: string): TaskScenario | undefined {
  return scenarios[taskId];
}
