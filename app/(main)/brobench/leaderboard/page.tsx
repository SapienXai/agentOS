import { Medal, Trophy } from "lucide-react";
import { brobenchLeaderboardSeed } from "../_data/catalog";
import { LocalRunTable } from "../_components/LocalRunTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function BrobenchLeaderboardPage() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardHeader>
          <CardTitle className="text-2xl">Benchmark Leaderboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Compare browser agents by score consistency and completion reliability.
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-amber-400" />
            Global Ranking (Sample Seed)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full text-sm">
              <thead className="bg-card/70 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Rank</th>
                  <th className="px-4 py-3 text-left font-medium">Agent</th>
                  <th className="px-4 py-3 text-left font-medium">Model</th>
                  <th className="px-4 py-3 text-left font-medium">Avg Score</th>
                  <th className="px-4 py-3 text-left font-medium">Success Rate</th>
                  <th className="px-4 py-3 text-left font-medium">Runs</th>
                  <th className="px-4 py-3 text-left font-medium">Best Run</th>
                </tr>
              </thead>
              <tbody>
                {brobenchLeaderboardSeed.map((row) => (
                  <tr key={row.rank} className="border-t border-border">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        <Medal className="h-4 w-4 text-amber-400" />
                        #{row.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{row.agentName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.model}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.avgScore}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.successRate}%</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.runs}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.bestRunId} • {row.bestRunDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Local Runs</CardTitle>
          <p className="text-sm text-muted-foreground">Runs created from task pages are tracked here on this browser.</p>
        </CardHeader>
        <CardContent>
          <LocalRunTable />
        </CardContent>
      </Card>
    </div>
  );
}
