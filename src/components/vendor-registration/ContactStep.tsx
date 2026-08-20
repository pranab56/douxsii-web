"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { FormTitle } from "../ui/FormTitle";
import { Input } from "../ui/Input";

export const ContactStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

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
        <Input
          type="text"
          placeholder="Enter your WhatsApp number"
          hasError={!!errors.whatsApp}
          {...register("whatsApp")}
        />
      </FormField>
    </div>
  );
};
export default ContactStep;
