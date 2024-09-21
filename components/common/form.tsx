"use client";
import React, { useEffect } from "react";
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
import { ConfirmationComponent } from "../ConfirmationComponent";
import { addDoc, collection } from "firebase/firestore";
import { db, authen } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';


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

async function addDataToFirestore(data: z.infer<typeof formSchema>) {
  try {
    console.log("Attempting to add data to Firestore:", data);
    const docRef = await addDoc(collection(db, "events"), {
      ...data,
      createdAt: new Date(),
    });
    console.log("Document successfully written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
    if (error instanceof FirebaseError) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);
    } else {
      console.error("Non-Firebase error:", error);
    }
    console.error("Full error object:", JSON.stringify(error, null, 2));
    return false;
  }
}

export default function IntroForm({
  onClick,
  selectedDate,
  selectedTime,
  timezone,
}: IntroFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: "", email: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      companyUrl: "",
      serviceNeeded: [],
      budget: "",
      status: "",
      designStatus: "",
      deadline: "",
      description: "",
    },
  });

  useEffect(() => {
    if (user && user.email) {
      form.setValue("email", user.email);
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit the form.",
        variant: "destructive",
      });
      return;
    }

    console.log('Current user:', user);
  
    setIsSubmitting(true);
  
    try {
      const idToken = await authen.currentUser?.getIdToken();
  
      // Add data to Firestore
      const firestoreSuccess = await addDataToFirestore(data);
      if (!firestoreSuccess) {
        throw new Error('Failed to add data to Firestore');
      }
  
      // Call the API to create the event and send email
      const response = await fetch("/api/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...data,
          date: selectedDate?.toISOString(),
          timeZone: timezone,
        }),
      });
  
      if (response.ok) {
        // Call the send-email API
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            selectedDate: selectedDate?.toLocaleDateString(),
            selectedTime: selectedTime,
          }),
        });

        if (!emailResponse.ok) {
          throw new Error('Failed to send email');
        }

        toast({
          title: "Success",
          description: "Your project has been submitted successfully!",
        });
        setSubmittedData({
          name: form.getValues("name"),
          email: user?.email || form.getValues("email"),
        });
        form.reset();
        setShowConfirmation(true);
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      console.error('Full error object:', JSON.stringify(error, null, 2));
      toast({
        title: "Error",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <ConfirmationComponent
        name={submittedData.name}
        email={submittedData.email}
        selectedDate={selectedDate?.toLocaleDateString() || ""}
        selectedTime={selectedTime || ""}
      />
    );
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Email <span>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  disabled={!!user} // Disable the input if the user is logged in
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
