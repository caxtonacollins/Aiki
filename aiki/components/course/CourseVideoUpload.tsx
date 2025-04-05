
import { useState } from "react";
import { Upload, Video, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
const CourseVideoUpload = ({ courseId }: { courseId: string }) => {
  const [videos, setVideos] = useState<{ title: string; file: File | null }[]>([
    { title: "Introduction to the Course", file: null },
    { title: "Key Concepts Overview", file: null }
  ]);
  const [newVideoTitle, setNewVideoTitle] = useState("");

  const handleFileChange = (index: number, file: File | null) => {
    const updatedVideos = [...videos];
    updatedVideos[index].file = file;
    setVideos(updatedVideos);
    
    toast("Video selected", {
      description: `${file?.name} will be uploaded when you save changes`,
    });
  };

  const addNewVideo = () => {
    if (!newVideoTitle.trim()) {
      toast("Please provide a title", {
        description: "Video title cannot be empty",
      });
      return;
    }
    
    setVideos([...videos, { title: newVideoTitle, file: null }]);
    setNewVideoTitle("");
    
    toast("Video section added", {
      description: "Now you can upload a video for this section",
    });
  };

  const removeVideo = (index: number) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Videos</h2>
        <Button>Save All Changes</Button>
      </div>
      
      <div className="space-y-4">
        {videos.map((video, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{video.title}</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeVideo(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6 border-2 border-dashed rounded-lg bg-muted/50 flex flex-col items-center justify-center gap-2">
              {video.file ? (
                <>
                  <Video className="w-12 h-12 text-primary" />
                  <p className="text-sm">{video.file.name}</p>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileChange(index, null)}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your video here, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id={`video-upload-${index}`}
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                  />
                  <Label
                    htmlFor={`video-upload-${index}`}
                    className="mt-2 cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Upload Video
                  </Label>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Add New Video Section</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Video title"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
          />
          <Button onClick={addNewVideo}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoUpload;
