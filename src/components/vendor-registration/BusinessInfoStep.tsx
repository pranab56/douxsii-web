"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { FormTitle } from "../ui/FormTitle";
import { Input } from "../ui/Input";
import { MapPin } from "lucide-react";

interface CityLocation {
  name: string;
  lat: string;
  lon: string;
}

const PRESET_CITIES: CityLocation[] = [
  { name: "Dhaka, Bangladesh", lat: "23.81033", lon: "90.41252" },
  { name: "Chittagong, Bangladesh", lat: "22.3569", lon: "91.7832" },
  { name: "Dubai, United Arab Emirates", lat: "25.2048", lon: "55.2708" },
  { name: "Abu Dhabi, United Arab Emirates", lat: "24.4539", lon: "54.3773" },
  { name: "Sharjah, United Arab Emirates", lat: "25.3463", lon: "55.4209" },
  { name: "Riyadh, Saudi Arabia", lat: "24.7136", lon: "46.6753" },
  { name: "Jeddah, Saudi Arabia", lat: "21.5433", lon: "39.1728" },
  { name: "London, United Kingdom", lat: "51.5074", lon: "-0.1278" },
  { name: "New York, USA", lat: "40.7128", lon: "-74.0060" },
];

export const BusinessInfoStep: React.FC = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const cityValue = watch("city") || "";
  const [suggestions, setSuggestions] = useState<CityLocation[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cityValue || cityValue.trim().length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const filtered = PRESET_CITIES.filter((c) =>
      c.name.toLowerCase().includes(cityValue.toLowerCase())
    );

    const controller = new AbortController();
    const fetchOnline = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityValue)}&limit=5`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const onlineCities: CityLocation[] = data.map((item: any) => ({
            name: item.display_name,
            lat: String(item.lat),
            lon: String(item.lon),
          }));
          const combined = [...filtered];
          onlineCities.forEach((oc) => {
            if (!combined.some((c) => c.name.toLowerCase() === oc.name.toLowerCase())) {
              combined.push(oc);
            }
          });
          setSuggestions(combined.slice(0, 6));
        } else {
          setSuggestions(filtered);
        }
      } catch (err) {
        setSuggestions(filtered);
      }
    };

    fetchOnline();
    setShowDropdown(true);

    return () => controller.abort();
  }, [cityValue]);

  const handleSelectCity = (city: CityLocation) => {
    setValue("city", city.name, { shouldValidate: true });
    setValue("address", city.name);
    setValue("latitude", city.lat);
    setValue("longitude", city.lon);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <FormTitle>Business Information</FormTitle>

      {/* Business Name Field */}
      <FormField label="Business Name" required error={errors.businessName?.message as string}>
        <Input
          type="text"
          placeholder="Enter your business name"
          hasError={!!errors.businessName}
          {...register("businessName")}
        />
      </FormField>

      {/* City and Phone fields side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative" ref={dropdownRef}>
          <FormField label="City" required error={errors.city?.message as string}>
            <Input
              type="text"
              placeholder="Enter your city"
              hasError={!!errors.city}
              {...register("city")}
              onFocus={() => {
                if (cityValue) setShowDropdown(true);
              }}
              autoComplete="off"
            />
          </FormField>

          {/* City Autocomplete Suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl bg-[#1C060B] border border-[#EF5246]/30 shadow-2xl overflow-hidden max-h-56 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectCity(item)}
                  className="flex items-center gap-2.5 px-4 py-3 hover:bg-[#EF5246]/15 text-xs text-slate-200 hover:text-white cursor-pointer transition-colors duration-200 border-b border-[#3E1119]/50 last:border-0"
                >
                  <MapPin size={14} className="text-[#FF7A75] shrink-0" />
                  <span className="font-medium text-white truncate">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <FormField label="Phone Number" required error={errors.phone?.message as string}>
          <Input
            type="text"
            placeholder="Enter your phone number"
            hasError={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
      </div>

      {/* Business Email Field */}
      <FormField label="Business Email" required error={errors.email?.message as string}>
        <Input
          type="email"
          placeholder="Enter your business email"
          hasError={!!errors.email}
          {...register("email")}
        />
      </FormField>
    </div>
  );
};
export default BusinessInfoStep;

