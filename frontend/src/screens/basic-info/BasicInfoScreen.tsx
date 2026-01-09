"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import { supabase } from "@/lib/supabaseClient";

type SexOption = "female" | "male" | "intersex" | "prefer_not_to_say";

export default function BasicInfoScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [timeZone, setTimeZone] = useState("");
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<SexOption | "">("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("in");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lb");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) setTimeZone(detected);
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timer = window.setTimeout(() => setErrors({}), 3000);
    return () => window.clearTimeout(timer);
  }, [errors]);

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!firstName.trim()) nextErrors.firstName = "First name is required.";
      if (!age.trim()) nextErrors.age = "Age is required.";
    }

    if (step === 2) {
      if (!sex) nextErrors.sex = "Please select one option.";
    }

    if (step === 3) {
      if (!height.trim()) nextErrors.height = "Height is required.";
      if (!weight.trim()) nextErrors.weight = "Weight is required.";
      if (!timeZone.trim()) nextErrors.timeZone = "Time zone is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFinish = async () => {
    if (!validateStep()) return;
    setGeneralError("");
    setIsSubmitting(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setIsSubmitting(false);
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      first_name: firstName.trim(),
      age: age ? Number(age) : null,
      sex: sex || null,
      height: height ? Number(height) : null,
      height_unit: heightUnit,
      weight: weight ? Number(weight) : null,
      weight_unit: weightUnit,
      time_zone: timeZone.trim(),
      basic_info_completed: true,
    });

    if (error) {
      setGeneralError("Could not save your info. Please try again.");
      setIsSubmitting(false);
      return;
    }

    window.setTimeout(() => {
      router.push("/todays-nudge");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header theme="dark" />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-gray-900">
              <span className="h-2 w-2 rounded-full bg-[#578e7a]" />
              Basic info
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">Nutrition</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">Sleep</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">Notifications</span>
          </div>
          <button
            type="button"
            className="underline hover:text-gray-800"
            onClick={() => setShowSkipModal(true)}
          >
            Skip for now
          </button>
        </div>

        <div className="mt-6 h-1 w-full bg-gray-100 rounded">
          <div
            className="h-1 bg-[#578e7a] rounded"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-red-500 min-h-[1rem]">
          {generalError}
        </p>

        {step === 1 && (
          <section className="mt-10 space-y-6">
            <header>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Basic info · {step}/3
              </p>
              <h1 className="text-2xl font-semibold text-gray-900">
                Let’s start with the basics
              </h1>
              <p className="text-gray-600 mt-2">
                Name and age help Liv personalize the experience.
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  First name
                </span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#578e7a]"
                  placeholder="Jane"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <p className="mt-2 text-xs text-red-500 min-h-[1rem]">
                  {errors.firstName || ""}
                </p>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Age</span>
                <input
                  type="number"
                  min="18"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#578e7a]"
                  placeholder="34"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
                <p className="mt-2 text-xs text-red-500 min-h-[1rem]">
                  {errors.age || ""}
                </p>
              </label>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="mt-10 space-y-6">
            <header>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Basic info · {step}/3
              </p>
              <h1 className="text-2xl font-semibold text-gray-900">Sex</h1>
              <p className="text-gray-600 mt-2">
                This helps tailor certain health guidance.
              </p>
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["female", "Female"],
                ["male", "Male"],
                ["intersex", "Intersex"],
                ["prefer_not_to_say", "Prefer not to say"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-3 rounded-md border border-gray-200 px-4 py-3 cursor-pointer hover:border-gray-400"
                >
                  <input
                    type="radio"
                    name="sex"
                    value={value}
                    className="h-4 w-4"
                    checked={sex === value}
                    onChange={() => setSex(value as SexOption)}
                  />
                  <span className="text-gray-800">{label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-red-500 min-h-[1rem]">
              {errors.sex || ""}
            </p>
          </section>
        )}

        {step === 3 && (
          <section className="mt-10 space-y-6">
            <header>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Basic info · {step}/3
              </p>
              <h1 className="text-2xl font-semibold text-gray-900">
                Height, weight, and time zone
              </h1>
              <p className="text-gray-600 mt-2">
                We’ll use this to personalize nudges and timing.
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Height</span>
                <div className="mt-2 flex gap-3">
                  <input
                    type="number"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#578e7a]"
                    placeholder="68"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                  />
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 bg-white"
                    value={heightUnit}
                    onChange={(event) => setHeightUnit(event.target.value)}
                  >
                    <option value="in">in</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
                <p className="mt-2 text-xs text-red-500 min-h-[1rem]">
                  {errors.height || ""}
                </p>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Weight</span>
                <div className="mt-2 flex gap-3">
                  <input
                    type="number"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#578e7a]"
                    placeholder="150"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                  />
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 bg-white"
                    value={weightUnit}
                    onChange={(event) => setWeightUnit(event.target.value)}
                  >
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
                <p className="mt-2 text-xs text-red-500 min-h-[1rem]">
                  {errors.weight || ""}
                </p>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Time zone</span>
              <input
                type="text"
                value={timeZone}
                onChange={(event) => setTimeZone(event.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#578e7a]"
              />
              <p className="mt-2 text-xs text-red-500 min-h-[1rem]">
                {errors.timeZone || ""}
              </p>
            </label>
          </section>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-40"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              className="rounded-md bg-[#578e7a] px-6 py-2 text-white hover:bg-[#4b7a67]"
              onClick={() => {
                if (validateStep()) {
                  setStep((prev) => Math.min(3, prev + 1));
                }
              }}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md bg-[#578e7a] px-6 py-2 text-white hover:bg-[#4b7a67]"
              onClick={handleFinish}
            >
              Finish
            </button>
          )}
        </div>
      </main>

      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900">
              You can skip for now
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The more we know, the more personalized your nudges and coaching
              will be. You can always complete this later in your profile.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setShowSkipModal(false)}
              >
                Keep going
              </button>
              <button
                type="button"
                className="rounded-md bg-[#578e7a] px-4 py-2 text-sm text-white hover:bg-[#4b7a67]"
                onClick={() => router.push("/")}
              >
                Skip anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center space-y-3">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#578e7a] border-t-transparent" />
            <p className="text-sm text-gray-600">
              Personalizing your plan...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
