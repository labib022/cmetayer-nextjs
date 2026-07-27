"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../lib/redux/features/auth/authApi";

const EyeOpen = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function ResetPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [email, setEmail] = useState("");

  const router = useRouter();

  // verify-code page থেকে sessionStorage-এ সেভ করা email এখানে পড়ছি
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail") || "";
    setEmail(savedEmail);
  }, []);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await resetPassword({
        email,
        new_password: form.newPassword,
        confirm_password: form.confirmPassword,
      }).unwrap();
      toast.success("Password reset successful!");
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("verifyEmail");
      sessionStorage.removeItem("verifyFlow");
      router.push("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-120 flex flex-col items-center gap-9 p-8 rounded-4xl bg-[#FAFAFA]">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center"> 
          <h1 className="font-rethink text-[#1F1F1F] text-2xl font-medium leading-[140%] tracking-[-0.936px] m-0">
            Reset your password
          </h1>
          <p className="font-rethink text-[#595959] text-base font-normal leading-[140%] text-center m-0 w-full max-w-88">
            One more step to get your account back, let's reset your password!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label className="font-rethink text-[#0B1714] text-base font-semibold leading-[140%]">
              New Password
            </label>
            <div className="relative w-full">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter your new password"
                value={form.newPassword}
                onChange={handleChange("newPassword")}
                required
                disabled={isLoading}
                className="font-rethink w-full outline-none transition-all duration-200 px-4 py-3.5 pr-12 rounded-xl border border-[#E2E6EF] bg-white text-[#1F1F1F] text-[15px] focus:border-[#08203C] disabled:opacity-60"
                onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E6EF")}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#08203C] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                {showNew ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-2">
            <label className="font-rethink text-[#0B1714] text-base font-semibold leading-[140%]">
              Confirm New Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your new password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                required
                disabled={isLoading}
                className="font-rethink w-full outline-none transition-all duration-200 px-4 py-3.5 pr-12 rounded-xl border border-[#E2E6EF] bg-white text-[#1F1F1F] text-[15px] focus:border-[#08203C] disabled:opacity-60"
                onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E6EF")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#08203C] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                {showConfirm ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="font-rethink w-full flex items-center justify-center gap-2 py-4 px-5 rounded-[40px] bg-[#08203C] text-white text-base font-semibold leading-[140%] text-center border-none cursor-pointer hover:opacity-90 transition-opacity duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
}