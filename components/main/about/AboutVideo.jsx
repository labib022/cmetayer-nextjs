"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// ✅ redux path fix: redux/ → lib/redux/
import { useGetAboutUsPageQuery } from "../../../lib/redux/features/cms/cmsApi";

// ✅ assets/ import বাদ — public/ folder এর সরাসরি path
const videoThumbSrc = "/images/about-video-img.png";

const SOCIAL_LINKS = [
  { icon: <FaFacebookF size={16} />, href: "https://facebook.com" },
  { icon: <FaInstagram size={16} />, href: "https://instagram.com" },
  { icon: <FaXTwitter size={16} />, href: "https://x.com" },
  { icon: <FaLinkedinIn size={16} />, href: "https://linkedin.com" },
];

export default function AboutVideo() {
  const [playing, setPlaying] = useState(false);
  const { data, isLoading } = useGetAboutUsPageQuery();

  const settings = data?.data?.about_us?.settings?.[0] || {};

  const title = settings.foundation_title || "Trust, quality, and an awesome home!";
  const description =
    settings.foundation_description ||
    "We are a dedicated home services company delivering quality solutions for your home, from plumbing to deep cleaning.";
  const videoUrl = settings.videos || "";
  const thumbnail = settings.image || videoThumbSrc;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-300 mx-auto flex flex-col gap-10">

        {/* HEADER ROW */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {isLoading ? (
            <>
              <div className="h-10 w-80 bg-gray-200 rounded animate-pulse" />
              <div className="h-20 w-96 bg-gray-100 rounded animate-pulse" />
            </>
          ) : (
            <>
              <h2 className="font-rethink text-[#0B1714] font-medium leading-[120%] tracking-[-1.56px] m-0 text-3xl sm:text-4xl lg:text-[40px] w-full max-w-100">
                {title}
              </h2>
              <p className="font-rethink text-[#656565] text-base font-normal leading-[140%] m-0 w-full pt-6 max-w-116">
                {description}
              </p>
            </>
          )}
        </div>

        {/* VIDEO + SOCIAL ROW */}
        <div className="flex items-stretch gap-4">

          {/* Video Container */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{ borderRadius: "20px", height: "641px", backgroundColor: "#000" }}
          >
            {!playing ? (
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setPlaying(true)}
                style={{
                  borderRadius: "20px",
                  background: `linear-gradient(0deg, rgba(65,65,65,0.31) 0%, rgba(65,65,65,0.31) 100%), url(${thumbnail}) lightgray 50% / cover no-repeat`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#08203C">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <video
                src={videoUrl}
                autoPlay
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* RIGHT — Follow Us + Social Icons */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-8 pl-4">
            <p
              className="font-rethink text-[#ECEEF0] font-medium tracking-[-0.936px] m-0 whitespace-nowrap select-none"
              style={{
                fontSize: "18px",
                writingMode: "vertical-rl",
                transform: "rotate(360deg)",
                lineHeight: "140%",
              }}
            >
              Follow Us
            </p>
            <div className="flex flex-col items-center gap-3">
              {SOCIAL_LINKS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full border bg-[#E9E9E9] border-[#D1D5DB] text-[#0B1714] hover:bg-[#08203C] hover:text-white hover:border-[#08203C] transition-all duration-200"
                  style={{
                    width: "36.923px",
                    height: "36.923px",
                    writingMode: "vertical-rl",
                    transform: "rotate(90deg)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}