"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { FormTitle } from "../ui/FormTitle";
import { Input } from "../ui/Input";
import { CustomPhoneInput } from "../ui/PhoneInput";

export const ContactStep: React.FC = () => {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <FormTitle>Contact Information</FormTitle>

      {/* Full Name Field */}
      <FormField label="Full Name" required error={errors.fullName?.message as string}>
        <Input
          type="text"
          placeholder="Enter your full name"
          hasError={!!errors.fullName}
          {...register("fullName")}
        />
      </FormField>

      {/* WhatsApp Number Field */}
      <FormField label="WhatsApp Number" required error={errors.whatsApp?.message as string}>
        <Controller
          name="whatsApp"
          control={control}
          render={({ field }) => (
            <CustomPhoneInput
              value={field.value || ""}
              onChange={field.onChange}
              hasError={!!errors.whatsApp}
              placeholder="Enter your WhatsApp number"
            />
          )}
        />
      </FormField>
    </div>
  );
};
export default ContactStep;
