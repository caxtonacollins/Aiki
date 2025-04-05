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


// Types for individual lessons
interface Lesson {
  id: number;
  title: string;
  duration: string;
}

// Types for course modules
interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

// Main course interface
interface Course {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: "blockchain" | "data" | "ai" | "security";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  enrolledCount: number;
  rating: number;
  instructor: string;
  instructorTitle: string;
  image: string;
  modules: Module[];
}

// Type for the getCourseData function
type GetCourseData = (id: string) => Course | undefined;

// Export the types
export type {
  Lesson,
  Module,
  Course,
  GetCourseData,
};
