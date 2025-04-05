import { Task } from "@/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card className="shadow-sm hover:border-primary/30 transition-colors duration-200 dark:hover:shadow-sky-200/5 p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{task.title}</h4>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            task.difficulty === "beginner"
              ? "bg-green-100 text-green-800"
              : task.difficulty === "intermediate"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {task.difficulty}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {task.techStack.map((tech: string, index: number) => (
          <span
            key={index}
            className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{task.estimatedTime}</span>
        <Button variant="outline" size="sm" className="h-8 outline-sky-400">
          Start Task
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;