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
import { useAppDispatch, useAppSelector, setWorkExperience } from "@/store";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { WorkExperienceFormValues } from "@/types";
import SkillSelector from "@/components/shared/SkillSelector";
import { Checkbox } from "@/components/ui/checkbox";

interface FormStep3Props {
  onNext: () => void;
  onBack: () => void;
}

export default function FormStep3({ onNext, onBack }: FormStep3Props) {
  const dispatch = useAppDispatch();
  const savedWorkExperience = useAppSelector(
    (state) => state.portfolio.workExperience
  );
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isStudent, setIsStudent] = useState(false);

  const form = useForm<WorkExperienceFormValues>({
    defaultValues: {
      workExperience:
        savedWorkExperience.length > 0
          ? savedWorkExperience
          : [
              {
                company: "",
                jobTitle: "",
                skills: [],
                fromDate: "",
                toDate: "",
                description: "",
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const onSubmit = (data: WorkExperienceFormValues) => {
    // If student has no work experience, save an empty array
    dispatch(setWorkExperience(isStudent ? [] : data.workExperience));
    onNext();
  };

  const addSkill = (index: number, skill: string) => {
    if (!skill) return;

    const currentSkills =
      form.getValues(`workExperience.${index}.skills`) || [];
    if (!currentSkills.includes(skill)) {
      form.setValue(`workExperience.${index}.skills`, [
        ...currentSkills,
        skill,
      ]);
    }
  };

  const removeSkill = (index: number, skillToRemove: string) => {
    const currentSkills =
      form.getValues(`workExperience.${index}.skills`) || [];
    form.setValue(
      `workExperience.${index}.skills`,
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const handleStudentCheckboxChange = (checked: boolean) => {
    setIsStudent(checked);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Work Experience</CardTitle>
        <CardDescription>
          Add your work experience to showcase in your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center space-x-2">
          <Checkbox
            id="student"
            checked={isStudent}
            onCheckedChange={handleStudentCheckboxChange}
          />
          <label
            htmlFor="student"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I am a student with no work experience
          </label>
        </div>

        {!isStudent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md relative">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <h3 className="font-medium">
                      {form.watch(`workExperience.${index}.company`) ||
                        form.watch(`workExperience.${index}.jobTitle`) ||
                        `Work Experience ${index + 1}`}
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
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`workExperience.${index}.company`}
                        rules={{
                          required: "Company name is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`workExperience.${index}.jobTitle`}
                        rules={{
                          required: "Job title is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Software Engineer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`workExperience.${index}.fromDate`}
                        rules={{
                          required: "Start date is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`workExperience.${index}.toDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                placeholder="Present"
                                {...field}
                              />
                            </FormControl>
                            {/* <FormDescription>
                              Leave empty for current position
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <SkillSelector
                      selectedSkills={
                        form.watch(`workExperience.${index}.skills`) || []
                      }
                      onSkillAdd={(skill) => addSkill(index, skill)}
                      onSkillRemove={(skill) => removeSkill(index, skill)}
                      label="Technical Skills Used"
                    />

                    <FormField
                      control={form.control}
                      name={`workExperience.${index}.description`}
                      rules={{
                        required: "Description is required",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements"
                              className="min-h-24"
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
                    company: "",
                    jobTitle: "",
                    skills: [],
                    fromDate: "",
                    toDate: "",
                    description: "",
                  })
                }
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Another Work Experience
              </Button>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              type="button"
              onClick={() => onSubmit({ workExperience: [] })}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
