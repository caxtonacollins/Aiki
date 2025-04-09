import { cn } from "@/lib/utils";
import { Briefcase, CheckSquare, FileCog, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  id: number;
  title: string;
  path: string;
  icon: React.ReactNode;
};

const ProjectNavigation = ({ projectId }: { projectId: string }) => {
  const location = usePathname();

  const navItems: NavItem[] = [
    {
      id: 1,
      title: "Overview",
      path: `/projects/${projectId}`,
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 2,
      title: "Tasks",
      path: `/projects/${projectId}/tasks`,
      icon: <CheckSquare className="w-4 h-4" />,
    },
    {
      id: 3,
      title: "Resources",
      path: `/projects/${projectId}/resources`,
      icon: <FileCog className="w-4 h-4" />,
    },
    {
      id: 4,
      title: "Team",
      path: `/projects/${projectId}/team`,
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-card border rounded-lg p-2 mb-6">
      <nav className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              location === item.path
                ? "bg-sky-400 text-primary-foreground"
                : "hover:bg-primary/20 hover:text-primary"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProjectNavigation;
