
import { useState } from "react";
import { FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CourseTextUpload = ({ courseId }: { courseId: string }) => {
  const [textSections, setTextSections] = useState<{ title: string; content: string }[]>([
    { title: "Course Introduction", content: "Welcome to the course. This introduction covers what you'll learn." },
    { title: "Course Prerequisites", content: "Before starting this course, you should be familiar with the following concepts..." }
  ]);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const updateSectionContent = (index: number, content: string) => {
    const updatedSections = [...textSections];
    updatedSections[index].content = content;
    setTextSections(updatedSections);
  };

  const addNewSection = () => {
    if (!newSectionTitle.trim()) {
      toast("Please provide a title",{
        description: "Section title cannot be empty",
      });
      return;
    }
    
    setTextSections([...textSections, { title: newSectionTitle, content: "" }]);
    setNewSectionTitle("");
    
    toast("Text section added", {
      description: "Now you can add content to this section",
    });
  };

  const removeSection = (index: number) => {
    const updatedSections = [...textSections];
    updatedSections.splice(index, 1);
    setTextSections(updatedSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Text Content</h2>
        <Button>Save All Changes</Button>
      </div>
      
      <div className="space-y-4">
        {textSections.map((section, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-medium">{section.title}</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeSection(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Textarea
              value={section.content}
              onChange={(e) => updateSectionContent(index, e.target.value)}
              placeholder="Write section content here..."
              className="min-h-[150px]"
            />
          </div>
        ))}
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Add New Text Section</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Section title"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
          />
          <Button onClick={addNewSection}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseTextUpload;
