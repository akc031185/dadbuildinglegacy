import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email cannot exceed 254 characters")
    .trim()
    .toLowerCase(),
  topic: z
    .string()
    .min(1, "Please select a topic")
    .max(100, "Topic cannot exceed 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .trim()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;