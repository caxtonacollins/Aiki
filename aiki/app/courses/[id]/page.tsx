"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Users,
  Star,
  BookOpen,
  Code,
  Database,
  GraduationCap,
  Brain,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CourseNavigation from "@/components/CourseNavigation";
import CourseVideoUpload from "@/components/course/CourseVideoUpload";
import CourseTextUpload from "@/components/course/CourseTextUpload";
import CourseDiagramUpload from "@/components/course/CourseDiagramUpload";
import { getCourseData } from "@/mocks/getCourseData";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";

const CourseDetailOverview = ({ course }: { course: any }) => {
  const categoryIcons: Record<string, JSX.Element> = {
    blockchain: <Code className="w-6 h-6 text-primary" />,
    data: <Database className="w-6 h-6 text-primary" />,
    ai: <Brain className="w-6 h-6 text-primary" />,
    security: <Shield className="w-6 h-6 text-primary" />,
  };

  const difficultyBadges: Record<string, string> = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Course Image */}
        <div className="lg:col-span-1">
          <div className="rounded-lg overflow-hidden">
            <Image
              width={800}
              height={800}
              src={course.image}
              alt={course.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Duration</span>
              </div>
              <span className="font-medium">{course.duration}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Enrolled</span>
              </div>
              <span className="font-medium">
                {course.enrolledCount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-muted-foreground">Rating</span>
              </div>
              <span className="font-medium">{course.rating}/5.0</span>
            </div>

            <Button className="w-full mt-4 bg-sky-400">
              Enroll in this course
            </Button>
          </div>
        </div>

        {/* Right Column - Course Details */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            {course.category && categoryIcons[course.category]}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                difficultyBadges[course.difficulty]
              }`}
            >
              {course.difficulty.charAt(0).toUpperCase() +
                course.difficulty.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

          <p className="text-muted-foreground mb-6">{course.longDescription}</p>

          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <GraduationCap className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{course.instructor}</h3>
              <p className="text-sm text-muted-foreground">
                {course.instructorTitle}
              </p>
            </div>
          </div>

          <Separator className="my-8 bg-sky-400" />

          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.modules.map((module: any) => (
              <Card
                key={module.id}
                className="border rounded-lg overflow-hidden p-0"
              >
                <div className="bg-muted p-4">
                  <h3 className="font-medium">{module.title}</h3>
                </div>
                <div className="divide-y">
                  {module.lessons.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-3 text-muted-foreground" />
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const CourseDetail = () => {
  const params = useParams();
  const id = params.id;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // This will be replaced with Supabase query once integrated
    const courseData = getCourseData(id as string);
    setCourse(courseData);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-24 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-medium mt-4 mb-2">Course not found</h3>
          <p className="text-muted-foreground mb-6">
            The course you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/courses">
            <ArrowLeft className="mr-2" />
            Back to all courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="mb-8">
        <Link
          href="/courses"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to all courses
        </Link>

        {/* Use CourseNavigation for tab navigation */}
        <CourseNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render content based on active tab */}
        {activeTab === "overview" && <CourseDetailOverview course={course} />}
        {activeTab === "videos" && (
          <CourseVideoUpload courseId={id as string} />
        )}
        {activeTab === "text" && <CourseTextUpload courseId={id as string} />}
        {activeTab === "diagrams" && (
          <CourseDiagramUpload courseId={id as string} />
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
