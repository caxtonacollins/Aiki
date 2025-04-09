"use client";

import { useParams } from "next/navigation";
import CourseVideoUpload from "@/components/course/CourseVideoUpload";

export default function Videos() {
  const params = useParams<{ id: string }>();
  const courseId = params.id as string;

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <CourseVideoUpload courseId={courseId} />
    </div>
  );
}
