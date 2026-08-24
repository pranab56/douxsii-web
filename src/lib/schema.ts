import { z } from "zod";

export const registrationSchema = z.object({
  businessName: z.string().min(1, "Enter your business name"),
  city: z.string().min(1, "Enter your city"),
  phone: z.string().min(1, "Enter your phone number"),
  email: z.string().min(1, "Enter your business email").email("Enter a valid email address"),
  storeName: z.string().min(1, "Enter your store name"),
  storeDescription: z.string().min(1, "Enter your store description"),
  storeUrl: z.string().min(1, "Enter your website or social URL"),
  tradeLicense: z
    .any()
    .nullable()
    .refine((val) => val !== null && val !== undefined && val !== "", "Upload your trade license document"),
  fullName: z.string().min(1, "Enter your full name"),
  whatsApp: z.string().min(1, "Enter your WhatsApp number"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  address: z.string().optional(),
  isLocationSelected: z
    .boolean()
    .refine((val) => val === true, "Please select a valid location from the auto-suggestions list"),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;


