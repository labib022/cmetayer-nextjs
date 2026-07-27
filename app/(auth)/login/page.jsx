"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "../../../lib/firebase/firebase.config";
import { useSignInMutation, useGoogleAuthMutation } from "../../../lib/redux/features/auth/authApi";
import { setCredentials } from "../../../lib/redux/features/auth/authSlice";
import { LoginSkeleton } from "../../../components/common/Skeleton";

const googleIcon = "/icons/google-logo.svg";

const inputBase =
  "w-full outline-none transition-all duration-200 px-4 py-3.5 rounded-xl border border-[#E2E6EF] bg-white text-[#1F1F1F] text-[15px] focus:border-[#08203C] font-[Rethink_Sans]";

const isMobile = () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function Login() {
  const router   = useRouter();
  const dispatch = useDispatch();

  const [showPassword,    setShowPassword]    = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const [signIn,     { isLoading }] = useSignInMutation();
  const [googleAuth]                = useGoogleAuthMutation();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const firebaseResult = await getRedirectResult(auth);
        if (!firebaseResult) return;
        const credential   = GoogleAuthProvider.credentialFromResult(firebaseResult);
        const oauthIdToken = credential?.idToken;
        const accessToken  = credential?.accessToken;
        if (!oauthIdToken) return;
        setIsGoogleLoading(true);
        const result = await googleAuth({ id_token: oauthIdToken, access_token: accessToken }).unwrap();
        dispatch(setCredentials({
          user:    result.data.user,
          access:  result.data.access,
          refresh: result.data.refresh,
        }));
        toast.success("Google login successful!");
        router.push("/");
      } catch {
        // no redirect result — normal page load, ignore
      } finally {
        setIsGoogleLoading(false);
      }
    };
    handleRedirectResult();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn({ email: form.email, password: form.password }).unwrap();
      dispatch(setCredentials({
        user:    result.data.user,
        access:  result.data.access,
        refresh: result.data.refresh,
      }));
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      const data = err?.data;
      if (data?.field === "otp") {
        toast.error("Account not verified. Redirecting to OTP...");
        sessionStorage.setItem("verifyEmail", form.email);
        sessionStorage.setItem("verifyFlow", "verify-account");
        router.push("/verify-code");
      } else {
        toast.error(data?.message || "Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      if (isMobile()) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      const firebaseResult = await signInWithPopup(auth, googleProvider);
      const credential   = GoogleAuthProvider.credentialFromResult(firebaseResult);
      const oauthIdToken = credential?.idToken;
      const accessToken  = credential?.accessToken;
      if (!oauthIdToken) throw new Error("Unable to retrieve Google OAuth ID token.");
      const result = await googleAuth({ id_token: oauthIdToken, access_token: accessToken }).unwrap();
      dispatch(setCredentials({
        user:    result.data.user,
        access:  result.data.access,
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

  if (isGoogleLoading) return <LoginSkeleton />;

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

      <div className="w-full max-w-120 flex flex-col items-center gap-8 p-8 rounded-4xl bg-[#FAFAFA]">

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[#1F1F1F] text-2xl font-medium leading-[140%] tracking-[-0.936px] m-0"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Welcome Back!</h1>
          <p className="text-[#595959] text-base font-normal leading-[140%] text-center m-0"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            Been a while! Ready to dive back in? Let's get you signed in and back to business!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[#0B1714] text-base font-semibold leading-[140%]"
              style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Email Address</label>
            <input type="email" placeholder="Enter your email address" value={form.email}
              onChange={handleChange("email")} required className={inputBase}
              style={{ fontFamily: '"Rethink Sans", sans-serif' }} />
          </div>

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
            <div className="flex justify-end">
              <Link href="/forgot-password"
                className="text-[#08203C] text-sm font-medium no-underline hover:underline transition-all duration-200"
                style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 px-5 rounded-[40px] bg-[#08203C] text-white text-base font-semibold leading-[140%] border-none cursor-pointer hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-[#E2E6EF]" />
            <span className="text-[#888] text-sm" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>or</span>
            <div className="flex-1 h-px bg-[#E2E6EF]" />
          </div>

          <button type="button" onClick={handleGoogleLogin} disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-[40px] bg-[#1F1F1F] text-white text-base font-semibold leading-[140%] border-none cursor-pointer hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            <img src={googleIcon} alt="Google" className="w-5 h-5"
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
            {isGoogleLoading ? "Connecting..." : "Sign In With Google"}
          </button>
        </form>

        <p className="text-[#595959] text-[15px] font-normal m-0 text-center"
          style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
          Doesn't have an account?{" "}
          <Link href="/register" className="text-[#08203C] font-bold no-underline hover:underline transition-all duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}