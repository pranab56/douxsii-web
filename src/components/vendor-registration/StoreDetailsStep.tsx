"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { FormTitle } from "../ui/FormTitle";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

export const StoreDetailsStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <FormTitle>Store Information</FormTitle>

      {/* Store Name Field */}
      <FormField label="Store Name" required error={errors.storeName?.message as string}>
        <Input
          type="text"
          placeholder="Enter your store name"
          hasError={!!errors.storeName}
          {...register("storeName")}
        />
      </FormField>

      {/* Store Description Field */}
      <FormField label="Store Description" required error={errors.storeDescription?.message as string}>
        <Textarea
          placeholder="Enter your store description"
          rows={4}
          hasError={!!errors.storeDescription}
          {...register("storeDescription")}
        />
      </FormField>

      {/* Website/Social URL Field */}
      <FormField label="Website / Social URL" required error={errors.storeUrl?.message as string}>
        <Input
          type="text"
          placeholder="Enter your website or social URL"
          hasError={!!errors.storeUrl}
          {...register("storeUrl")}
        />
      </FormField>
    </div>
  );
};
export default StoreDetailsStep;
