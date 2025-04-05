import { ArrowRight, Code, Database } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Contributor, Project } from "@/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow duration-300 dark:hover:shadow-sky-200/5">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {project.category === "blockchain" ? (
              <Code className="w-8 h-8 text-primary p-1.5 bg-primary/10 rounded-lg" />
            ) : (
              <Database className="w-8 h-8 text-primary p-1.5 bg-primary/10 rounded-lg" />
            )}
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span className="capitalize">{project.category}</span>
                <span>•</span>
                <span>{project.tasks.length} tasks</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {project.skills.slice(0, 3).map((skill: string, index: number) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                +{project.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Completion</span>
            <span className="font-medium">{project.completionRate}%</span>
          </div>
          <Progress value={project.completionRate} className="h-2" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {project.contributors
              .slice(0, 3)
              .map((contributor: Contributor, index: number) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-white text-xs font-medium"
                  title={contributor.name}
                >
                  {contributor.name.charAt(0)}
                </div>
              ))}
            {project.contributors.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-white text-xs font-medium">
                +{project.contributors.length - 3}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" className="gap-1 text-primary bg-sky-400 hover:bg-muted">
            View Project
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
