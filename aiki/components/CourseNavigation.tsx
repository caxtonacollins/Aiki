import { cn } from "@/lib/utils";
import { Book, Video, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";

type NavItem = {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
};

const CourseNavigation = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const navItems: NavItem[] = [
    {
      id: 1,
      title: "Overview",
      value: "overview",
      icon: <Book className="w-4 h-4" />,
    },
    {
      id: 2,
      title: "Videos",
      value: "videos",
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: 3,
      title: "Text",
      value: "text",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 4,
      title: "Diagrams",
      value: "diagrams",
      icon: <ImageIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-card border border-sky-400 rounded-lg p-2 mb-6">
      <nav className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => setActiveTab(item.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              activeTab === item.value
                ? "bg-sky-400 text-primary-foreground"
                : "hover:bg-primary/20 hover:text-primary"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default CourseNavigation;
