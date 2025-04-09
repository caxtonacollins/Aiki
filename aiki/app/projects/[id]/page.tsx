"use client";

import React from "react";
import { notFound } from "next/navigation";
import { projects } from "@/mocks/projectsData";
import ProjectDetail from "@/components/project/projectDetails";
import type { Project } from "@/types";

interface Params {
  id: string;
}

// Create a wrapper component that handles the async params
function ProjectPageContent({ id }: { id: string }) {
  const project: Project | undefined = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <ProjectDetail project={project} subpath="" />
    </div>
  );
}

// Main component that unwraps the params
export default function ProjectPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = React.use(params);
  return <ProjectPageContent id={resolvedParams.id} />;
}