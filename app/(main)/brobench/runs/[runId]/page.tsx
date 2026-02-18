import { RunMonitor } from "../../_components/RunMonitor";

type PageProps = {
  params: Promise<{ runId: string }>;
};

export default async function BrobenchRunPage({ params }: PageProps) {
  const { runId } = await params;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Run Monitor</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Live benchmark stream for <span className="font-mono text-foreground">{runId}</span>
        </p>
      </div>

      <RunMonitor runId={runId} />
    </div>
  );
}
