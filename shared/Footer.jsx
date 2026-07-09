"use client";
import { useState } from "react";
import Link from "next/link";
import { useGetAboutSystemQuery, useContactUsMutation } from "../lib/redux/features/cms/cmsApi";

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services/moving" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { data } = useGetAboutSystemQuery();
  const [contactUs, { isLoading: emailLoading }] = useContactUsMutation();

  const system = data?.data?.about_system;
  const socials = data?.data?.social_media || [];

  const location =
    system?.location ||
    "120 King Street West, Suite 1400, Toronto, Ontario, Canada";
  const emailAddr = system?.email || "hello@cleanzy.ca";
  const phone = system?.phone || "+1 (416) 555-0198";
  const copyright = system?.copyright || "©2026 EASY LIFT AND CLEAN";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "").replace("/api", "");

  return (
    <footer className="w-full px-2 pb-2 pt-14 bg-transparent">
      <div className="w-full bg-[#08203C] rounded-3xl flex flex-col gap-16">
        {/* TOP */}
        <div className="p-5 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-8 px-0 sm:px-4 lg:px-6">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              <div className="relative flex items-center gap-3">
                <h3
                  className="text-white text-xl sm:text-2xl font-semibold leading-[140%]"
                  style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                >
                  Stay Updated with
                </h3>
                <Link
                  href="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-34 md:w-55 object-contain cursor-pointer"
                  />
                </Link>
              </div>

              <p
                className="text-[#E0E0E0] text-base font-bold leading-[140%] m-0"
                style={{ fontFamily: '"Rethink Sans", sans-serif' }}
              >
                Get cleaning tips, special offers, and updates delivered to your inbox.
              </p>

              <div
                className="flex items-center justify-between w-full rounded-full"
                style={{ background: "rgba(255,255,255,0.16)", padding: "4px 4px 4px 24px" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  autoComplete="off"
                  className="bg-transparent border-none outline-none text-white text-sm placeholder-white/50 flex-1"
                  style={{
                    fontFamily: '"Rethink Sans", sans-serif',
                    WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                    WebkitTextFillColor: "white",
                    caretColor: "white",
                    background: "transparent",
                    backgroundClip: "text",
                  }}
                />
                <button
                  onClick={async () => {
                    if (!email) return;
                    if (!/\S+@\S+\.\S+/.test(email)) {
                      setEmailError("Valid email required.");
                      return;
                    }
                    try {
                      await contactUs({
                        name: "Newsletter",
                        email,
                        purpose: "general_inquiry",
                        message: "Newsletter subscription request.",
                      }).unwrap();
                      setEmailSent(true);
                      setEmail("");
                      setEmailError("");
                      setTimeout(() => setEmailSent(false), 4000);
                    } catch {
                      setEmailError("Failed. Try again.");
                    }
                  }}
                  className="flex items-center justify-center w-11 h-11 rounded-3xl bg-white shrink-0 hover:scale-105 transition-all duration-300 border-none cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 9H15M15 9L9 3M15 9L9 15"
                      stroke="#08203C"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {emailSent && (
                <p className="text-green-400 text-xs mt-1" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                  ✅ Subscribed successfully!
                </p>
              )}
              {emailError && (
                <p className="text-red-400 text-xs mt-1" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                  {emailError}
                </p>
              )}
            </div>

            {/* RIGHT — Links */}
            <div className="flex gap-12 sm:gap-16 lg:gap-20">
              <div className="flex flex-col gap-6 w-42">
                <h4
                  className="text-white text-base font-semibold leading-[140%] m-0"
                  style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                >
                  Quick Links
                </h4>
                <div className="flex flex-col gap-4">
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-[#E0E0E0] text-sm no-underline hover:text-white transition-colors duration-200"
                      style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 w-42">
                <h4
                  className="text-white text-base font-semibold leading-[140%] m-0"
                  style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                >
                  Legal
                </h4>
                <div className="flex flex-col gap-4">
                  {LEGAL_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-[#E0E0E0] text-sm no-underline hover:text-white transition-colors duration-200"
                      style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM WHITE BOX */}
        <div className="p-2">
          <div className="w-full bg-white rounded-2xl p-8 sm:p-10 lg:p-12 flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-12">
            {/* Location */}
            <div className="flex flex-col gap-2 flex-1 min-w-45">
              <p className="text-[#444] text-base font-bold leading-[140%] m-0" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                Our Location
              </p>
              <p className="text-[#111] text-lg sm:text-xl font-medium leading-[140%] m-0" style={{ fontFamily: '"Rethink Sans", sans-serif', letterSpacing: "-0.78px" }}>
                {location}
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 flex-1 min-w-40">
              <p className="text-[#444] text-base font-bold leading-[140%] m-0" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                Email
              </p>
              <a
                href={`mailto:${emailAddr}`}
                className="text-[#111] text-lg sm:text-xl font-medium leading-[140%] no-underline hover:opacity-70 transition-opacity"
                style={{ fontFamily: '"Rethink Sans", sans-serif', letterSpacing: "-0.78px" }}
              >
                {emailAddr}
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2 flex-1 min-w-40">
              <p className="text-[#444] text-base font-bold leading-[140%] m-0" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                Phone
              </p>
              <a
                href={`tel:${phone}`}
                className="text-[#111] text-lg sm:text-xl font-medium leading-[140%] no-underline hover:opacity-70 transition-opacity"
                style={{ fontFamily: '"Rethink Sans", sans-serif', letterSpacing: "-0.78px" }}
              >
                {phone}
              </a>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-2 flex-1 min-w-40">
              <p className="text-[#444] text-base font-bold leading-[140%] m-0" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                Social Media
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline px-4 py-1.5 rounded-full border border-[#E0E0E0] text-[#111] text-sm font-medium hover:bg-[#08203C] hover:text-white hover:border-[#08203C] transition-all duration-300 flex items-center gap-2"
                    style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                  >
                    {s.icon && (
                      <img
                        src={s.icon.startsWith("/media") ? `${baseUrl}${s.icon}` : s.icon}
                        alt={s.name}
                        className="w-4 h-4 object-contain"
                      />
                    )}
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p
            className="text-center text-white/50 text-xs py-4 m-0"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}