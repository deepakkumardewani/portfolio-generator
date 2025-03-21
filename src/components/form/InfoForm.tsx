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

interface FormStep1Props {
  onNext: () => void;
}

export default function FormStep1({ onNext }: FormStep1Props) {
  const dispatch = useAppDispatch();
  const bioData = useAppSelector((state) => state.portfolio.bio);

  const form = useForm<BioFormValues>({
    defaultValues: {
      name: bioData.name || "",
      tagline: bioData.tagline || "",
      about: bioData.about || "",
    },
  });

  const onSubmit = (data: BioFormValues) => {
    dispatch(setBio(data));
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself. This information will be displayed on your
          portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
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
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Frontend Developer | UI/UX Designer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
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
                  value: 200,
                  message: "About must be less than 200 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I'm a passionate developer with 5 years of experience..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description about yourself.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
