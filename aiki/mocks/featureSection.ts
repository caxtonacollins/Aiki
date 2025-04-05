import { Feature } from "@/types";
import {
  Brain,
  GraduationCap,
  BookOpen,
  Users,
  Code,
  Shield,
} from "lucide-react";

export const features: Feature[] = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Adaptive content that adjusts to your skill level and learning pace with instant, personalized feedback.",
  },
  {
    icon: Shield,
    title: "On-Chain Verification",
    description:
      "All course completions and certificates are stored on-chain, ensuring they're immutable and verifiable.",
  },
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description:
      "Engage with hands-on coding challenges, real-time feedback, and adaptive tasks that evolve with your skills.",
  },
  {
    icon: Code,
    title: "Project-Based Learning",
    description:
      "Apply your knowledge to real-world projects and build a portfolio of work that showcases your abilities.",
  },
  {
    icon: Users,
    title: "Global Community",
    description:
      "Connect with learners worldwide through forums, collaboration opportunities, and peer code reviews.",
  },
  {
    icon: GraduationCap,
    title: "Recognized Credentials",
    description:
      "Earn certificates and badges that are recognized by employers and can be shared across platforms.",
  },
];
