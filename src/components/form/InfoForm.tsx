"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useAppDispatch, useAppSelector, setBio } from "@/store";
import { BioFormValues } from "@/types";
import { useEffect, useState } from "react";
import ProfileImageUpload from "@/components/shared/ProfileImageUpload";
import { darkModeClasses } from "@/lib/utils";

interface FormStep1Props {
  onNext: () => void;
}

export default function FormStep1({ onNext }: FormStep1Props) {
  const dispatch = useAppDispatch();
  const bioData = useAppSelector((state) => state.portfolio.bio);
  const [aboutLength, setAboutLength] = useState(0);

  const form = useForm<BioFormValues>({
    defaultValues: {
      name: bioData.name || "",
      tagline: bioData.tagline || "",
      about: bioData.about || "",
      profileImg: bioData.profileImg || "",
    },
  });

  // Update form values when bioData changes (after loading from DB)
  useEffect(() => {
    if (
      bioData.name ||
      bioData.tagline ||
      bioData.about ||
      bioData.profileImg
    ) {
      form.reset({
        name: bioData.name || "",
        tagline: bioData.tagline || "",
        about: bioData.about || "",
        profileImg: bioData.profileImg || "",
      });
      setAboutLength(bioData.about?.length || 0);
    }
  }, [bioData, form]);

  const onSubmit = (data: BioFormValues) => {
    dispatch(setBio(data));
    onNext();
  };

  // Update character count when about field changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "about") {
        setAboutLength(value.about?.length || 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleProfileImageChange = (url: string) => {
    form.setValue("profileImg", url);
  };

  return (
    <Card className={darkModeClasses.card}>
      <CardHeader>
        <CardTitle className={`text-2xl ${darkModeClasses.cardTitle}`}>
          Personal Information
        </CardTitle>
        <CardDescription className={darkModeClasses.cardDescription}>
          Tell us about yourself. This information will be displayed on your
          portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <ProfileImageUpload
                currentImageUrl={form.watch("profileImg")}
                onImageUrlChange={handleProfileImageChange}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Name is required",
                maxLength: {
                  value: 50,
                  message: "Name must be less than 50 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkModeClasses.formLabel}>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className={darkModeClasses.input}
                    />
                  </FormControl>
                  <FormDescription className={darkModeClasses.formDescription}>
                    Your full name as you want it to appear on your portfolio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              rules={{
                maxLength: {
                  value: 100,
                  message: "Tagline must be less than 100 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkModeClasses.formLabel}>
                    Tagline
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Frontend Developer | UI/UX Designer"
                      {...field}
                      className={darkModeClasses.input}
                    />
                  </FormControl>
                  <FormDescription className={darkModeClasses.formDescription}>
                    A short phrase that describes what you do (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              rules={{
                required: "About is required",
                maxLength: {
                  value: 2000,
                  message: "About must be less than 2000 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkModeClasses.formLabel}>
                    About
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I'm a passionate developer with 5 years of experience..."
                      className={`min-h-32 ${darkModeClasses.textarea}`}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setAboutLength(e.target.value.length);
                      }}
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription
                      className={darkModeClasses.formDescription}
                    >
                      A brief description about yourself.
                    </FormDescription>
                    <p
                      className={`text-xs ${
                        aboutLength > 2000
                          ? "text-red-500"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {aboutLength}/2000
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className={darkModeClasses.buttonPrimary}>
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
