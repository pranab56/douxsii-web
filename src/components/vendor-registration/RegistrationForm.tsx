"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { StepProgress } from "./StepProgress";
import { BusinessInfoStep } from "./BusinessInfoStep";
import { StoreDetailsStep } from "./StoreDetailsStep";
import { DocumentsStep } from "./DocumentsStep";
import { ContactStep } from "./ContactStep";
import { SuccessStep } from "./SuccessStep";
import { registrationSchema } from "../../lib/schema";
import { useCreatePartnerRequestMutation } from "@/features/contact/contactApi";

const STEP_FIELDS: Record<number, string[]> = {
  1: ["businessName", "city", "phone", "email", "isLocationSelected"],
  2: ["storeName", "storeDescription", "storeUrl"],
  3: ["tradeLicense"],
  4: ["fullName", "whatsApp"],
};

export const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createPartnerRequest, { isLoading }] = useCreatePartnerRequestMutation();

  const methods = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: { tradeLicense: null, isLocationSelected: false },
  });
  const { trigger, handleSubmit } = methods;

  const handleNext = async () => {
    const isValid = await trigger(STEP_FIELDS[step] as any);
    if (isValid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: any) => {
    setSubmitError(null);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName || "");
      formData.append("email", data.email || "");
      formData.append("name", data.storeName || "");
      formData.append("description", data.storeDescription || "");
      formData.append("website", data.storeUrl || "");
      formData.append("phone", data.phone || "");
      if (data.tradeLicense) {
        formData.append("tradeLicense", data.tradeLicense);
      }
      formData.append("businessName", data.businessName || "");
      formData.append("city", data.city || "");
      formData.append("address", data.address || data.city || "");
      formData.append("whatappPhone", data.whatsApp || "");
      formData.append("workingHours", data.workingHours || "34");
      formData.append("latitude", data.latitude || "23.81033");
      formData.append("longitude", data.longitude || "90.41252");

      const res = await createPartnerRequest(formData).unwrap();
      if (res?.success || res) {
        setStep(5);
      } else {
        setSubmitError(res?.message || "Failed to submit request.");
      }
    } catch (err: any) {
      setSubmitError(err?.data?.message || err?.message || "Failed to submit request. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <BusinessInfoStep />;
      case 2: return <StoreDetailsStep />;
      case 3: return <DocumentsStep />;
      case 4: return <ContactStep />;
      default: return <SuccessStep />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none">
        {step <= 4 && <StepProgress currentStep={step} />}

        {/* Form Container Card */}
        <div className="w-full max-w-3xl rounded-[24px] sm:rounded-[28px] bg-[#280b11] border border-[#EF524626] shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-5 sm:p-12 mb-8 sm:mb-12">
          <form onSubmit={step === 4 ? handleSubmit(onSubmit) : (e) => e.preventDefault()}>
            {renderStep()}

            {submitError && (
              <div className="mt-4 p-3 rounded-xl bg-[#EF5246]/10 border border-[#EF5246]/30 text-xs text-[#FF7A75] text-center">
                {submitError}
              </div>
            )}

            {step <= 4 && (
              <div className="mt-8 pt-8 border-t border-[#3E1119]/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 1 || isLoading}
                  className="px-5 py-2.5 rounded-full border border-[#EF524626] bg-[#33171d] text-xs font-semibold text-[#FFE9E8]/60 hover:text-white hover:border-[#FF7A75]/35 hover:bg-[#1C060B]/80 disabled:opacity-20 disabled:pointer-events-none flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <span className="text-[11px] text-[#F5E8FF] font-medium">Step {step} of 4</span>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={step === 4 ? handleSubmit(onSubmit) : handleNext}
                  className="px-6 py-2.5 rounded-full bg-[#6B000C] border border-[#FF7A75]/20 text-xs font-semibold text-white shadow-[0_0_20px_rgba(107,0,12,0.45)] hover:bg-[#850311] hover:border-[#FF7A75]/35 hover:shadow-[0_0_25px_rgba(133,3,17,0.6)] disabled:opacity-50 flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Submitting...
                    </>
                  ) : step === 4 ? (
                    "Submit Application"
                  ) : (
                    <>
                      Continue <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
export default RegistrationForm;
