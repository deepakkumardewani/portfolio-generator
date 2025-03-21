"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector, setSkills } from "@/store";
import { SkillsFormValues } from "@/types";
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

  const { setValue, watch } = form;
  const skills = watch("skills");

  const addSkill = (skillName: string) => {
    if (skillName && !skills.some((skill) => skill.value === skillName)) {
      const updatedSkills = [
        ...skills,
        { value: skillName, label: skillName, image: "", category: "" },
      ];
      setValue("skills", updatedSkills);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(
      (skill) => skill.value !== skillToRemove
    );
    setValue("skills", updatedSkills);
  };

  const onSubmit = (data: SkillsFormValues) => {
    dispatch(setSkills(data.skills));
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Technical Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SkillSelector
              selectedSkills={skills.map((skill) => skill.value)}
              onSkillAdd={addSkill}
              onSkillRemove={removeSkill}
            />

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
