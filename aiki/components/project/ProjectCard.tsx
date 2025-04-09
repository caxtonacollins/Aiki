import { useState } from "react";
import { ArrowRight, GitBranch, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  starsCount: number;
  forksCount: number;
  contributorsCount: number;
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  category,
  technologies,
  starsCount,
  forksCount,
  contributorsCount,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="rounded-xl overflow-hidden h-full flex flex-col p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          width={800}
          height={450}
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-xs mb-4">
          <div className="flex items-center">
            <Star className="w-3.5 h-3.5 mr-1" />
            {starsCount.toLocaleString()}
          </div>
          <div className="flex items-center">
            <GitBranch className="w-3.5 h-3.5 mr-1" />
            {forksCount.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1" />
            {contributorsCount.toLocaleString()}
          </div>
        </div>

        <Link
          href={`/projects/${id}`}
          className="flex items-center justify-center font-medium text-sm text-primary hover:text-primary/80 transition-colors mt-auto"
        >
          View Project
          <ArrowRight
            className="ml-2 w-4 h-4 transition-transform duration-300"
            style={{
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
            }}
          />
        </Link>
      </div>
    </Card>
  );
};

export default ProjectCard;
