import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileText, Flag, Scale, Sparkles } from "lucide-react";

export default function BlueprintPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blueprint</h1>
        <p className="text-muted-foreground mt-2">The brain of your project. Define identity, goals, and constraints here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Identity & Goals */}
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
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Mission</h4>
              <p className="text-lg leading-relaxed">
                To autonomously monitor market trends and generate high-quality daily briefings for executive stakeholders, ensuring zero latency in information delivery.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
               <div className="p-4 rounded-lg bg-background border border-border/50">
                 <div className="text-sm font-medium text-muted-foreground">Target Audience</div>
                 <div className="font-semibold mt-1">C-Suite Executives</div>
               </div>
               <div className="p-4 rounded-lg bg-background border border-border/50">
                 <div className="text-sm font-medium text-muted-foreground">Update Frequency</div>
                 <div className="font-semibold mt-1">Daily @ 6:00 AM</div>
               </div>
               <div className="p-4 rounded-lg bg-background border border-border/50">
                 <div className="text-sm font-medium text-muted-foreground">Primary Output</div>
                 <div className="font-semibold mt-1">PDF & Email Brief</div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Tone / Style */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle>Tone & Style</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-wrap gap-2">
               {["Professional", "Concise", "Data-Driven", "Neutral", "Executive"].map((tag) => (
                 <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-sm font-medium border border-border">
                   {tag}
                 </span>
               ))}
             </div>
             <div className="p-4 rounded-lg bg-secondary/50 text-sm italic border-l-2 border-purple-500">
               "The market showed resilience today despite geopolitical headwinds..."
             </div>
          </CardContent>
        </Card>

        {/* Policies */}
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
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500" />
                <span className="text-sm">Never cite unverified sources (Twitter/X, Reddit).</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500" />
                <span className="text-sm">Always include confidence score for predictions.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500" />
                <span className="text-sm">Review required if sentiment is extremely negative.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

         {/* Assets */}
         <Card className="md:col-span-2">
          <CardHeader>
             <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <FileText className="w-6 h-6" />
              </div>
              <CardTitle>Knowledge Base & Assets</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Company_Brand_Guidelines.pdf", size: "2.4 MB" },
                { name: "Historical_Market_Data_2024.csv", size: "154 MB" },
                { name: "Executive_Bio_List.docx", size: "45 KB" },
                { name: "Competitor_Analysis_Framework.md", size: "12 KB" },
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
