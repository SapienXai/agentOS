"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity, Cpu, Zap, BarChart3, Globe, Hexagon } from "lucide-react";
import { PageTransition, containerVariants, itemVariants } from "@/components/PageTransition";
import { motion } from "framer-motion";

// Mock Data
const projects = [
  {
    id: "coincollect",
    name: "CoinCollect",
    status: "active",
    workers: 12,
    playbooks: 3
  },
  {
    id: "sapienx",
    name: "SapienX",
    status: "active",
    workers: 4,
    playbooks: 8
  },
  {
    id: "questlayer",
    name: "QuestLayer",
    status: "paused",
    workers: 2,
    playbooks: 1
  }
];

const globalActivity = [
  { project: "CoinCollect", action: "Market analysis completed", time: "2 mins ago", status: "success" },
  { project: "SapienX", action: "New content drafted", time: "15 mins ago", status: "success" },
  { project: "CoinCollect", action: "Worker 'Alpha' started", time: "1 hour ago", status: "info" },
  { project: "QuestLayer", action: "Scheduled maintenance", time: "5 days ago", status: "warning" },
];

export default function GlobalDashboardPage() {
  const totalWorkers = projects.reduce((acc, p) => acc + p.workers, 0);
  const totalPlaybooks = projects.reduce((acc, p) => acc + p.playbooks, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  return (
    <PageTransition className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <section className="space-y-8">
         <div className="flex items-center gap-3 mb-8">
           <div className="p-3 bg-primary/10 rounded-xl ring-1 ring-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
             <Globe className="w-6 h-6 text-primary" />
           </div>
           <div>
             <h2 className="text-3xl font-bold tracking-tight text-foreground">Global Command Center</h2>
             <p className="text-muted-foreground mt-1">System-wide overview and operational metrics.</p>
           </div>
         </div>

         {/* Global KPIs */}
         <motion.div 
           variants={containerVariants}
           initial="hidden"
           animate="show"
           className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
         >
            <motion.div variants={itemVariants}>
              <GlobalKpiCard title="Total Active Projects" value={activeProjects} total={projects.length} icon={Hexagon} color="text-blue-400" bg="bg-blue-400/10" border="group-hover:border-blue-400/30" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <GlobalKpiCard title="Total Workforce" value={totalWorkers} sub="Agents Deployed" icon={Cpu} color="text-purple-400" bg="bg-purple-400/10" border="group-hover:border-purple-400/30" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <GlobalKpiCard title="Active Playbooks" value={totalPlaybooks} sub="Workflows Running" icon={Zap} color="text-amber-400" bg="bg-amber-400/10" border="group-hover:border-amber-400/30" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <GlobalKpiCard title="System Load" value="34%" sub="All Systems Normal" icon={Activity} color="text-emerald-400" bg="bg-emerald-400/10" border="group-hover:border-emerald-400/30" />
            </motion.div>
         </motion.div>

         {/* Global Activity Feed */}
         <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Global Activity Stream
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {globalActivity.map((item, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 group"
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] ${
                            item.status === 'success' ? 'bg-emerald-500 text-emerald-500' : 
                            item.status === 'warning' ? 'bg-amber-500 text-amber-500' : 'bg-blue-500 text-blue-500'
                          }`} />
                          <div>
                             <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{item.action}</p>
                             <p className="text-xs text-muted-foreground">on <span className="font-semibold text-primary/80">{item.project}</span></p>
                          </div>
                       </div>
                       <div className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded-md">{item.time}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  Resource Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {projects.map((p, i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    key={p.id} 
                    className="space-y-3"
                  >
                     <div className="flex justify-between text-sm font-medium">
                       <span>{p.name}</span>
                       <span className="text-muted-foreground">{Math.round((p.workers / totalWorkers) * 100)}%</span>
                     </div>
                     <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden ring-1 ring-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(p.workers / totalWorkers) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.4)]" 
                        />
                     </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
         </div>
      </section>
    </PageTransition>
  );
}

function GlobalKpiCard({ title, value, total, sub, icon: Icon, color, bg, border }: any) {
  return (
    <Card className={`group hover:bg-card/80 transition-all duration-300 border-white/10 ${border || 'hover:border-primary/20'}`}>
      <CardContent className="p-6 flex items-center justify-between space-y-0 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${bg?.replace('bg-', 'bg-') || 'bg-primary'}`} />
        
        <div className="space-y-1 relative z-10">
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{title}</p>
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {value} {total && <span className="text-muted-foreground text-xl font-normal">/ {total}</span>}
          </div>
          <p className={`text-xs text-muted-foreground`}>{sub}</p>
        </div>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-inner ${bg} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  )
}
