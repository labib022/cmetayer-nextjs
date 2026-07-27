"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../../../lib/redux/features/auth/authApi";

const TIMER_SECONDS = 180;

export default function VerifyCode() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [flow, setFlow] = useState("verify-account");

  // sessionStorage থেকে email/flow পড়ছি — client-side এ, mount হওয়ার পরে
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("verifyEmail") || "";
    const savedFlow = sessionStorage.getItem("verifyFlow") || "verify-account";
    setEmail(savedEmail);
    setFlow(savedFlow);
  }, []);

  const purpose = flow === "forgot-password" ? "password_reset" : "signup";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const inputRefs = useRef([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...code];
    updated[i] = val;
    setCode(updated);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const updated = [...code];
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setCode(updated);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    try {
      const result = await verifyOtp({
        email,
        otp: fullCode,
        purpose,
      }).unwrap();
      toast.success("Email verified successfully!");

      if (flow === "forgot-password") {
        sessionStorage.setItem("resetEmail", email);
        router.push("/reset-password");
      } else {
        sessionStorage.removeItem("verifyEmail");
        sessionStorage.removeItem("verifyFlow");
        router.push("/login");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Invalid or expired code. Please try again.",
      );
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email, purpose }).unwrap();
      toast.success("Code resent successfully!");
      setTimer(TIMER_SECONDS);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-120 flex flex-col items-center gap-9 p-8 rounded-4xl bg-[#FAFAFA]">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-rethink text-[#1F1F1F] text-2xl font-medium leading-[140%] tracking-[-0.936px] m-0">
            Enter the Code We've Sent
          </h1>
          <p className="font-rethink text-[#595959] text-base font-normal leading-[140%] text-center m-0">
            We've sent a 6-digit verification code to{" "}
            <span className="font-semibold text-[#08203C]">{email}</span>.
            Please enter it below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* 6 Code Inputs */}
          <div className="flex items-center justify-between gap-2 w-full">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="font-rethink text-center text-xl font-semibold text-[#08203C] outline-none transition-all duration-200 bg-[#F5F5F5] rounded-sm border border-[#08203C] focus:bg-white focus:shadow-md"
                style={{ width: "65.667px", height: "75px" }}
              />
            ))}
          </div>

          {/* Resend + Timer row */}
          <div className="flex items-center justify-between w-full">
            <p className="font-rethink text-[#595959] text-sm font-normal leading-5 m-0">
              Didn't receive a code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || timer > 0}
                className="font-rethink text-[#002426] text-sm font-normal leading-5 bg-transparent border-none cursor-pointer p-0 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? "Sending..." : "Send again"}
              </button>
            </p>
            <span
              className={`font-rethink text-sm font-normal leading-5 ${timer > 0 ? "text-[#079455]" : "text-[#595959]"}`}
            >
              {timer > 0 ? formatTime(timer) : "Expired"}
            </span>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="font-rethink w-full flex items-center justify-center gap-2 py-4 px-5 rounded-[40px] bg-[#08203C] text-white text-base font-semibold leading-[140%] text-center border-none cursor-pointer hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : "Confirm"}
          </button>

          {/* Back to Login */}
          <p className="font-rethink text-[#595959] text-[15px] font-normal m-0 text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-rethink text-[#08203C] font-bold no-underline hover:underline transition-all duration-200"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}