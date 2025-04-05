import { useEffect, useState } from "react";
import { Image as ImageIcon, Plus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
const CourseDiagramUpload = ({ courseId }: { courseId: string }) => {
  const [diagrams, setDiagrams] = useState<
    { title: string; file: File | null; previewUrl: string | null }[]
  >([
    {
      title: "Course Structure Overview",
      file: null,
      previewUrl:
        "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Concept Map",
      file: null,
      previewUrl:
        "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=400&auto=format&fit=crop",
    },
  ]);
  const [newDiagramTitle, setNewDiagramTitle] = useState("");

  useEffect(() => {
    console.log("Course ID:", courseId);
  }, [courseId]);

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) {
      const updatedDiagrams = [...diagrams];
      updatedDiagrams[index].file = null;
      updatedDiagrams[index].previewUrl = null;
      setDiagrams(updatedDiagrams);
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast("Invalid file type", {
        description: "Please upload an image file",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedDiagrams = [...diagrams];
      updatedDiagrams[index].file = file;
      updatedDiagrams[index].previewUrl = e.target?.result as string;
      setDiagrams(updatedDiagrams);
    };
    reader.readAsDataURL(file);

    toast("Diagram selected", {
      description: `${file.name} will be uploaded when you save changes`,
    });
  };

  const addNewDiagram = () => {
    if (!newDiagramTitle.trim()) {
      toast("Please provide a title", {
        description: "Diagram title cannot be empty",
      });
      return;
    }

    setDiagrams([
      ...diagrams,
      { title: newDiagramTitle, file: null, previewUrl: null },
    ]);
    setNewDiagramTitle("");

    toast("Diagram section added", {
      description: "Now you can upload an image for this diagram",
    });
  };

  const removeDiagram = (index: number) => {
    const updatedDiagrams = [...diagrams];
    updatedDiagrams.splice(index, 1);
    setDiagrams(updatedDiagrams);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Diagrams</h2>
        <Button>Save All Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diagrams.map((diagram, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                <h3 className="font-medium">{diagram.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDiagram(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 border-2 border-dashed rounded-lg bg-muted/50 flex flex-col items-center justify-center gap-2">
              {diagram.previewUrl ? (
                <>
                  <div className="w-full h-48 relative">
                    <Image
                      width={400}
                      height={400}
                      src={diagram.previewUrl}
                      alt={diagram.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileChange(index, null)}
                    >
                      Remove
                    </Button>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`diagram-change-${index}`}
                      onChange={(e) =>
                        handleFileChange(index, e.target.files?.[0] || null)
                      }
                    />
                    <Label
                      htmlFor={`diagram-change-${index}`}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer text-sm"
                    >
                      Change
                    </Label>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your diagram here, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`diagram-upload-${index}`}
                    onChange={(e) =>
                      handleFileChange(index, e.target.files?.[0] || null)
                    }
                  />
                  <Label
                    htmlFor={`diagram-upload-${index}`}
                    className="mt-2 cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Upload Diagram
                  </Label>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Add New Diagram</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Diagram title"
            value={newDiagramTitle}
            onChange={(e) => setNewDiagramTitle(e.target.value)}
          />
          <Button onClick={addNewDiagram}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDiagramUpload;
