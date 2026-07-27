"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../../lib/firebase/firebase.config";
import { useSignUpMutation, useGoogleAuthMutation } from "../../../lib/redux/features/auth/authApi";
import { setCredentials } from "../../../lib/redux/features/auth/authSlice";
import { RegisterSkeleton } from "../../../components/common/Skeleton";

const googleIcon = "/icons/arrow-icon.svg";

const inputBase = "w-full outline-none transition-all duration-200 px-4 py-3.5 rounded-xl border border-[#E2E6EF] bg-white text-[#1F1F1F] text-[15px] focus:border-[#08203C]";

export default function Register() {
  const router   = useRouter();
  const dispatch = useDispatch();

  const [signUp, { isLoading }] = useSignUpMutation();
  const [googleAuth] = useGoogleAuthMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Privacy Policy and Terms and Condition!");
      return;
    }
    try {
      await signUp({
        full_name: form.fullName,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
        privacy_and_terms_accepted: true,
      }).unwrap();
      toast.success("Registration successful! Please verify your email.");
      sessionStorage.setItem("verifyEmail", form.email);
      sessionStorage.setItem("verifyFlow", "signup");
      router.push("/verify-code");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const firebaseResult = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(firebaseResult);
      const oauthIdToken = credential?.idToken;
      const accessToken = credential?.accessToken;
      if (!oauthIdToken) throw new Error("Unable to retrieve Google OAuth ID token.");
      const result = await googleAuth({ id_token: oauthIdToken, access_token: accessToken }).unwrap();
      dispatch(setCredentials({
        user: result.data.user,
        access: result.data.access,
        refresh: result.data.refresh,
      }));
      toast.success("Google login successful!");
      router.push("/");
    } catch (err) {
      if (err?.code === "auth/popup-closed-by-user") return;
      toast.error(err?.data?.message || err.message || "Google login failed. Try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (isGoogleLoading) return <RegisterSkeleton />;

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#F0F0F0] px-4 py-10">

      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2E6EF] text-[#0B1714] text-sm font-semibold bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#08203C] hover:text-white hover:border-[#08203C]"
          style={{ fontFamily: '"Rethink Sans", sans-serif' }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      <div className="w-full max-w-120 flex flex-col items-center gap-9 p-8 rounded-4xl bg-[#FAFAFA]">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[#1F1F1F] text-2xl font-medium leading-[140%] tracking-[-0.936px] m-0"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            Sign up for an account
          </h1>
          <p className="text-[#595959] text-base font-normal leading-[140%] text-center m-0"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            Sign up now for your account!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0B1714] text-base font-semibold leading-[140%]"
              style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Full Name</label>
            <input type="text" placeholder="Enter your full name" value={form.fullName}
              onChange={handleChange("fullName")} required className={inputBase}
              style={{ fontFamily: '"Rethink Sans", sans-serif' }} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0B1714] text-base font-semibold leading-[140%]"
              style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Email Address</label>
            <input type="email" placeholder="Enter your email address" value={form.email}
              onChange={handleChange("email")} required className={inputBase}
              style={{ fontFamily: '"Rethink Sans", sans-serif' }} />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0B1714] text-base font-semibold leading-[140%]"
              style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Password</label>
            <div className="relative w-full">
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                value={form.password} onChange={handleChange("password")} required
                className={`${inputBase} pr-12`} style={{ fontFamily: '"Rethink Sans", sans-serif' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#08203C] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0">
                {showPassword ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0B1714] text-base font-semibold leading-[140%]"
              style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Confirm Password</label>
            <div className="relative w-full">
              <input type={showConfirm ? "text" : "password"} placeholder="Confirm your password"
                value={form.confirmPassword} onChange={handleChange("confirmPassword")} required
                className={`${inputBase} pr-12`} style={{ fontFamily: '"Rethink Sans", sans-serif' }} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#08203C] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0">
                {showConfirm ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[#E2E6EF] accent-[#08203C] cursor-pointer shrink-0" />
            <label htmlFor="terms" className="text-[#595959] text-sm leading-[140%] cursor-pointer"
              style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
              By creating an account, you agreeing to our{" "}
              <Link href="/privacy-policy" className="text-[#08203C] font-bold no-underline hover:underline">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="/terms-and-conditions" className="text-[#08203C] font-bold no-underline hover:underline">
                Terms and Condition
              </Link>
            </label>
          </div>

          {/* Sign Up Button */}
          <button type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-[40px] bg-[#08203C] text-white text-base font-semibold leading-[140%] border-none cursor-pointer hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Sign In Link */}
          <p className="text-[#595959] text-[15px] font-normal m-0 text-center"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            Already had an account?{" "}
            <Link href="/login" className="text-[#08203C] font-bold no-underline hover:underline transition-all duration-200">
              Sign in
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-[#E2E6EF]" />
            <span className="text-[#888] text-sm" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>or</span>
            <div className="flex-1 h-px bg-[#E2E6EF]" />
          </div>

          {/* Google Sign Up */}
          <button type="button" onClick={handleGoogleLogin} disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-[40px] bg-[#1F1F1F] text-white text-base font-semibold leading-[140%] border-none cursor-pointer hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            <img src={googleIcon} alt="Google" className="w-5 h-5"
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
            {isGoogleLoading ? "Connecting..." : "Sign Up With Google"}
          </button>

        </form>
      </div>
    </div>
  );
}