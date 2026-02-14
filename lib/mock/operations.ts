import { ApprovalItem, Campaign, OperationMetricSnapshot, OperationTask, OutreachLead } from "@/lib/types/operations";

export const operationSnapshots: OperationMetricSnapshot[] = [
  { projectId: "coincollect", dateRange: "today", posts: 3, threads: 1, dmsSent: 6, replies: 2, followersDelta: 42, engagementDelta: 8.4 },
  { projectId: "sapienx", dateRange: "today", posts: 5, threads: 0, dmsSent: 10, replies: 4, followersDelta: 27, engagementDelta: 6.2 },
  { projectId: "questlayer", dateRange: "today", posts: 1, threads: 0, dmsSent: 2, replies: 0, followersDelta: -3, engagementDelta: -1.1 },
];

export const operationTasks: OperationTask[] = [
  { id: "task_1", projectId: "sapienx", type: "content", status: "needs_approval", dueAt: "2026-02-14T14:00:00Z", createdAt: "2026-02-14T09:00:00Z", metadata: { title: "5 growth hooks for this week", items: 5 } },
  { id: "task_2", projectId: "sapienx", type: "outreach", status: "scheduled", dueAt: "2026-02-14T17:00:00Z", createdAt: "2026-02-14T10:00:00Z", metadata: { targets: 10 } },
  { id: "task_3", projectId: "sapienx", type: "campaign", status: "running", dueAt: "2026-02-17T15:00:00Z", createdAt: "2026-02-12T07:00:00Z", metadata: { campaign: "Builder Spotlight" } },
];

export const approvalItemsSeed: ApprovalItem[] = [
  { id: "ap_1", taskId: "task_1", previewText: "Thread draft: 7 mistakes killing growth loops (and fixes).", channel: "X", riskLevel: "medium", suggestedSchedule: "Today, 15:00" },
  { id: "ap_2", taskId: "task_2", previewText: "DM template for creator outreach + incentive mention.", channel: "Discord", riskLevel: "high", suggestedSchedule: "Today, 18:00" },
  { id: "ap_3", taskId: "task_3", previewText: "Campaign announcement for rewards tier update.", channel: "Telegram", riskLevel: "medium", suggestedSchedule: "Tomorrow, 09:00" },
];

export const outreachLeadsSeed: OutreachLead[] = [
  { id: "lead_1", name: "Kira @ GrowthGuild", channel: "X", stage: "to_contact", lastContactAt: "-", nextFollowUpAt: "2026-02-15", notes: "High-fit collaborator; mention joint thread." },
  { id: "lead_2", name: "Ari from MetaLoop", channel: "Email", stage: "contacted", lastContactAt: "2026-02-13", nextFollowUpAt: "2026-02-16", notes: "Waiting for campaign slot confirmation." },
  { id: "lead_3", name: "Noah / BuildShip", channel: "Discord", stage: "replied", lastContactAt: "2026-02-14", nextFollowUpAt: "2026-02-18", notes: "Interested in co-hosting weekly challenge." },
  { id: "lead_4", name: "Mina from OnchainCats", channel: "X", stage: "negotiating", lastContactAt: "2026-02-12", nextFollowUpAt: "2026-02-15", notes: "Budget + timeline under review." },
  { id: "lead_5", name: "Orbit Labs", channel: "Email", stage: "closed", lastContactAt: "2026-02-11", nextFollowUpAt: "-", notes: "Deal closed, campaign starts next Monday." },
];

export const campaignSeed: Campaign[] = [
  {
    id: "camp_1",
    name: "Builder Spotlight Sprint",
    status: "setup",
    startAt: "2026-02-18",
    milestones: [
      { label: "Setup", date: "2026-02-15", status: "upcoming" },
      { label: "Announcement", date: "2026-02-16", status: "upcoming" },
      { label: "Launch", date: "2026-02-18", status: "upcoming" },
      { label: "Recap", date: "2026-02-24", status: "upcoming" },
    ],
    rewardBudget: "$1,500",
  },
];

export const executionTimeline = [
  { id: "t1", text: "Content Worker drafted 2 tweets", at: "45 min ago", runId: "run_2391" },
  { id: "t2", text: "Outreach Worker queued 5 DMs", at: "1h ago", runId: "run_2384" },
  { id: "t3", text: "Campaign Worker prepared rewards config", at: "2h ago", runId: "run_2366" },
  { id: "t4", text: "Scheduler moved approved thread to 15:00", at: "3h ago", runId: "run_2333" },
];
