import { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type LeaderboardUser = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  trend: "up" | "down" | "stable";
  achievements: number;
};

export type Contributor = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  techStack: string[];
  estimatedTime: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  skills: string[];
  completionRate: number;
  contributors: Contributor[];
  tasks: Task[];
};

export type Courses = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  enrolledCount: number;
  rating: number;
  image: string;
};
