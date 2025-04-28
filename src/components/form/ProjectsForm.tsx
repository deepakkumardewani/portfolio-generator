"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector, addProject } from "@/store";
import { Icons } from "@/components/ui/icons";
import { ProjectsFormValues, Skill } from "@/types";
import SkillSelector from "@/components/shared/SkillSelector";
import ImageUpload from "@/components/shared/ImageUpload";
import { darkModeClasses } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { AIDescriptionDialog } from "@/components/AIDescriptionDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormStep4Props {
  onNext: () => void;
  onBack: () => void;
}

export default function FormStep4({ onNext, onBack }: FormStep4Props) {
  const dispatch = useAppDispatch();
  const savedProjects = useAppSelector((state) => state.portfolio.projects);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [descriptionLengths, setDescriptionLengths] = useState<number[]>([]);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

  const form = useForm<ProjectsFormValues>({
    defaultValues: {
      projects:
        savedProjects.length > 0
          ? savedProjects
          : [
              {
                title: "",
                description: "",
                imageUrl: "",
                link: "",
                githubUrl: "",
                technologies: [],
              },
            ],
    },
  });

  useEffect(() => {
    if (savedProjects.length > 0) {
      form.reset({
        projects: savedProjects,
      });

      // Initialize description lengths
      const lengths: number[] = [];
      savedProjects.forEach((project, index) => {
        lengths[index] = project.description?.length || 0;
      });
      setDescriptionLengths(lengths);
    }
  }, [savedProjects, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onSubmit = (data: ProjectsFormValues) => {
    dispatch(addProject(data.projects));
    onNext();
  };

  const validateUrl = (value: string | undefined) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch (_) {
      return "Please enter a valid URL";
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const addSkill = (index: number, skill: Skill) => {
    if (!skill) return;

    const currentTechnologies =
      form.getValues(`projects.${index}.technologies`) || [];
    if (!currentTechnologies.includes(skill.value)) {
      form.setValue(`projects.${index}.technologies`, [
        ...currentTechnologies,
        skill.value,
      ]);
    }
  };

  const removeSkill = (index: number, skillValue: string) => {
    const currentTechnologies =
      form.getValues(`projects.${index}.technologies`) || [];
    form.setValue(
      `projects.${index}.technologies`,
      currentTechnologies.filter((tech) => tech !== skillValue)
    );
  };

  const handleImageUrlChange = (index: number, url: string) => {
    form.setValue(`projects.${index}.imageUrl`, url);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newLengths = [...descriptionLengths];
    newLengths[index] = value.length;
    setDescriptionLengths(newLengths);
  };

  const handleAIGeneration = (description: string) => {
    if (currentEditingIndex !== null) {
      form.setValue(`projects.${currentEditingIndex}.description`, description);
      handleDescriptionChange(currentEditingIndex, description);
    }
  };

  return (
    <Card className={darkModeClasses.card}>
      <CardHeader>
        <CardTitle className={`text-2xl ${darkModeClasses.cardTitle}`}>
          Projects
        </CardTitle>
        <CardDescription className={darkModeClasses.cardDescription}>
          Showcase your best projects and portfolio pieces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <h3 className={`font-medium ${darkModeClasses.heading}`}>
                    {form.watch(`projects.${index}.title`) ||
                      `Project ${index + 1}`}
                  </h3>
                  <div className="flex items-center">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-stone-100 dark:hover:bg-stone-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                          if (expandedIndex === index) {
                            setExpandedIndex(Math.max(0, index - 1));
                          }
                        }}
                      >
                        <Icons.trash className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                    {expandedIndex === index ? (
                      <Icons.chevronUpIcon
                        className={`h-5 w-5 ${darkModeClasses.text}`}
                      />
                    ) : (
                      <Icons.chevronDownIcon
                        className={`h-5 w-5 ${darkModeClasses.text}`}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`space-y-4 mt-4 px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndex === index
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <FormField
                    control={form.control}
                    name={`projects.${index}.title`}
                    rules={{
                      required: "Project title is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkModeClasses.formLabel}>
                          Project Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="My Awesome Project"
                            {...field}
                            className={darkModeClasses.input}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    rules={{
                      required: "Project description is required",
                      maxLength: {
                        value: 2000,
                        message:
                          "Description must be less than 2000 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className={darkModeClasses.formLabel}>
                          Description
                        </FormLabel>
                        <div className="relative">
                          <TooltipProvider>
                            <Tooltip delayDuration={500}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  className="absolute right-2 bottom-2 z-10"
                                  onClick={() => {
                                    setCurrentEditingIndex(index);
                                    setIsAIDialogOpen(true);
                                  }}
                                >
                                  <Sparkles className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Generate project description with AI
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <FormControl>
                            <Textarea
                              placeholder="A brief description of your project"
                              className={`min-h-24 ${darkModeClasses.textarea}`}
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleDescriptionChange(index, e.target.value);
                              }}
                            />
                          </FormControl>
                        </div>
                        <div className="flex justify-end">
                          <p
                            className={`text-xs ${
                              (descriptionLengths[index] || 0) > 2000
                                ? "text-red-500"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {descriptionLengths[index] || 0}/2000
                          </p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h3
                      className={`text-sm font-medium ${darkModeClasses.formLabel}`}
                    >
                      Project Image
                    </h3>
                    <ImageUpload
                      currentImageUrl={form.watch(`projects.${index}.imageUrl`)}
                      onImageUrlChange={(url: string) =>
                        handleImageUrlChange(index, url)
                      }
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`projects.${index}.link`}
                    rules={{
                      validate: validateUrl,
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkModeClasses.formLabel}>
                          Live Demo URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://myproject.com"
                            {...field}
                            className={darkModeClasses.input}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.githubUrl`}
                    rules={{
                      validate: validateUrl,
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkModeClasses.formLabel}>
                          GitHub Repository (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/yourusername/project"
                            {...field}
                            className={darkModeClasses.input}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className={`space-y-4 ${darkModeClasses.formLabel}`}>
                    <SkillSelector
                      selectedSkills={
                        form.watch(`projects.${index}.technologies`) || []
                      }
                      onSkillAdd={(skill) => addSkill(index, skill)}
                      onSkillRemove={(skillValue) =>
                        removeSkill(index, skillValue)
                      }
                      label="Technologies Used"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  imageUrl: "",
                  link: "",
                  githubUrl: "",
                  technologies: [],
                })
              }
              className={`w-full ${darkModeClasses.buttonOutline}`}
            >
              <Icons.plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className={darkModeClasses.buttonOutline}
              >
                Back
              </Button>
              <Button type="submit" className={darkModeClasses.buttonPrimary}>
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <AIDescriptionDialog
        open={isAIDialogOpen}
        onOpenChange={setIsAIDialogOpen}
        onDescriptionGenerated={handleAIGeneration}
        fieldLabel="project_description"
      />
    </Card>
  );
}
