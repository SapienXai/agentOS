import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CreditCard, Key, Shield, User, Users } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage global configuration and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Navigation (Left) */}
        <div className="space-y-1">
          {["General", "Team Members", "API Keys", "Billing", "Notifications"].map((item, i) => (
            <button 
              key={item}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content (Right) */}
        <div className="md:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle>Project Details</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <input 
                    type="text" 
                    defaultValue="AgentOS Demo" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Project ID</label>
                  <div className="flex gap-2">
                     <input 
                       type="text" 
                       defaultValue="proj_8x923kjsd92" 
                       readOnly
                       className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground font-mono"
                     />
                  </div>
                </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle>Danger Zone</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="border border-destructive/50 rounded-lg p-4 bg-destructive/5 flex items-center justify-between">
                   <div>
                     <h4 className="font-medium text-destructive">Delete Project</h4>
                     <p className="text-sm text-destructive/80">Once you delete a project, there is no going back.</p>
                   </div>
                   <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
                     Delete
                   </button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
