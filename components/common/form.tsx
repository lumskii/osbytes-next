"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { stat } from "fs";

interface IntroFormProps {
  onClick: () => void;
  selectedDate: Date | undefined;
  selectedTime: string | null;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Your name must contain 2 or more characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  companyName: z.string(),
  companyUrl: z.string().url({
    message:
      "Your URL should include the http or https extension e.g https://osbytes.com",
  }),
  date: z.string().optional(),
  time: z.string().optional(),
  serviceNeeded: z.string().optional(),
  budget: z.string().optional(),
  status: z.string().optional(),
  designStatus: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().optional(),
});

export default function IntroForm({
  onClick,
  selectedDate,
  selectedTime,
}: IntroFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      companyUrl: "",
      date: selectedDate?.toString() || "",
      time: selectedTime || "",
      serviceNeeded: "",
      budget: "",
      status: "",
      designStatus: "",
      deadline: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("form Data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 ">
                  Your name <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="name" type="text" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 ">
                  Email address <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 ">
                  Company Name <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input type="name" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="companyUrl"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 ">Company URL</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="serviceNeeded"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">What services do you need? <span>*</span></FormLabel>
                <Select onValueChange={field.onChange} required>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="You can select multiple"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web app solution">Web App Solution</SelectItem>
                  <SelectItem value="website solution">Website Solution</SelectItem>
                  <SelectItem value="seo optimization">SEO Optimization</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">Our budget is? <span>*</span></FormLabel>
                <Select onValueChange={field.onChange} required>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web app solution">Web App Solution</SelectItem>
                  <SelectItem value="website solution">Website Solution</SelectItem>
                  <SelectItem value="seo optimization">SEO Optimization</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">What services do you need? <span>*</span></FormLabel>
                <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="You can select multiple"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web app solution">Web App Solution</SelectItem>
                  <SelectItem value="website solution">Website Solution</SelectItem>
                  <SelectItem value="seo optimization">SEO Optimization</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <input
          type="hidden"
          name="date"
          value={selectedDate?.toString() || ""}
        />
        <input type="hidden" name="time" value={selectedTime || ""} />
        <div className="w-full flex gap-2 justify-end">
          <Button type="button" className="w-auto" onClick={onClick}>
            Back
          </Button>
          <Button type="submit" className="w-auto">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}
