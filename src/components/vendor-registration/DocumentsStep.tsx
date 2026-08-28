"use client";

import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X, FileText } from "lucide-react";
import { FormTitle } from "../ui/FormTitle";

export const DocumentsStep: React.FC = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Watch the trade license field
  const selectedFile = watch("tradeLicense") as File | null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("tradeLicense", e.target.files[0], { shouldValidate: true });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue("tradeLicense", e.dataTransfer.files[0], { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <FormTitle>Trade License Upload</FormTitle>

      {/* Register the hidden field for validation */}
      <input
        type="hidden"
        {...register("tradeLicense")}
      />

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => {
          fileInputRef.current?.click();
        }}
        className={`w-full py-10 px-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? "border-[#FF7A75] bg-[#FF7A75]/5" 
            : errors.tradeLicense 
            ? "border-[#EF5246] bg-[#EF5246]/5" 
            : "border-[#EF5246]/20 hover:border-[#EF5246]/45 bg-[#120205]/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />

        {!selectedFile ? (
          <>
            <div className="h-14 w-14 rounded-full bg-[#EF5246]/10 border border-[#EF5246]/20 flex items-center justify-center text-[#EF5246] mb-4">
              <Upload size={24} />
            </div>
            <p className="text-sm font-semibold text-white mb-1">Drop your trade license here</p>
            <p className="text-xs text-slate-500 mb-6">PDF, JPG or PNG — max 10MB</p>
            <button
              type="button"
              className="px-5 py-2 rounded-full border border-[#EF5246]/30 text-xs font-semibold text-[#FF7A75] bg-transparent hover:bg-[#EF5246]/10 transition-all duration-300"
            >
              Browse Files
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 bg-[#1e050a] border border-[#EF5246]/20 rounded-xl p-4 w-full max-w-sm justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 overflow-hidden">
              <FileText size={22} className="text-[#FF7A75] shrink-0" />
              <span className="text-xs font-medium text-white truncate max-w-[200px]">{selectedFile.name}</span>
              <span className="text-[10px] text-slate-500 shrink-0">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
            </div>
            <button
              type="button"
              onClick={() => setValue("tradeLicense", null, { shouldValidate: true })}
              className="text-slate-400 hover:text-white transition-colors duration-200 shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] sm:text-xs text-slate-500 text-center select-none leading-relaxed">
        Your documents are encrypted and handled with strict confidentiality.
      </p>
      {errors.tradeLicense && (
        <span className="text-xs text-[#EF5246] text-center">{errors.tradeLicense.message as string}</span>
      )}
    </div>
  );
};
export default DocumentsStep;
