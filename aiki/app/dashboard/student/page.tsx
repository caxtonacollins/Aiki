import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, FileText, Calendar } from "lucide-react";

const StudentDashboard = () => {
  // Mock data for courses
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      progress: 75,
      instructor: "John Smith",
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      progress: 45,
      instructor: "Sarah Johnson",
    },
    {
      id: 3,
      title: "Building with Blockchain",
      progress: 20,
      instructor: "Michael Lee",
    },
  ];

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "JavaScript Assignment",
      course: "Introduction to Web Development",
      dueDate: "Tomorrow at 11:59 PM",
    },
    {
      id: 2,
      title: "React Project",
      course: "Advanced React Patterns",
      dueDate: "In 3 days",
    },
    {
      id: 3,
      title: "Quiz 2",
      course: "Building with Blockchain",
      dueDate: "Next Monday",
    },
  ];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Enrolled Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">2 in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12h 30m</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Course Progress</CardTitle>
            <CardDescription>
              Track your progress in enrolled courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.progress}%
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Instructor: {course.instructor}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Don&apos;t miss these important dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{deadline.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {deadline.course}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-destructive">
                    {deadline.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentDashboard;
