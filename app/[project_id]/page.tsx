import { redirect } from "next/navigation";

export default async function ProjectRootPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  redirect(`/${project_id}/operations`);
}
