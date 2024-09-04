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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MultiSelectInput from "./multiSelect";
import { Textarea } from "../ui/textarea";
import { useUserTimezone } from "@/lib/providers/timezone";

interface IntroFormProps {
  onClick: () => void;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  timezone: string | null;
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
  serviceNeeded: z.array(z.string()).optional(),
  budget: z.string().optional(),
  status: z.string().optional(),
  designStatus: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().optional(),
  timezone: z.string().optional(),
});

export default function IntroForm({
  onClick,
  selectedDate,
  selectedTime,
  timezone,
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
      timezone: timezone || "America/Phoenix",
      serviceNeeded: [],
      budget: "",
      status: "",
      designStatus: "",
      deadline: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const eventData = {
      ...data,
      date: selectedDate?.toISOString() || data.date,
      timeZone: timezone,
    };
    
    console.log('timezone:', eventData.timeZone); // Debugging

    try {
      const response = await fetch("/api/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const event = await response.json();
        console.log("Google Calendar event created:", event);

        toast({
          title: "Meeting Scheduled!",
          description:
            "Your meeting has been scheduled and added to your Google Calendar.",
        });
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.error("Failed to create Google Calendar event:", error);

      toast({
        title: "Error",
        description:
          "There was an issue scheduling the meeting. Please try again later.",
      });
    }
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
                <FormLabel className="flex gap-2 capitalize">
                  What services do you need? <span>*</span>
                </FormLabel>
                <MultiSelectInput
                  field={{
                    value: field.value ?? [],
                    onChange: field.onChange,
                  }}
                  options={[
                    { value: "Web App solution", label: "Web App Solution" },
                    { value: "Website solution", label: "Website Solution" },
                    { value: "SEO optimization", label: "SEO Optimization" },
                  ]}
                />
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
                <FormLabel className="flex gap-2 capitalize">
                  Our budget is? <span>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} required>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="$500 - $1K">$500 - $1K</SelectItem>
                    <SelectItem value="$1K - $5K">$1K - $5K</SelectItem>
                    <SelectItem value="$5k and above...">
                      $5K and above...
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">
                  Post Project Continued Assistance <span>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="We need ongoing support after this project">
                      We need ongoing support after this project.
                    </SelectItem>
                    <SelectItem value="We do not need ongoing support after this project">
                      We do not need ongoing support after this project.
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="designStatus"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">
                  What Is Your Design Status? <span>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="We need design">
                      We need design
                    </SelectItem>
                    <SelectItem value="We have some design">
                      We have some design
                    </SelectItem>
                    <SelectItem value="We have all design already">
                      We have all design already
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">
                  Our deadline is? <span>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1 month">1 Month</SelectItem>
                    <SelectItem value="1-3 months">1-3 Months</SelectItem>
                    <SelectItem value="3-6 months">3-6 Months</SelectItem>
                    <SelectItem value="onging collaboration">
                      Ongoing Collaboration
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="flex gap-2 capitalize">
                  Project description <span>*</span>
                </FormLabel>
                <Textarea
                  onChange={field.onChange}
                  placeholder="Please share anything that will help prepare for our meeting"
                />
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
        <input type="hidden" name="timeZone" value={timezone || "America/Phoenix"} />
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
