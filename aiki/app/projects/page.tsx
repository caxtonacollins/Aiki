"use client";

import { useState } from "react";
import { Search, GitBranch, Star, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/mocks/projectsData";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("all");
  const [techStack, setTechStack] = useState<string>("all");
  const [contributorSearch, setContributorSearch] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");
  const [category, setCategory] = useState<string>("all");

  // Filter projects based on active tab, search term, skill level, and tech stack
  const filteredProjects = projects.filter((project) => {
    // Filter by tab
    if (category !== "all" && project.category !== category) return false;

    // Filter by search term
    if (
      searchTerm &&
      !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    // Filter by tech stack
    if (
      techStack !== "all" &&
      !project.skills.some(
        (skill) => skill.toLowerCase() === techStack.toLowerCase()
      )
    )
      return false;

    // Filter by contributor
    if (
      contributorSearch &&
      !project.contributors.some((contributor) =>
        contributor.name.toLowerCase().includes(contributorSearch.toLowerCase())
      )
    )
      return false;

    // Return true if all filters pass
    return true;
  });

  // Get all tasks for the current view
  const filteredTasks = filteredProjects.flatMap((project) =>
    project.tasks.filter(
      (task) => skillLevel === "all" || task.difficulty === skillLevel
    )
  );

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          Apply your skills to real-world blockchain and data projects
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="relative md:w-1/4 md:mr-0 w-0.5 mr-12">
          <Search className="absolute left-4.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="">
          <Select value={skillLevel} onValueChange={setSkillLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Skill Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <Select value={techStack} onValueChange={setTechStack}>
            <SelectTrigger>
              <SelectValue placeholder="Tech Stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tech Stacks</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="solidity">Solidity</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="tensorflow">TensorFlow</SelectItem>
              <SelectItem value="web3.js">Web3.js</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative  md:w-1/4 w-1/2">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Find contributor..."
            className="pl-10"
            value={contributorSearch}
            onChange={(e) => setContributorSearch(e.target.value)}
          />
        </div>

        <div className="">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ha">Hausa</SelectItem>
              <SelectItem value="Ig">Igbo</SelectItem>
              <SelectItem value="yu">Yoruba</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="blockchain">Blockchain</SelectItem>
              <SelectItem value="data">Data Analytics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <GitBranch className="w-12 h-12 mx-auto text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Available Tasks Section */}
      {filteredTasks.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Available Tasks</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4" />
              <span>
                Filtered by your selected skill level and project criteria
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
