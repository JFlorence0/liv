"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import { getTimeZonesWithMemo } from "@/utils/time-zones";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface ProfileFormData {
  firstName: string;
  age: string;
  sex: string;
  timeZone: string;
  height: string;
  heightUnit: "in" | "cm";
  weight: string;
  weightUnit: "lb" | "kg";
}

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  searchable = false,
  placeholder,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  searchable?: boolean;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - buttonRect.bottom;
      const optionsHeight = Math.min(options.length * 40, 240);

      setOpenUpward(spaceBelow < optionsHeight + 20);
    }
  }, [isOpen, options.length]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions =
    searchable && searchTerm
      ? options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between text-left text-gray-700 bg-white border rounded-md py-2.5 px-3 hover:border-gray-400 focus:border-gray-500 focus:outline-none transition-colors duration-200 border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        ref={buttonRef}
      >
        <span className="truncate text-gray-700">
          {value || placeholder || label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 w-full ${
            openUpward ? "bottom-full mb-2 animate-fadeInUp" : "top-full mt-2 animate-fadeIn"
          } bg-white shadow-lg rounded-md max-h-60 overflow-auto border border-gray-200`}
          role="listbox"
        >
          {searchable && (
            <div className="sticky top-0 p-2 bg-white">
              <input
                type="text"
                ref={searchInputRef}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className="px-4 py-2.5 text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors duration-200 first:rounded-t-md last:rounded-b-md"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={value === option}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2.5 text-gray-500 italic">
              No options match your search
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const RadioGroup = ({
  options,
  value,
  onChange,
  inline = false,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  inline?: boolean;
}) => {
  return (
    <div className={`flex ${inline ? "flex-row gap-6" : "flex-col gap-3"}`}>
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="radio"
              className="sr-only"
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <div
              className={`mr-3 w-4 h-4 border-2 ${
                value === option ? "border-gray-800 bg-gray-800" : "border-gray-400"
              } rounded-full flex items-center justify-center transition-colors duration-200 group-hover:border-gray-600`}
            >
              {value === option && (
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-gray-700 text-sm">{option}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default function ProfileScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    age: "",
    sex: "",
    timeZone: "",
    height: "",
    heightUnit: "in",
    weight: "",
    weightUnit: "lb",
  });

  const ageOptions = Array.from({ length: 93 }, (_, i) => (i + 18).toString());
  const timeZones = getTimeZonesWithMemo();

  const normalizeSex = (value?: string | null) => {
    if (!value) return "";
    const trimmed = value.trim().toLowerCase();
    if (trimmed === "male") return "Male";
    if (trimmed === "female") return "Female";
    return value;
  };

  useEffect(() => {
    let isMounted = true;

    const hydrateProfile = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user || !isMounted) {
          setIsLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select(
            "first_name, age, sex, time_zone, height, height_unit, weight, weight_unit"
          )
          .eq("id", user.id)
          .maybeSingle();

        if (!isMounted || !profile) {
          setIsLoading(false);
          return;
        }

        setFormData((prev) => ({
          ...prev,
          firstName: profile.first_name ?? "",
          age: profile.age ? String(profile.age) : "",
          sex: normalizeSex(profile.sex),
          timeZone: profile.time_zone ?? "",
          height: profile.height ? String(profile.height) : "",
          heightUnit: profile.height_unit === "cm" ? "cm" : "in",
          weight: profile.weight ? String(profile.weight) : "",
          weightUnit: profile.weight_unit === "kg" ? "kg" : "lb",
        }));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    hydrateProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const parseNumber = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isNaN(parsed) ? null : parsed;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#578E7AA8] text-white">
        <Header />
      </div>

      <div className="mx-auto px-8 py-12 max-w-6xl">
        {isLoading && (
          <div className="py-20 text-center text-gray-500">Loading profile...</div>
        )}

        {!isLoading && currentStep === 1 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setCurrentStep(2);
            }}
          >
            <div className="grid grid-cols-1 gap-12">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Step 1 of 2</p>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-[#578e7a] h-1 w-[50%] rounded rounded-br-[0px] rounded-tr-[0px]"></div>
                    <div className="bg-gray-200 h-1 w-[50%] rounded rounded-bl-[0px] rounded-tl-[0px]"></div>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                  Help Liv personalize your coaching
                </h1>
                <p className="text-gray-600">
                  These essentials are required so we can give you the most
                  relevant nudges and challenges from day one.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        First Name*
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(event) =>
                          updateField("firstName", event.target.value)
                        }
                        placeholder="Enter your first name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#578e7a] focus:border-transparent border-gray-300"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Age*
                      </label>
                      <Dropdown
                        label="Select your age"
                        placeholder="Select your age"
                        options={ageOptions}
                        value={formData.age}
                        onChange={(value) => updateField("age", value)}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Sex*
                      </label>
                      <RadioGroup
                        options={["Male", "Female"]}
                        value={formData.sex}
                        onChange={(value) => updateField("sex", value)}
                        inline={true}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Time Zone* (for 6am Nudge Delivery)
                      </label>
                      <Dropdown
                        label="Select your time zone"
                        placeholder="Select your time zone"
                        options={timeZones}
                        value={formData.timeZone}
                        onChange={(value) => updateField("timeZone", value)}
                        searchable={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-sm text-gray-600 font-medium mb-4">
                  We&apos;ll collect more details in the next step
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-[#578e7a] hover:bg-[#4a7a68] text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer"
                  >
                    Update &amp; Continue →
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {!isLoading && currentStep === 2 && (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setIsSaving(true);
              try {
                const { data } = await supabase.auth.getUser();
                const user = data.user;
                if (!user) {
                  toast.error("Please log in again to update your profile.");
                  return;
                }

                const {
                  data: sessionData,
                } = await supabase.auth.getSession();
                const accessToken = sessionData.session?.access_token;
                if (!accessToken) {
                  toast.error("Please log in again to update your profile.");
                  return;
                }

                const apiBase =
                  process.env.NEXT_PUBLIC_BACKEND_URL ||
                  "http://localhost:8000";

                const response = await fetch(`${apiBase}/profiles/me`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({
                    first_name: formData.firstName.trim() || null,
                    age: parseNumber(formData.age),
                    sex: formData.sex || null,
                    time_zone: formData.timeZone || null,
                    height: parseNumber(formData.height),
                    height_unit: formData.heightUnit,
                    weight: parseNumber(formData.weight),
                    weight_unit: formData.weightUnit,
                  }),
                });

                if (!response.ok) {
                  const errorBody = await response.json().catch(() => ({}));
                  const message =
                    errorBody?.detail?.message ||
                    errorBody?.detail?.hint ||
                    "Failed to update profile.";
                  throw new Error(message);
                }

                toast.success("Profile updated successfully!");

                setTimeout(() => {
                  router.push("/todays-nudge");
                }, 800);
              } catch {
                toast.error("Failed to update profile. Please try again.");
              } finally {
                setIsSaving(false);
              }
            }}
          >
            <div className="grid grid-cols-1 gap-12">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Step 2 of 2</p>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-[#578e7a] h-1 w-[50%] rounded rounded-br-[0px] rounded-tr-[0px]"></div>
                    <div className="bg-[#578e7a] h-1 w-[50%] rounded rounded-bl-[0px] rounded-tl-[0px]"></div>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                  Complete your profile
                </h1>
                <p className="text-gray-600 mb-12">
                  Help us personalize your coaching experience with a few more details.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-1">
                        Height
                      </label>
                      <p className="text-sm text-gray-500 mb-3">
                        Select a unit, then enter your height.
                      </p>
                      <div className="space-y-3">
                        <RadioGroup
                          options={["in", "cm"]}
                          value={formData.heightUnit === "cm" ? "cm" : "in"}
                          onChange={(value) =>
                            updateField(
                              "heightUnit",
                              value === "cm" ? "cm" : "in"
                            )
                          }
                          inline={true}
                        />
                        <input
                          type="number"
                          value={formData.height}
                          onChange={(event) =>
                            updateField("height", event.target.value)
                          }
                          placeholder={formData.heightUnit === "cm" ? "cm" : "in"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          min={formData.heightUnit === "cm" ? "100" : "36"}
                          max={formData.heightUnit === "cm" ? "250" : "96"}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-1">
                        Weight
                      </label>
                      <p className="text-sm text-gray-500 mb-3">
                        Select a unit, then enter your weight.
                      </p>
                      <div className="space-y-3">
                        <RadioGroup
                          options={["lb", "kg"]}
                          value={formData.weightUnit}
                          onChange={(value) =>
                            updateField("weightUnit", value)
                          }
                          inline={true}
                        />
                        <input
                          type="number"
                          value={formData.weight}
                          onChange={(event) =>
                            updateField("weight", event.target.value)
                          }
                          placeholder={formData.weightUnit}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          min={formData.weightUnit === "lb" ? "50" : "20"}
                          max={formData.weightUnit === "lb" ? "500" : "200"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4 mt-12">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-[#578e7a] hover:bg-[#4a7a68] text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSaving ? "Updating..." : "Update Profile"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium underline transition-colors duration-200 cursor-pointer"
                  >
                    Back to Step 1
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
