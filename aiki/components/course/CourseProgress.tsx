import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, BookOpen } from "lucide-react";

interface CourseProgressProps {
  progress: number;
  moduleCount: number;
  completedModules: number;
  estimatedHours: number;
}

const CourseProgress = ({
  progress,
  moduleCount,
  completedModules,
  estimatedHours,
}: CourseProgressProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>{progress}% Complete</span>
              <span>
                {completedModules}/{moduleCount} modules
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <div className="text-sm">
                <p className="font-medium">{moduleCount} Modules</p>
                <p className="text-xs text-muted-foreground">Total in course</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <div className="text-sm">
                <p className="font-medium">{estimatedHours} Hours</p>
                <p className="text-xs text-muted-foreground">Estimated time</p>
              </div>
            </div>
          </div>

          {progress === 100 && (
            <div className="flex items-center justify-center p-2 bg-green-50 rounded-md">
              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-600">
                Course Completed!
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;
