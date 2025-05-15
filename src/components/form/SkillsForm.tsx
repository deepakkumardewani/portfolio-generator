"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector, setSkills } from "@/store";
import { Skill, SkillsFormValues } from "@/types";
import SkillSelector from "@/components/shared/SkillSelector";

interface FormStep2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function FormStep2({ onNext, onBack }: FormStep2Props) {
  const dispatch = useAppDispatch();
  const savedSkills = useAppSelector((state) => state.portfolio.skills);

  const form = useForm<SkillsFormValues>({
    defaultValues: {
      skills: savedSkills || [],
    },
  });

  // Update form values when savedSkills changes
  useEffect(() => {
    if (savedSkills.length > 0) {
      form.reset({
        skills: savedSkills,
      });
    }
  }, [savedSkills, form]);

  const {
    setValue,
    watch,
    formState: { errors },
  } = form;
  const skills = watch("skills");

  const addSkill = (skill: Skill) => {
    if (skill && !skills.some((s) => s.value === skill.value)) {
      const updatedSkills = [...skills, skill];
      setValue("skills", updatedSkills, { shouldValidate: true });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(
      (skill) => skill.value !== skillToRemove
    );
    setValue("skills", updatedSkills, { shouldValidate: true });
  };

  const onSubmit = (data: SkillsFormValues) => {
    if (data.skills.length === 0) {
      form.setError("skills", {
        type: "manual",
        message: "Please add at least one skill",
      });
      return;
    }
    dispatch(setSkills(data.skills));
    onNext();
  };

  return (
    <Card className="dark:bg-neutral-950 dark:border-neutral-800">
      <CardHeader>
        <CardTitle className="text-2xl dark:text-neutral-50">
          Technical Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <SkillSelector
                selectedSkills={skills.map((skill) => skill.value)}
                onSkillAdd={addSkill}
                onSkillRemove={removeSkill}
              />
              {errors.skills && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {errors.skills.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="dark:border-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
