import { LucideIcon } from "lucide-react";
// import { ReactNode } from "react";

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

export type ProjectCategory =
  | "all"
  | "blockchain"
  | "web3"
  | "defi"
  | "nft"
  | "dao";
export type ProjectDifficulty =
  | "all"
  | "beginner"
  | "intermediate"
  | "advanced";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  difficulty: string;
  technologies: string[];
  starsCount: number;
  forksCount: number;
  contributorsCount: number;
  createdAt: string;
  updatedAt: string;
  demo?: string;
  repo?: string;
  readme?: string;
}

interface lesson {
  id: string;
  title: string;
  duration: string;
}

interface Module {
  id: string;
  title: string;
  lessons: lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  enrolledCount: number;
  instructorName: string;
  price?: string | number; // Can be "Free" or a number for paid courses
  modules: Module[];
  moduleCount: number;
  estimatedHours: number;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: "open" | "closed";
  html_url: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
  created_at: string;
  updated_at: string;
  assignee: {
    login: string;
    avatar_url: string;
  } | null;
  difficulty: "easy" | "medium" | "hard";
  estimated_time: string;
}

export interface IssueApplication {
  id: string;
  userId: string;
  issueId: number;
  projectId: string;
  status: "pending" | "approved" | "rejected";
  message: string;
  created_at: string;
  experience: string;
  timeCommitment: string;
  userName: string;
  userEmail: string;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completed: boolean;
  lastActivityAt: string;
}

export interface User {
  email: string;
  // avatarUrl: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  attendees: number;
  featured: boolean;
  host: string;
}

export interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  posted: string;
  replies: number;
  views: number;
  tags: string[];
}

// Define community interface
export interface Community {
  name: string;
  members: number;
  // icon: ReactNode;
  icon: LucideIcon;
};