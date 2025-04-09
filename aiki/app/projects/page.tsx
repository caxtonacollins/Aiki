"use client";

import { useState } from "react";
import { Search, GitBranch } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/mocks/projectsData";
import ProjectCard from "@/components/project/ProjectCard";
import { ProjectCategory, ProjectDifficulty } from "@/types";
import { useParams } from "next/navigation";
import ProjectDetail from "@/components/project/projectDetails";

const Projects = () => {
  const { id, "*": subpath } = useParams<{ id: string; "*": string }>();
  const [sort, setSort] = useState<string>("newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<ProjectDifficulty>("all");

  // Filter projects based on search term, category, and difficulty
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || project.category === category;
    const matchesDifficulty =
      difficulty === "all" || project.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sort) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "stars":
        return b.starsCount - a.starsCount;
      case "forks":
        return b.forksCount - a.forksCount;
      default:
        return 0;
    }
  });

  // If viewing a specific project
  if (id) {
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return (
        <div className="container mx-auto px-6 py-24 min-h-screen">
          <h2 className="text-2xl font-bold">Project not found</h2>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-6 py-24 min-h-screen">
        {/* <ProjectNavigation projectId={id} /> */}
        <ProjectDetail project={project} subpath={subpath || ""} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold mb-4 fade-in">Projects</h1>
          <p
            className="text-lg text-muted-foreground mb-8 fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Explore and contribute to community-driven blockchain and Web3
            projects, or showcase your own work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <div className="relative md:col-span-5">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as ProjectCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
                <SelectItem value="web3">Web3</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
                <SelectItem value="nft">NFT</SelectItem>
                <SelectItem value="dao">DAO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select
              value={difficulty}
              onValueChange={(value) =>
                setDifficulty(value as ProjectDifficulty)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="stars">Most stars</SelectItem>
                <SelectItem value="forks">Most forks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <GitBranch className="w-12 h-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                technologies={project.technologies}
                starsCount={project.starsCount}
                forksCount={project.forksCount}
                contributorsCount={project.contributorsCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
