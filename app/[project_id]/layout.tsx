import { ProjectLayout } from "@/components/ProjectLayout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  return (
    <ProjectLayout projectId={project_id}>
      {children}
    </ProjectLayout>
  );
}
