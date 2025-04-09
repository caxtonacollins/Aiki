import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { GitHubIssue, IssueApplication } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const applicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  experience: z
    .string()
    .min(1, { message: "Please select your experience level" }),
  timeCommitment: z
    .string()
    .min(1, { message: "Please select your time commitment" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface IssueApplicationFormProps {
  projectId: string;
  issue: GitHubIssue;
  onSuccess: () => void;
}

const IssueApplicationForm = ({
  projectId,
  issue,
  onSuccess,
}: IssueApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: "",
      timeCommitment: "",
      message: "",
    },
  });

  const onSubmit = (data: ApplicationFormValues) => {
    setIsSubmitting(true);

    // This would be replaced with actual submission logic
    setTimeout(() => {
      // Create a mock application
      const application: IssueApplication = {
        id: Math.random().toString(36).substring(2, 11),
        userId: "user-123", // This would come from auth
        issueId: issue.id,
        projectId,
        status: "pending",
        message: data.message,
        created_at: new Date().toISOString(),
        experience: data.experience,
        timeCommitment: data.timeCommitment,
        userName: data.name,
        userEmail: data.email,
      };

      console.log("Application submitted:", application);

      setIsSubmitting(false);
      toast("Application Submitted", {
        description: "Your application has been submitted successfully.",
      });

      onSuccess();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">
                    Beginner (&lt; 1 year)
                  </SelectItem>
                  <SelectItem value="intermediate">
                    Intermediate (1-3 years)
                  </SelectItem>
                  <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeCommitment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Commitment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low (1-4 hours/week)</SelectItem>
                  <SelectItem value="medium">
                    Medium (5-10 hours/week)
                  </SelectItem>
                  <SelectItem value="high">High (10+ hours/week)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why you&apos;d like to work on this issue</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your interest in this issue and any relevant experience..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button className="bg-sky-400" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default IssueApplicationForm;
