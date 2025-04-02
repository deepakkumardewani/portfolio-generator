"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormLabel } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { TECHNICAL_SKILLS } from "@/utils/constants";
import { cn, darkModeClasses } from "@/lib/utils";

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillAdd: (skill: string) => void;
  onSkillRemove: (skill: string) => void;
  label?: string;
  showCustomSkillInput?: boolean;
}

export default function SkillSelector({
  selectedSkills,
  onSkillAdd,
  onSkillRemove,
  label = "Technical Skills",
  showCustomSkillInput = true,
}: SkillSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const addSkill = (skillName: string) => {
    if (skillName && !selectedSkills.includes(skillName)) {
      onSkillAdd(skillName);
      setSelectedSkill("");
      setCustomSkill("");
    }
  };

  return (
    <div className="space-y-4">
      {label && (
        <FormLabel className={darkModeClasses.formLabel}>{label}</FormLabel>
      )}
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between ${darkModeClasses.buttonOutline}`}
            >
              {selectedSkill
                ? TECHNICAL_SKILLS.find(
                    (skill) => skill.value === selectedSkill
                  )?.label
                : "Select a skill..."}
              <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search skills..." />
              <CommandList>
                <CommandEmpty>No skill found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {TECHNICAL_SKILLS.map((skill) => (
                    <CommandItem
                      key={skill.value}
                      value={skill.value}
                      onSelect={(currentValue: string) => {
                        const value =
                          currentValue === selectedSkill ? "" : currentValue;
                        setSelectedSkill(value);
                        if (value) addSkill(value);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 relative">
                          <img src={skill.image} alt={skill.value} />
                        </div>
                        {skill.label}
                      </div>
                      <Icons.checkIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedSkill === skill.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {showCustomSkillInput && (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add a custom skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill(customSkill);
              }
            }}
            className={darkModeClasses.input}
          />
          <Button
            type="button"
            onClick={() => addSkill(customSkill)}
            disabled={!customSkill}
            className={darkModeClasses.buttonPrimary}
          >
            Add
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedSkills.map((skill) => {
          const skillObj = TECHNICAL_SKILLS.find((s) => s.value === skill);
          return (
            <div
              key={skill}
              className="flex items-center gap-2 px-3 py-1 bg-primary/10 dark:bg-neutral-900 rounded-full"
            >
              {skillObj?.image && (
                <div className="h-4 w-4 relative">
                  <img src={skillObj.image} alt={skill} />
                </div>
              )}
              <span className={darkModeClasses.text}>{skill}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => onSkillRemove(skill)}
              >
                <Icons.x className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
