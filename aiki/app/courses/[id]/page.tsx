"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import CourseDiagramUpload from "@/components/course/CourseDiagramUpload";
import CourseTextUpload from "@/components/course/CourseTextUpload";
import CourseVideoUpload from "@/components/course/CourseVideoUpload";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CourseEnrollButton from "@/components/course/CourseEnrollButton";
import CourseProgress from "@/components/course/CourseProgress";
import CourseNavigation from "@/components/course/CourseNavigation";
import { Course } from "@/types";
import { getCourseById } from "@/mocks/courseData";

const CourseDetail = () => {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const id = params.id as string;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  // Memoized fetch function
  const fetchCourse = useCallback(async () => {
    try {
      const foundCourse = getCourseById(id);
      if (!foundCourse) {
        setError("Course not found");
        return;
      }
      setCourse(foundCourse);
    } catch (err) {
      console.error("Error fetching course data:", err);
      setError("Failed to load course data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const loadData = async () => {
      await fetchCourse();

      // Check enrollment after course is loaded
      if (typeof window !== "undefined") {
        const enrolled = localStorage.getItem(`enrolled-${id}`) === "true";
        setIsEnrolled(enrolled);

        if (enrolled) {
          const savedProgress = parseInt(
            localStorage.getItem(`progress-${id}`) || "0",
            10
          );
          const savedCompletedModules = parseInt(
            localStorage.getItem(`completed-${id}`) || "0",
            10
          );
          setProgress(savedProgress);
          setCompletedModules(savedCompletedModules);
        }
      }
    };

    loadData();
  }, [id, fetchCourse]);

  // Stable handler for enrollment changes
  const handleEnrollmentChange = useCallback(
    (enrolled: boolean) => {
      setIsEnrolled(enrolled);
      if (typeof window !== "undefined") {
        localStorage.setItem(`enrolled-${id}`, enrolled.toString());
        if (enrolled) {
          localStorage.setItem(`progress-${id}`, "0");
          localStorage.setItem(`completed-${id}`, "0");
          setProgress(0);
          setCompletedModules(0);
        }
      }
    },
    [id]
  );

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <p className="mb-6">
              The course you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to all courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-destructive">{error}</h1>
        <Link href="/courses" className="mt-4 text-primary hover:underline">
          Back to courses
        </Link>
      </div>
    );
  }

  // Extract active tab from URL
  const getActiveTab = () => {
    const parts = pathname.split("/");
    if (parts.length <= 3) return "overview";
    return parts[3]; // Returns "videos", "text", or "diagrams"
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <Link
          href="/courses"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to all courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Badge className="mb-2">{course.category}</Badge>
              <Badge variant="outline" className="ml-2 mb-2">
                {course.difficulty}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Instructor:</span>{" "}
                {course.instructor} •
                <span className="font-medium ml-2">Duration:</span>{" "}
                {course.duration} •
                <span className="font-medium ml-2">Rating:</span>{" "}
                {course.rating}/5 •
                <span className="font-medium ml-2">Students:</span>{" "}
                {course.enrolledCount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden mb-4">
              <Image
                width={800}
                height={450}
                src={course.image}
                alt={course.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-4">
              <CourseEnrollButton
                courseId={course.id}
                isEnrolled={isEnrolled}
                onEnrollmentChange={handleEnrollmentChange}
              />

              {isEnrolled && (
                <CourseProgress
                  progress={progress}
                  moduleCount={course.moduleCount}
                  completedModules={completedModules}
                  estimatedHours={course.estimatedHours}
                />
              )}
            </div>
          </div>
        </div>

        <CourseNavigation courseId={id} activeTab={activeTab} />

        <div className="bg-card border rounded-lg p-6">
          {activeTab === "videos" ? (
            <CourseVideoUpload courseId={id} />
          ) : activeTab === "text" ? (
            <CourseTextUpload courseId={id} />
          ) : activeTab === "diagrams" ? (
            <CourseDiagramUpload courseId={id} />
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Course Modules</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="rounded-full bg-primary/10 text-primary w-8 h-8 flex items-center justify-center font-medium mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{module.title}</h3>
                      {/* <p className="text-sm text-muted-foreground">
                        {module.duration}
                      </p> */}
                    </div>
                    {isEnrolled ? (
                      <Badge
                        variant={
                          index < completedModules ? "default" : "outline"
                        }
                      >
                        {index < completedModules ? "Completed" : "Not Started"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Enroll to Access</Badge>
                    )}
                  </div>
                ))}
              </div>

              {isEnrolled && progress < 100 && (
                <div className="flex justify-center mt-6">
                  <button
                    className="text-primary hover:underline"
                    onClick={() => {
                      const newCompletedModules = Math.min(
                        completedModules + 1,
                        course.moduleCount
                      );
                      const newProgress = Math.round(
                        (newCompletedModules / course.moduleCount) * 100
                      );

                      setCompletedModules(newCompletedModules);
                      setProgress(newProgress);

                      localStorage.setItem(
                        `completed-${id}`,
                        newCompletedModules.toString()
                      );
                      localStorage.setItem(
                        `progress-${id}`,
                        newProgress.toString()
                      );
                    }}
                  >
                    Mark Next Module as Completed (Demo)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;