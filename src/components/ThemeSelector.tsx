"use client";

import { useAppDispatch, useAppSelector, setTheme } from "@/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateType } from "@/types";
import { useTemplateSync, useUpdateTemplate } from "@/hooks/useTemplateSync";

export default function ThemeSelector() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.portfolio);
  const selectedTemplate = useTemplateSync();
  const updateTemplate = useUpdateTemplate();

  const handleThemeChange = (key: string, value: string) => {
    dispatch(
      setTheme({
        ...theme,
        [key]: value,
      })
    );
  };

  const handleTemplateChange = (value: TemplateType) => {
    updateTemplate(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customize</CardTitle>
        <CardDescription>Customize your portfolio appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <RadioGroup
            value={selectedTemplate}
            onValueChange={(value) =>
              handleTemplateChange(value as TemplateType)
            }
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Minimalist" id="minimalist" />
              <Label htmlFor="minimalist">Minimalist</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Basic" id="basic" />
              <Label htmlFor="basic">Basic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Creative" id="creative" />
              <Label htmlFor="creative">Creative</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="primaryColor"
              type="color"
              value={theme.primaryColor}
              onChange={(e) =>
                handleThemeChange("primaryColor", e.target.value)
              }
              className="w-12 h-10 p-1"
            />
            <Input
              value={theme.primaryColor}
              onChange={(e) =>
                handleThemeChange("primaryColor", e.target.value)
              }
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="layout">Layout</Label>
          <Select
            value={theme.layout}
            onValueChange={(value) => handleThemeChange("layout", value)}
          >
            <SelectTrigger id="layout">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Column</SelectItem>
              <SelectItem value="grid">Grid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
