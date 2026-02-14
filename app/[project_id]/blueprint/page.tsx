import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Flag, Megaphone, Scale, Sparkles, Users } from "lucide-react";

export default function BlueprintPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blueprint</h1>
        <p className="text-muted-foreground mt-2">Your growth strategy brain: goals, audience, channels, cadence, and guardrails.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2 bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Flag className="w-6 h-6" />
              </div>
              <CardTitle>Identity & Core Goals</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">Build a reliable growth engine that ships daily content, launches weekly campaigns, and compounds qualified outreach into partnership revenue.</p>
            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <Info label="Primary growth objective" value="Signups + qualified sales calls" />
              <Info label="North-star KPI" value="Weekly activated users" />
              <Info label="Current focus" value="Audience expansion on X + Discord" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                <Users className="w-6 h-6" />
              </div>
              <CardTitle>Target Audience</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="font-medium">Persona 1:</span> Indie founders looking for repeatable distribution playbooks.</p>
            <p><span className="font-medium">Persona 2:</span> Growth operators at web3-native products seeking campaign support.</p>
            <p><span className="font-medium">Persona 3:</span> Creator-led communities open to co-marketing.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-400">
                <Megaphone className="w-6 h-6" />
              </div>
              <CardTitle>Channels</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["X / Twitter", "Discord", "Telegram", "Lens", "Email", "Farcaster"].map((channel) => (
              <Badge key={channel} variant="secondary">{channel}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle>Content Pillars</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              "Build-in-public updates",
              "Growth teardown threads",
              "Customer wins + case snippets",
              "Campaign recaps and lessons",
              "Opinionated takes on autonomous ops",
            ].map((item) => (
              <p key={item} className="rounded-lg border border-border p-2">{item}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Campaign Cadence</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Weekly micro-campaign every Monday, monthly flagship campaign on week 3.</p>
            <p>Reward budget: <span className="font-medium">$2,500 / month</span>.</p>
            <p>Recap content required within 48h of each campaign close.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                <Scale className="w-6 h-6" />
              </div>
              <CardTitle>Policies & Rules</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-sm">No public posting without approval when risk is medium/high.</li>
              <li className="text-sm">No outreach claim without source links and offer details.</li>
              <li className="text-sm">Respect channel-specific community rules and anti-spam limits.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <CardTitle>Knowledge Base & Assets</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Brand_Voice_Guide.pdf", size: "2.1 MB" },
                { name: "Growth_Experiments_Archive.csv", size: "18 MB" },
                { name: "Campaign_Template_Library.md", size: "38 KB" },
              ].map((file) => (
                <div key={file.name} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer group">
                  <div className="p-2 bg-secondary rounded text-muted-foreground group-hover:text-foreground">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-background border border-border/50">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="font-semibold mt-1">{value}</div>
    </div>
  );
}
