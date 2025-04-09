"use client"

import { useState } from "react";
import {
  ExternalLink,
  GitPullRequest,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GitHubIssue } from "@/types";
import IssueApplicationForm from "./IssueApplicationForm";
import { mockIssues } from "@/mocks/IssuesData";

interface GitHubIssuesProps {
  projectId: string;
  repoUrl?: string;
}

const GitHubIssues = ({ projectId, repoUrl }: GitHubIssuesProps) => {
  const [selectedIssue, setSelectedIssue] = useState<GitHubIssue | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  // This would be replaced with actual data fetching

  const handleApplyClick = (issue: GitHubIssue) => {
    setSelectedIssue(issue);
    setIsApplicationOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Open Issues</h2>
        {repoUrl && (
          <Button asChild variant="outline" size="sm">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <GitPullRequest className="w-4 h-4 mr-2" />
              View Repository
            </a>
          </Button>
        )}
      </div>

      {mockIssues.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              No open issues found for this project.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {mockIssues.map((issue) => (
            <Card key={issue.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    <span className="text-muted-foreground font-normal">
                      #{issue.number}
                    </span>{" "}
                    {issue.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(issue.difficulty)}>
                    {issue.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {issue.body}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {issue.labels.map((label) => (
                    <Badge
                      key={label.id}
                      variant="outline"
                      style={{
                        borderColor: `#${label.color}`,
                        color: `#${label.color}`,
                      }}
                    >
                      {label.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{issue.estimated_time}</span>
                  </div>
                  <div>
                    Created {new Date(issue.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    View on GitHub
                  </a>
                </Button>
                <Button
                  onClick={() => handleApplyClick(issue)}
                  size="sm"
                  className="bg-sky-400"
                >
                  Apply
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gray-800">
          <DialogHeader>
            <DialogTitle>Apply for Issue</DialogTitle>
            <DialogDescription>
              {selectedIssue
                ? `#${selectedIssue.number}: ${selectedIssue.title}`
                : ""}
            </DialogDescription>
          </DialogHeader>

          {selectedIssue && (
            <IssueApplicationForm
              projectId={projectId}
              issue={selectedIssue}
              onSuccess={() => setIsApplicationOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GitHubIssues;
