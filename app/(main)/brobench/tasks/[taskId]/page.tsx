import { notFound } from "next/navigation";
import { getTaskById } from "../../_data/catalog";
import { TaskExercise } from "../../_components/TaskExercise";

type PageProps = {
  params: Promise<{ taskId: string }>;
  searchParams: Promise<{ runId?: string }>;
};

export default async function BrobenchTaskPage({ params, searchParams }: PageProps) {
  const { taskId } = await params;
  const query = await searchParams;

  const task = getTaskById(taskId);
  if (!task) {
    notFound();
  }

  return <TaskExercise task={task} initialRunId={query.runId} />;
}
