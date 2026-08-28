import { z } from "zod";

export const registrationSchema = z.object({
  businessName: z.string().min(1, "Enter your business name"),
  city: z.string().min(1, "Enter your city"),
  phone: z
    .string()
    .min(1, "Enter your phone number")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      if (digits.startsWith("880")) {
        const bdDigits = digits.slice(3);
        return bdDigits.length >= 10 && bdDigits.length <= 11;
      }
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter a valid phone number (max 11 digits for BD)"),
  email: z.string().min(1, "Enter your business email").email("Enter a valid email address"),
  storeName: z.string().min(1, "Enter your store name"),
  storeDescription: z.string().min(1, "Enter your store description"),
  storeUrl: z.string().min(1, "Enter your website or social URL"),
  tradeLicense: z
    .any()
    .nullable()
    .refine((val) => val !== null && val !== undefined && val !== "", "Upload your trade license document"),
  fullName: z.string().min(1, "Enter your full name"),
  whatsApp: z
    .string()
    .min(1, "Enter your WhatsApp number")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      if (digits.startsWith("880")) {
        const bdDigits = digits.slice(3);
        return bdDigits.length >= 10 && bdDigits.length <= 11;
      }
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter a valid WhatsApp number (max 11 digits for BD)"),
  categories: z.array(z.string()).optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  address: z.string().optional(),
  isLocationSelected: z
    .boolean()
    .refine((val) => val === true, "Please select a valid location from the auto-suggestions list"),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;


