"use client";

import { useState } from "react";
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
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { ProjectsFormValues } from "@/types";
import SkillSelector from "@/components/shared/SkillSelector";
import ImageUpload from "@/components/shared/ImageUpload";

interface FormStep4Props {
  onNext: () => void;
  onBack: () => void;
}

export default function FormStep4({ onNext, onBack }: FormStep4Props) {
  const dispatch = useAppDispatch();
  const savedProjects = useAppSelector((state) => state.portfolio.projects);
  const [expandedIndex, setExpandedIndex] = useState(0);

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
    } catch (e) {
      return "Please enter a valid URL";
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const addSkill = (index: number, skill: string) => {
    if (!skill) return;

    const currentTechnologies =
      form.getValues(`projects.${index}.technologies`) || [];
    if (!currentTechnologies.includes(skill)) {
      form.setValue(`projects.${index}.technologies`, [
        ...currentTechnologies,
        skill,
      ]);
    }
  };

  const removeSkill = (index: number, skillToRemove: string) => {
    const currentTechnologies =
      form.getValues(`projects.${index}.technologies`) || [];
    form.setValue(
      `projects.${index}.technologies`,
      currentTechnologies.filter((tech) => tech !== skillToRemove)
    );
  };

  const handleImageUrlChange = (index: number, url: string) => {
    form.setValue(`projects.${index}.imageUrl`, url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Projects</CardTitle>
        <CardDescription>
          Add the projects you want to showcase in your portfolio.
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
                  <h3 className="font-medium">
                    {form.watch(`projects.${index}.title`) ||
                      `Project ${index + 1}`}
                  </h3>
                  <div className="flex items-center">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                          if (expandedIndex === index) {
                            setExpandedIndex(Math.max(0, index - 1));
                          }
                        }}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                    {expandedIndex === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <div
                  className={`space-y-4 mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndex === index
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <FormField
                    control={form.control}
                    name={`projects.${index}.title`}
                    rules={{
                      required: "Title is required",
                      maxLength: {
                        value: 50,
                        message: "Title must be less than 50 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E-commerce Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    rules={{
                      required: "Description is required",
                      maxLength: {
                        value: 150,
                        message: "Description must be less than 150 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A responsive e-commerce website built with React and Node.js"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <SkillSelector
                    selectedSkills={
                      form.watch(`projects.${index}.technologies`) || []
                    }
                    onSkillAdd={(skill) => addSkill(index, skill)}
                    onSkillRemove={(skill) => removeSkill(index, skill)}
                    label="Technologies Used"
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Image</FormLabel>
                        <FormControl>
                          <div>
                            <ImageUpload
                              currentImageUrl={field.value}
                              onImageUrlChange={(url) =>
                                handleImageUrlChange(index, url)
                              }
                            />
                            <div className="mt-2">
                              <Input
                                placeholder="Or enter image URL manually"
                                {...field}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.link`}
                    rules={{
                      validate: validateUrl,
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
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
                        <FormLabel>GitHub Repository URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/username/repo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Project
            </Button>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
