/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArrowLeft,
  Calendar,
  GitBranch,
  Star,
  Users,
  ExternalLink,
  Github,
  Code,
  Server,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Project } from "@/types";
import Link from "next/link";
import { Badge } from "../ui/badge";
import GitHubIssues from "../GitHubIssues";

interface ProjectDetailProps {
  project: Project;
  subpath: string;
}

const ProjectDetail = ({ project, subpath }: ProjectDetailProps) => {
  //   const [activeTab, setActiveTab] = useState("overview");

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const difficultyColors = {
    beginner: "text-green-700 bg-green-100",
    intermediate: "text-yellow-700 bg-yellow-100",
    advanced: "text-red-700 bg-red-100",
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to all projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Image */}
          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden">
              <Image
                width={500}
                height={300}
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Created</span>
                </div>
                <span className="font-medium">
                  {formatDate(project.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Updated</span>
                </div>
                <span className="font-medium">
                  {formatDate(project.updatedAt)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="text-muted-foreground">Stars</span>
                </div>
                <span className="font-medium">
                  {project.starsCount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Forks</span>
                </div>
                <span className="font-medium">
                  {project.forksCount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Contributors</span>
                </div>
                <span className="font-medium">
                  {project.contributorsCount.toLocaleString()}
                </span>
              </div>

              <Separator />

              <div className="space-y-3 pt-2">
                {project.demo && (
                  <Button asChild variant="default" className="w-full bg-sky-400">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </a>
                  </Button>
                )}

                {project.repo && (
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Repository
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Project Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge
                className={`capitalize ${
                  difficultyColors[
                    project.difficulty as keyof typeof difficultyColors
                  ]
                }`}
              >
                {project.difficulty}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {project.category}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <p className="text-muted-foreground">
                  {project.longDescription || project.description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Getting Started
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="mb-3">To get started with this project:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Clone the repository from GitHub</li>
                      <li>
                        Install dependencies with <code>npm install</code>
                      </li>
                      <li>Configure the environment variables</li>
                      <li>
                        Run the development server with <code>npm run dev</code>
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Project Structure
                  </h3>
                  <pre className="text-sm overflow-x-auto p-2">
                    {`
/src
  /components
    /ui
    /features
  /hooks
  /pages
  /utils
  /contracts (for blockchain projects)
  App.tsx
  main.tsx
`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Code Examples</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium mb-2">
                      Example Contract (Solidity)
                    </p>
                    <pre className="text-sm overflow-x-auto p-2">
                      {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;

    function set(uint256 newValue) public {
        value = newValue;
    }

    function get() public view returns (uint256) {
        return value;
    }
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="issues" className="space-y-6">
                <GitHubIssues projectId={project.id} repoUrl={project.repo} />
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Documentation</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <BookOpen className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <div>
                        <h4 className="font-medium">User Guide</h4>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive guide for end-users
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Code className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <div>
                        <h4 className="font-medium">API Documentation</h4>
                        <p className="text-sm text-muted-foreground">
                          Reference for developers integrating with the API
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Server className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <div>
                        <h4 className="font-medium">Deployment Guide</h4>
                        <p className="text-sm text-muted-foreground">
                          Instructions for deploying to production
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    External Resources
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="flex items-center hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Project Website</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Community Discord</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Development Roadmap</span>
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
