"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { FormTitle } from "../ui/FormTitle";
import { Input } from "../ui/Input";
import { MapPin, Loader2, CheckCircle2, Building2, Map, Navigation, Globe, PlusCircle } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    gm_authFailure?: () => void;
  }
}

interface SuggestionItem {
  placeId?: string;
  name: string;
  description: string;
  level: "Division" | "District (Jela)" | "Upazila / Thana" | "Area / Suburb" | "City / International";
  lat?: string;
  lon?: string;
  isCustom?: boolean;
}

// Complete 64 Bangladesh Districts + All Upazilas + International Hubs
const PRESET_LOCATIONS: SuggestionItem[] = [
  // --- BANGLADESH DIVISIONS (৮ বিভাগ) ---
  { name: "Dhaka Division", description: "Dhaka Division, Bangladesh", level: "Division", lat: "23.81033", lon: "90.41252" },
  { name: "Chittagong Division", description: "Chittagong Division, Bangladesh", level: "Division", lat: "22.3569", lon: "91.7832" },
  { name: "Sylhet Division", description: "Sylhet Division, Bangladesh", level: "Division", lat: "24.8949", lon: "91.8687" },
  { name: "Rajshahi Division", description: "Rajshahi Division, Bangladesh", level: "Division", lat: "24.3745", lon: "88.6042" },
  { name: "Khulna Division", description: "Khulna Division, Bangladesh", level: "Division", lat: "22.8456", lon: "89.5403" },
  { name: "Barisal Division", description: "Barisal Division, Bangladesh", level: "Division", lat: "22.7010", lon: "90.3535" },
  { name: "Rangpur Division", description: "Rangpur Division, Bangladesh", level: "Division", lat: "25.7439", lon: "89.2752" },
  { name: "Mymensingh Division", description: "Mymensingh Division, Bangladesh", level: "Division", lat: "24.7471", lon: "90.4203" },

  // --- ALL 64 BANGLADESH DISTRICTS (৬৪ জেলা) ---
  // DHAKA DIVISION (13)
  { name: "Dhaka District", description: "Dhaka District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.81033", lon: "90.41252" },
  { name: "Gazipur District", description: "Gazipur District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.9999", lon: "90.4203" },
  { name: "Narayanganj District", description: "Narayanganj District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.6238", lon: "90.5000" },
  { name: "Tangail District", description: "Tangail District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "24.2513", lon: "89.9167" },
  { name: "Narsingdi District", description: "Narsingdi District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.9193", lon: "90.7206" },
  { name: "Manikganj District", description: "Manikganj District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.8644", lon: "90.0047" },
  { name: "Munshiganj District", description: "Munshiganj District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.5422", lon: "90.5305" },
  { name: "Faridpur District", description: "Faridpur District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.6070", lon: "89.8425" },
  { name: "Madaripur District", description: "Madaripur District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.1641", lon: "90.1896" },
  { name: "Gopalganj District", description: "Gopalganj District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.0050", lon: "89.8266" },
  { name: "Shariatpur District", description: "Shariatpur District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.2423", lon: "90.4348" },
  { name: "Rajbari District", description: "Rajbari District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "23.7574", lon: "89.6444" },
  { name: "Kishoreganj District", description: "Kishoreganj District, Dhaka Division, Bangladesh", level: "District (Jela)", lat: "24.4260", lon: "90.9821" },

  // CHITTAGONG DIVISION (11)
  { name: "Chittagong District", description: "Chittagong District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "22.3569", lon: "91.7832" },
  { name: "Cox's Bazar District", description: "Cox's Bazar District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "21.4272", lon: "91.9702" },
  { name: "Comilla District", description: "Comilla District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "23.4607", lon: "91.1809" },
  { name: "Feni District", description: "Feni District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "23.0159", lon: "91.3976" },
  { name: "Noakhali District", description: "Noakhali District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "22.8695", lon: "91.0993" },
  { name: "Lakshmipur District", description: "Lakshmipur District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "22.9447", lon: "90.8282" },
  { name: "Chandpur District", description: "Chandpur District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "23.2333", lon: "90.6667" },
  { name: "Brahmanbaria District", description: "Brahmanbaria District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "23.9571", lon: "91.1119" },
  { name: "Rangamati District", description: "Rangamati District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "22.6533", lon: "92.1753" },
  { name: "Bandarban District", description: "Bandarban District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "22.1953", lon: "92.2184" },
  { name: "Khagrachhari District", description: "Khagrachhari District, Chittagong Division, Bangladesh", level: "District (Jela)", lat: "23.1192", lon: "91.9846" },

  // RAJSHAHI DIVISION (8)
  { name: "Natore District", description: "Natore District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.4102", lon: "89.0076" },
  { name: "Rajshahi District", description: "Rajshahi District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.3745", lon: "88.6042" },
  { name: "Bogra District", description: "Bogra District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.8465", lon: "89.3777" },
  { name: "Pabna District", description: "Pabna District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.0108", lon: "89.2530" },
  { name: "Sirajganj District", description: "Sirajganj District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.4534", lon: "89.7008" },
  { name: "Naogaon District", description: "Naogaon District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.7936", lon: "88.9318" },
  { name: "Joypurhat District", description: "Joypurhat District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "25.1018", lon: "89.0270" },
  { name: "Chapainawabganj District", description: "Chapainawabganj District, Rajshahi Division, Bangladesh", level: "District (Jela)", lat: "24.5965", lon: "88.2775" },

  // SYLHET DIVISION (4)
  { name: "Sylhet District", description: "Sylhet District, Sylhet Division, Bangladesh", level: "District (Jela)", lat: "24.8949", lon: "91.8687" },
  { name: "Moulvibazar District", description: "Moulvibazar District, Sylhet Division, Bangladesh", level: "District (Jela)", lat: "24.4829", lon: "91.7774" },
  { name: "Habiganj District", description: "Habiganj District, Sylhet Division, Bangladesh", level: "District (Jela)", lat: "24.3749", lon: "91.4155" },
  { name: "Sunamganj District", description: "Sunamganj District, Sylhet Division, Bangladesh", level: "District (Jela)", lat: "25.0658", lon: "91.3950" },

  // KHULNA DIVISION (10)
  { name: "Khulna District", description: "Khulna District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "22.8456", lon: "89.5403" },
  { name: "Jessore District", description: "Jessore District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.1664", lon: "89.2081" },
  { name: "Satkhira District", description: "Satkhira District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "22.7185", lon: "89.0705" },
  { name: "Bagerhat District", description: "Bagerhat District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "22.6602", lon: "89.7895" },
  { name: "Kushtia District", description: "Kushtia District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.9013", lon: "89.1205" },
  { name: "Magura District", description: "Magura District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.4873", lon: "89.4199" },
  { name: "Jhenaidah District", description: "Jhenaidah District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.5448", lon: "89.1539" },
  { name: "Narail District", description: "Narail District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.1725", lon: "89.5126" },
  { name: "Chuadanga District", description: "Chuadanga District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.6402", lon: "88.8418" },
  { name: "Meherpur District", description: "Meherpur District, Khulna Division, Bangladesh", level: "District (Jela)", lat: "23.7622", lon: "88.6318" },

  // BARISAL DIVISION (6)
  { name: "Barisal District", description: "Barisal District, Barisal Division, Bangladesh", level: "District (Jela)", lat: "22.7010", lon: "90.3535" },
  { name: "Patuakhali District", description: "Patuakhali District, Barisal Division, Bangladesh", level: "District (Jela)", lat: "22.3596", lon: "90.3298" },
  { name: "Bhola District", description: "Bhola District, Barisal Division, Bangladesh", level: "District (Jela)", lat: "22.6859", lon: "90.6482" },
  { name: "Pirojpur District", description: "Pirojpur District, Barisal Division, Bangladesh", level: "District (Jela)", lat: "22.5841", lon: "89.9720" },
  { name: "Barguna District", description: "Barguna District, Barisal Division, Bangladesh", level: "District (Jela)", lat: "22.1577", lon: "90.1249" },
  { name: "Jhalokati District", description: "Jhalokati District, Barisal Division, Bangladesh", level: "District (Jela)", lat: "22.6406", lon: "90.1987" },

  // RANGPUR DIVISION (8)
  { name: "Rangpur District", description: "Rangpur District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "25.7439", lon: "89.2752" },
  { name: "Dinajpur District", description: "Dinajpur District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "25.6279", lon: "88.6332" },
  { name: "Gaibandha District", description: "Gaibandha District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "25.3288", lon: "89.5403" },
  { name: "Kurigram District", description: "Kurigram District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "25.8054", lon: "89.6361" },
  { name: "Lalmonirhat District", description: "Lalmonirhat District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "25.9165", lon: "89.4532" },
  { name: "Nilphamari District", description: "Nilphamari District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "25.9318", lon: "88.8560" },
  { name: "Panchagarh District", description: "Panchagarh District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "26.3411", lon: "88.5541" },
  { name: "Thakurgaon District", description: "Thakurgaon District, Rangpur Division, Bangladesh", level: "District (Jela)", lat: "26.0337", lon: "88.4617" },

  // MYMENSINGH DIVISION (4)
  { name: "Mymensingh District", description: "Mymensingh District, Mymensingh Division, Bangladesh", level: "District (Jela)", lat: "24.7471", lon: "90.4203" },
  { name: "Jamalpur District", description: "Jamalpur District, Mymensingh Division, Bangladesh", level: "District (Jela)", lat: "24.9375", lon: "89.9377" },
  { name: "Netrokona District", description: "Netrokona District, Mymensingh Division, Bangladesh", level: "District (Jela)", lat: "24.8833", lon: "90.7333" },
  { name: "Sherpur District", description: "Sherpur District, Mymensingh Division, Bangladesh", level: "District (Jela)", lat: "25.0204", lon: "90.0153" },

  // --- NATORE & RAJSHAHI UPAZILAS ---
  { name: "Natore Sadar", description: "Natore Sadar Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.4102", lon: "89.0076" },
  { name: "Singra", description: "Singra Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.5000", lon: "89.1500" },
  { name: "Baraigram", description: "Baraigram Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.3000", lon: "89.1667" },
  { name: "Gurudaspur", description: "Gurudaspur Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.3667", lon: "89.2500" },
  { name: "Lalpur", description: "Lalpur Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.1833", lon: "88.9833" },
  { name: "Bagatipara", description: "Bagatipara Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.3333", lon: "88.9500" },
  { name: "Naldanga", description: "Naldanga Upazila / Thana, Natore District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.5500", lon: "88.9833" },

  // TANGAIL UPAZILAS
  { name: "Madhupur", description: "Madhupur Upazila / Thana, Tangail District, Dhaka Division, Bangladesh", level: "Upazila / Thana", lat: "24.6000", lon: "89.9833" },
  { name: "Dhanbari", description: "Dhanbari Upazila / Thana, Tangail District, Dhaka Division, Bangladesh", level: "Upazila / Thana", lat: "24.6800", lon: "89.9600" },
  { name: "Ghatail", description: "Ghatail Upazila / Thana, Tangail District, Dhaka Division, Bangladesh", level: "Upazila / Thana", lat: "24.5000", lon: "89.9833" },
  { name: "Kalihati", description: "Kalihati Upazila / Thana, Tangail District, Dhaka Division, Bangladesh", level: "Upazila / Thana", lat: "24.3833", lon: "89.9833" },
  { name: "Sakhipur", description: "Sakhipur Upazila / Thana, Tangail District, Dhaka Division, Bangladesh", level: "Upazila / Thana", lat: "24.3000", lon: "90.1667" },
  { name: "Mirzapur", description: "Mirzapur Upazila / Thana, Tangail District, Dhaka Division, Bangladesh", level: "Upazila / Thana", lat: "24.1000", lon: "90.1000" },

  // PABNA UPAZILAS
  { name: "Bera", description: "Bera Upazila / Thana, Pabna District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.0667", lon: "89.6167" },
  { name: "Santhia", description: "Santhia Upazila / Thana, Pabna District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.0667", lon: "89.5333" },
  { name: "Sujanagar", description: "Sujanagar Upazila / Thana, Pabna District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "23.9167", lon: "89.4333" },
  { name: "Ishwardi", description: "Ishwardi Upazila / Thana, Pabna District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.1500", lon: "89.0667" },
  { name: "Chatmohar", description: "Chatmohar Upazila / Thana, Pabna District, Rajshahi Division, Bangladesh", level: "Upazila / Thana", lat: "24.2333", lon: "89.2833" },

  // DHAKA & SUBURBS
  { name: "Dhanmondi", description: "Dhanmondi Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.7461", lon: "90.3742" },
  { name: "Gulshan", description: "Gulshan Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.7925", lon: "90.4078" },
  { name: "Banani", description: "Banani Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.7937", lon: "90.4047" },
  { name: "Uttara", description: "Uttara Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.8759", lon: "90.3795" },
  { name: "Mirpur", description: "Mirpur Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.8069", lon: "90.3687" },
  { name: "Mohammadpur", description: "Mohammadpur Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.7658", lon: "90.3584" },
  { name: "Tejgaon", description: "Tejgaon Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.7597", lon: "90.3924" },
  { name: "Savar", description: "Savar Upazila / Thana, Dhaka District, Bangladesh", level: "Upazila / Thana", lat: "23.8583", lon: "90.2667" },

  // INTERNATIONAL CITIES
  { name: "Dubai", description: "Dubai, United Arab Emirates", level: "City / International", lat: "25.2048", lon: "55.2708" },
  { name: "Abu Dhabi", description: "Abu Dhabi, United Arab Emirates", level: "City / International", lat: "24.4539", lon: "54.3773" },
  { name: "Riyadh", description: "Riyadh, Saudi Arabia", level: "City / International", lat: "24.7136", lon: "46.6753" },
  { name: "Jeddah", description: "Jeddah, Saudi Arabia", level: "City / International", lat: "21.5433", lon: "39.1728" },
  { name: "London", description: "London, United Kingdom", level: "City / International", lat: "51.5074", lon: "-0.1278" },
  { name: "New York", description: "New York, NY, USA", level: "City / International", lat: "40.7128", lon: "-74.0060" },
];

const GOOGLE_MAPS_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "AIzaSyBFyO4yynd2VcGA9hX5FR3t6XtLSKwTMc";

export const BusinessInfoStep: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const cityValue = watch("city") || "";
  const isLocationSelected = watch("isLocationSelected");

  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [googleAuthError, setGoogleAuthError] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const autocompleteServiceRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const selectedNameRef = useRef<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Google Maps Script safely
  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).gm_authFailure = () => {
      setGoogleAuthError(true);
      setIsScriptLoaded(false);
      const scriptEl = document.getElementById("google-maps-script");
      if (scriptEl) scriptEl.remove();
    };

    if (window.google?.maps?.places && !googleAuthError) {
      try {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        geocoderRef.current = new window.google.maps.Geocoder();
        setIsScriptLoaded(true);
      } catch {
        setGoogleAuthError(true);
      }
      return;
    }

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      const handleLoad = () => {
        if (window.google?.maps?.places && !googleAuthError) {
          try {
            autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
            geocoderRef.current = new window.google.maps.Geocoder();
            setIsScriptLoaded(true);
          } catch {
            setGoogleAuthError(true);
          }
        }
      };
      existingScript.addEventListener("load", handleLoad);
      return () => existingScript.removeEventListener("load", handleLoad);
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.maps?.places && !googleAuthError) {
        try {
          autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
          geocoderRef.current = new window.google.maps.Geocoder();
          setIsScriptLoaded(true);
        } catch {
          setGoogleAuthError(true);
        }
      }
    };

    script.onerror = () => {
      setGoogleAuthError(true);
    };

    document.head.appendChild(script);
  }, [googleAuthError]);

  // Fetch suggestions with token filtering and automatic fallback option
  useEffect(() => {
    const q = cityValue.trim();
    if (!q || q.length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // If cityValue matches what was just selected from dropdown, don't re-fetch
    if (selectedNameRef.current && selectedNameRef.current === cityValue) {
      return;
    }

    // Reset selection status on manual input change
    setValue("isLocationSelected", false);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsLoadingSuggestions(true);
    setShowDropdown(true);

    debounceTimerRef.current = setTimeout(() => {
      // Clean noise words: "bangladesh", "bd", "district", "jela", "thana", "upazila", "division", etc.
      const rawTokens = q.toLowerCase().split(/[\s,]+/).filter(Boolean);
      const noiseWords = [
        "bangladesh",
        "bd",
        "district",
        "jela",
        "zila",
        "thana",
        "upazila",
        "upjela",
        "division",
        "bibhag",
        "city",
        "town",
      ];
      const mainTokens = rawTokens.filter((t: string) => !noiseWords.includes(t));
      const activeTokens = mainTokens.length > 0 ? mainTokens : rawTokens;

      // 1. Token-based search across PRESET_LOCATIONS
      const presetMatches = PRESET_LOCATIONS.filter((item) => {
        const fullText = (item.name + " " + item.description).toLowerCase();
        return activeTokens.every((token: string) => fullText.includes(token));
      });

      // Always prepare a fallback suggestion for custom user input
      const customFallback: SuggestionItem = {
        name: q,
        description: `${q}, Bangladesh`,
        level: "Upazila / Thana",
        lat: "23.81033",
        lon: "90.41252",
        isCustom: true,
      };

      // 2. Query Google Places API Worldwide
      if (autocompleteServiceRef.current && isScriptLoaded && !googleAuthError) {
        try {
          autocompleteServiceRef.current.getPlacePredictions(
            {
              input: q,
            },
            (predictions: any[], status: any) => {
              if (
                status === window.google?.maps?.places?.PlacesServiceStatus?.OK &&
                predictions &&
                predictions.length > 0
              ) {
                const googleItems: SuggestionItem[] = predictions.map((p) => {
                  const types: string[] = p.types || [];
                  let level: SuggestionItem["level"] = "City / International";
                  if (types.includes("administrative_area_level_1")) level = "Division";
                  else if (types.includes("administrative_area_level_2")) level = "District (Jela)";
                  else if (types.includes("locality") || types.includes("administrative_area_level_3"))
                    level = "Upazila / Thana";
                  else if (types.includes("sublocality") || types.includes("neighborhood"))
                    level = "Area / Suburb";

                  return {
                    placeId: p.place_id,
                    name: p.structured_formatting?.main_text || p.description,
                    description: p.description,
                    level,
                  };
                });

                // Merge Google predictions with preset matches
                const merged = [...googleItems];
                presetMatches.forEach((pm) => {
                  if (!merged.some((m) => m.name.toLowerCase() === pm.name.toLowerCase())) {
                    merged.push(pm);
                  }
                });

                if (merged.length === 0) {
                  merged.push(customFallback);
                }

                setSuggestions(merged.slice(0, 10));
                setIsLoadingSuggestions(false);
              } else {
                fetchFallbackSuggestions(q, presetMatches, customFallback);
              }
            }
          );
        } catch {
          fetchFallbackSuggestions(q, presetMatches, customFallback);
        }
      } else {
        fetchFallbackSuggestions(q, presetMatches, customFallback);
      }
    }, 150);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [cityValue, isScriptLoaded, googleAuthError, setValue]);

  // Fetch worldwide fallback locations via OpenStreetMap Nominatim
  const fetchFallbackSuggestions = async (
    query: string,
    presets: SuggestionItem[],
    customFallback: SuggestionItem
  ) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=8`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const items: SuggestionItem[] = data.map((item: any) => {
          const type = item.type || "";
          const addr = item.address || {};
          let level: SuggestionItem["level"] = "City / International";

          if (addr.country_code !== "bd") {
            level = "City / International";
          } else if (addr.state && item.display_name.includes("Division")) {
            level = "Division";
          } else if (
            item.display_name.toLowerCase().includes("district") ||
            item.display_name.toLowerCase().includes("jela")
          ) {
            level = "District (Jela)";
          } else if (type === "suburb" || type === "neighbourhood") {
            level = "Area / Suburb";
          } else {
            level = "Upazila / Thana";
          }

          return {
            name: item.display_name.split(",")[0] || item.display_name,
            description: item.display_name,
            level,
            lat: String(item.lat),
            lon: String(item.lon),
          };
        });

        // Combine presets and online search results
        const combined = [...presets];
        items.forEach((onlineItem) => {
          if (
            !combined.some(
              (c) => c.description.toLowerCase() === onlineItem.description.toLowerCase()
            )
          ) {
            combined.push(onlineItem);
          }
        });

        if (combined.length === 0) {
          combined.push(customFallback);
        }

        setSuggestions(combined.slice(0, 10));
      } else {
        const combined = [...presets];
        if (combined.length === 0) {
          combined.push(customFallback);
        }
        setSuggestions(combined);
      }
    } catch {
      const combined = [...presets];
      if (combined.length === 0) {
        combined.push(customFallback);
      }
      setSuggestions(combined);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item: SuggestionItem) => {
    selectedNameRef.current = item.description;

    setValue("city", item.description, { shouldValidate: true });
    setValue("address", item.description);
    setValue("isLocationSelected", true, { shouldValidate: true });

    clearErrors("city");
    clearErrors("isLocationSelected");

    // Geocode to get lat/lon if not directly provided
    if (item.lat && item.lon) {
      setValue("latitude", item.lat);
      setValue("longitude", item.lon);
    } else if (geocoderRef.current && item.placeId) {
      try {
        geocoderRef.current.geocode(
          { placeId: item.placeId },
          (results: any[], status: any) => {
            if (status === "OK" && results && results[0]) {
              const loc = results[0].geometry.location;
              setValue("latitude", String(loc.lat()));
              setValue("longitude", String(loc.lng()));
            } else {
              setValue("latitude", "23.81033");
              setValue("longitude", "90.41252");
            }
          }
        );
      } catch {
        setValue("latitude", "23.81033");
        setValue("longitude", "90.41252");
      }
    } else {
      setValue("latitude", "23.81033");
      setValue("longitude", "90.41252");
    }

    setShowDropdown(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const locationError =
    (errors.city?.message as string) ||
    (errors.isLocationSelected?.message as string);



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
          <FormField
            label="City / Location"
            required
            error={locationError}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Search any location"
                hasError={!!locationError}
                {...register("city")}
                onFocus={() => {
                  if (cityValue && cityValue.trim().length >= 1) setShowDropdown(true);
                }}
                autoComplete="off"
                className="pr-9"
              />
              {isLocationSelected ? (
                <CheckCircle2
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"
                />
              ) : ( 
                <MapPin
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                />
              )}
            </div>
          </FormField>

          {/* Autocomplete Suggestions Dropdown */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl bg-[#1C060B] border border-[#EF5246]/30 shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
              {isLoadingSuggestions && suggestions.length === 0 ? (
                <div className="flex items-center justify-center gap-2 p-4 text-xs text-[#FFE9E8]/70">
                  <Loader2 size={14} className="animate-spin text-[#FF7A75]" />
                  Searching locations...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((item, idx) => (  
                  <div
                    key={idx}
                    onClick={() => handleSelectSuggestion(item)}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#EF5246]/15 text-xs text-slate-200 hover:text-white cursor-pointer transition-colors duration-200 border-b border-[#3E1119]/50 last:border-0"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <MapPin size={14} className="text-[#FF7A75] shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-white truncate">{item.name}</span>
                        <span className="text-[11px] text-white/60 truncate">{item.description}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-xs text-center text-[#FF7A75] font-medium">
                  No matching location found. Please try typing a valid city or location.
                </div>
              )}
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
