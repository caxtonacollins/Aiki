"use client";

import { useState } from "react";
import {
  Search,
  BookOpen,
  Code,
  Database,
  GraduationCap,
  Brain,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getCoursesByFilter } from "@/mocks/courseData";

const Courses = () => {
  const [language, setLanguage] = useState<string>("en");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const filteredCourses = getCoursesByFilter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficulty === "all" || course.difficulty === difficulty;
    const matchesCategory = category === "all" || course.category === category;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categoryIcons = {
    blockchain: <Code className="w-6 h-6 text-primary" />,
    data: <Database className="w-6 h-6 text-primary" />,
    ai: <Brain className="w-6 h-6 text-primary" />,
    security: <Shield className="w-6 h-6 text-primary" />,
  };

  const difficultyBadges = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Master blockchain, AI, data analytics, and cybersecurity through our
          interactive courses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="relative md:col-span-5">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All difficultys</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="blockchain">Blockchain</SelectItem>
              <SelectItem value="data">Data Analytics</SelectItem>
              <SelectItem value="ai">Artificial Intelligence</SelectItem>
              <SelectItem value="security">Cybersecurity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            href={`/courses/${course.id}`}
            key={course.id}
            className="group"
          >
            <Card className="p-0 border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elevated">
              <div className="h-48 relative aspect-video overflow-hidden">
                <Image
                  width={800}
                  height={800}
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      difficultyBadges[
                        course.difficulty as keyof typeof difficultyBadges
                      ]
                    }`}
                  >
                    {course.difficulty.charAt(0).toUpperCase() +
                      course.difficulty.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {categoryIcons[course.category as keyof typeof categoryIcons]}
                  <span className="text-sm text-muted-foreground capitalize">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span>
                      {course.enrolledCount.toLocaleString()} enrolled
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
