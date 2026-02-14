export type OperationType = "content" | "campaign" | "outreach";
export type OperationStatus = "draft" | "needs_approval" | "approved" | "scheduled" | "running" | "done" | "failed";

export interface OperationTask {
  id: string;
  projectId: string;
  type: OperationType;
  status: OperationStatus;
  dueAt: string;
  createdAt: string;
  metadata: Record<string, string | number | boolean>;
}

export interface ApprovalItem {
  id: string;
  taskId: string;
  previewText: string;
  channel: "X" | "Email" | "Discord" | "Telegram";
  riskLevel: "low" | "medium" | "high";
  suggestedSchedule: string;
}

export interface OutreachLead {
  id: string;
  name: string;
  channel: "X" | "Email" | "Discord";
  stage: "to_contact" | "contacted" | "replied" | "negotiating" | "closed";
  lastContactAt: string;
  nextFollowUpAt: string;
  notes: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: "planned" | "setup" | "live" | "ended";
  startAt: string;
  milestones: Array<{ label: string; date: string; status: "upcoming" | "done" }>;
  rewardBudget: string;
}

export interface OperationMetricSnapshot {
  projectId: string;
  dateRange: "today" | "7d" | "week";
  posts: number;
  threads: number;
  dmsSent: number;
  replies: number;
  followersDelta: number;
  engagementDelta: number;
}
