import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { toast } from "sonner";

const languages = [
  { id: "english", name: "English", code: "en" },
  { id: "hausa", name: "Hausa", code: "ha" },
  { id: "yoruba", name: "Yoruba", code: "yo" },
  { id: "igbo", name: "Igbo", code: "ig" },
];

const LanguageSettings = () => {
  // In a real application, this initial value would come from a context or state management
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);

    // Here you would integrate with an AI language model for translation
    // For now, we'll just show a toast notification
    toast("Language Updated", {
      description: `Your preferred language has been set to ${
        languages.find((lang) => lang.id === language)?.name || language
      }.`,
    });

    // Save preference to localStorage for persistence
    localStorage.setItem("preferredLanguage", language);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Language</h3>
        <RadioGroup
          defaultValue={selectedLanguage}
          onValueChange={handleLanguageChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent"
            >
              <RadioGroupItem value={language.id} id={language.id} />
              <Label
                htmlFor={language.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Globe className="h-5 w-5" />
                <span>{language.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-4">
          Selecting a language will translate the interface using AI language
          models. This feature is currently in development and will be fully
          implemented soon.
        </p>
      </div>
    </div>
  );
};

export default LanguageSettings;
