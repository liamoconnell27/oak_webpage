"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please describe your project (10 characters min)"),
  referral: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const projectTypes = [
  "Structural Design — New Construction",
  "Structural Design — Addition/Renovation",
  "Structural Analysis / Peer Review",
  "Foundation Engineering",
  "Building Inspection / Condition Assessment",
  "Historic Preservation",
  "Construction Administration",
  "Forensic Investigation",
  "Other / Not Sure",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Placeholder — wire up to a backend/email service later
    await new Promise((r) => setTimeout(r, 800));
    console.log("Form submission:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-foreground/10 p-12 lg:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
        <CheckCircle className="w-12 h-12 text-foreground/40 mb-6" />
        <h3 className="text-2xl font-display mb-3">Request Received</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Thank you for reaching out. We&apos;ll review your request and be in touch within one to two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-foreground/10 p-10 lg:p-14 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Field label="Full Name" error={errors.name?.message} required>
          <input
            {...register("name")}
            placeholder="Jane Smith"
            className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground placeholder:text-muted-foreground/40 transition-colors"
          />
        </Field>

        <Field label="Email Address" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@example.com"
            className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground placeholder:text-muted-foreground/40 transition-colors"
          />
        </Field>

        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(610) 555-0100"
            className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground placeholder:text-muted-foreground/40 transition-colors"
          />
        </Field>

        <Field label="Company / Organization" error={errors.company?.message}>
          <input
            {...register("company")}
            placeholder="Optional"
            className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground placeholder:text-muted-foreground/40 transition-colors"
          />
        </Field>
      </div>

      <Field label="Project Type" error={errors.projectType?.message} required>
        <select
          {...register("projectType")}
          className="w-full bg-background border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground transition-colors appearance-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled className="text-muted-foreground">
            Select a service type
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-background">
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Project Description" error={errors.message?.message} required>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Briefly describe your project — location, scope, timeline, and any relevant context."
          className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground placeholder:text-muted-foreground/40 transition-colors resize-none"
        />
      </Field>

      <Field label="How Did You Hear About Us?" error={errors.referral?.message}>
        <input
          {...register("referral")}
          placeholder="Referral, Google, architect recommendation, etc."
          className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-2 text-foreground placeholder:text-muted-foreground/40 transition-colors"
        />
      </Field>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="bg-foreground hover:bg-foreground/90 text-background px-10 h-14 text-base rounded-full group disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Submit Request"}
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
        {label}
        {required && <span className="ml-1 text-foreground/40">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
