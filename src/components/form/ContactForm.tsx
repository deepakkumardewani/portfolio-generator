"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAppDispatch, useAppSelector, setContact } from "@/store";
import { ContactFormValues } from "@/types";

interface FormStep5Props {
  onBack: () => void;
}

export default function FormStep5({ onBack }: FormStep5Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedContact = useAppSelector((state) => state.portfolio.contact);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      phone: savedContact.phone || "",
      email: savedContact.email || "",
      links: savedContact.links || [],
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    dispatch(setContact(data));
    router.push("/templates");
  };

  const validateUrl = (value: string) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch (_) {
      return "Please enter a valid URL";
    }
  };

  const validateEmail = (value: string) => {
    if (!value) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || "Please enter a valid email address";
  };

  const validatePhone = (value: string) => {
    if (!value) return true;
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    return phoneRegex.test(value) || "Please enter a valid phone number";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Contact Information</CardTitle>
        <CardDescription>
          Add your contact details so people can reach out to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                rules={{
                  validate: validatePhone,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{
                  validate: validateEmail,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="links.0.url"
              rules={{
                validate: validateUrl,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="links.1.url"
              rules={{
                validate: validateUrl,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="links.2.url"
              rules={{
                validate: validateUrl,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dribbble</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://dribbble.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="links.3.url"
              rules={{
                validate: validateUrl,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://twitter.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">Finish</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
