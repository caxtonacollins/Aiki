"use client";

import CourseTextUpload from "@/components/course/CourseTextUpload";
import { useParams } from "next/navigation";

export default function Text() {
  const params = useParams<{ id: string }>();
  const courseId = params.id as string;

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <CourseTextUpload courseId={courseId} />
    </div>
  );
}
