import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseEnrollment } from "@/types";
import { toast } from "sonner";

interface CourseEnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
  onEnrollmentChange?: (isEnrolled: boolean) => void;
}

const CourseEnrollButton = ({
  courseId,
  isEnrolled = false,
  onEnrollmentChange,
}: CourseEnrollButtonProps) => {
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(isEnrolled);

  const handleEnrollClick = () => {
    setEnrolling(true);

    // This would be replaced with actual enrollment logic
    setTimeout(() => {
      // Create a mock enrollment
      const enrollment: CourseEnrollment = {
        id: Math.random().toString(36).substring(2, 11),
        userId: "user-123", // This would come from auth
        courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completed: false,
        lastActivityAt: new Date().toISOString(),
      };

      console.log("Course enrollment:", enrollment);

      setEnrolling(false);
      setEnrolled(true);

      if (onEnrollmentChange) {
        onEnrollmentChange(true);
      }

      toast("Successfully Enrolled", {
        description: "You have been enrolled in this course.",
      });
    }, 1000);
  };

  const handleUnenrollClick = () => {
    setEnrolling(true);

    // This would be replaced with actual unenrollment logic
    setTimeout(() => {
      console.log("Unenrolled from course:", courseId);

      setEnrolling(false);
      setEnrolled(false);

      if (onEnrollmentChange) {
        onEnrollmentChange(false);
      }

      toast("Unenrolled", {
        description: "You have been unenrolled from this course.",
      });
    }, 1000);
  };

  return enrolled ? (
    <Button
      variant="outline"
      onClick={handleUnenrollClick}
      disabled={enrolling}
      className="w-full"
    >
      {enrolling ? "Processing..." : "Unenroll from Course"}
    </Button>
  ) : (
    <Button onClick={handleEnrollClick} disabled={enrolling} className="w-full">
      {enrolling ? "Enrolling..." : "Enroll in Course"}
    </Button>
  );
};

export default CourseEnrollButton;
