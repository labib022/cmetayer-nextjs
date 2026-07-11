"use client";

import { useEffect, useRef, useState } from "react";
// ✅ redux path fix: redux/ → lib/redux/
import { useGetHomePageQuery } from "../../../lib/redux/features/cms/cmsApi";

// ✅ public/ folder থেকে import লাগে না — সরাসরি string path
const fallbackImages = [
  "/images/hero-img-1.png",
  "/images/hero-img-2.png",
  "/images/hero-img-3.png",
  "/images/hero-img-4.png",
];

// ✅ icon গুলোও public/ থেকে সরাসরি path
const movingIconSrc   = "/icons/moving.svg";
const cleaningIconSrc = "/icons/cleaning.svg";
const laundryIconSrc  = "/icons/laundry.svg";
const repairIconSrc   = "/icons/repair.svg";

const fallbackServices = [
  { title: "Moving",   img: fallbackImages[0], desc: "Full-service moving, packing, and heavy lifting for homes and offices",    iconBg: "#f0f4ff", icon: movingIconSrc },
  { title: "Cleaning", img: fallbackImages[1], desc: "Professional cleaning with quality materials to keep your space spotless", iconBg: "#edfaf3", icon: cleaningIconSrc },
  { title: "Laundry",  img: fallbackImages[2], desc: "Secure and convenient laundry solutions picked up from your door",        iconBg: "#f5f0ff", icon: laundryIconSrc },
  { title: "Repair",   img: fallbackImages[3], desc: "Hassle-free home repairs with skilled professionals at your service",     iconBg: "#fff7ed", icon: repairIconSrc },
];

const iconMap   = { moving: movingIconSrc, cleaning: cleaningIconSrc, laundry: laundryIconSrc, repair: repairIconSrc };
const iconBgMap = { moving: "#f0f4ff", cleaning: "#edfaf3", laundry: "#f5f0ff", repair: "#fff7ed" };

const FADE_DURATION = 400;

export default function Hero() {
  const [current,   setCurrent]   = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [isFading,  setIsFading]  = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const { data, isLoading } = useGetHomePageQuery();

  const heroData = data?.data?.home?.hero?.[0];

  const heading = heroData?.title       || "One Call. One Company.";
  const subtext = heroData?.description || "Book trusted moving, cleaning, repair, and laundry services instantly. We manage your home so you don't have to.";

  const stats = heroData?.hero_features?.length
    ? heroData.hero_features.map((f) => ({ value: f.item, label: f.title }))
    : [
        { value: "100M", label: "Happy customers" },
        { value: "99%",  label: "Client happiness" },
        { value: "100+", label: "Team members" },
      ];

  const services = (() => {
    if (!heroData?.hero_images?.length) return fallbackServices;
    return heroData.hero_images.map((item, i) => {
      const base = fallbackServices[i % fallbackServices.length];
      const key  = base.title.toLowerCase();
      return {
        title:  item.title       || base.title,
        img:    item.image       || fallbackImages[i % fallbackImages.length],
        desc:   item.description || base.desc,
        iconBg: iconBgMap[key]   || "#f0f4ff",
        icon:   iconMap[key]     || movingIconSrc,
      };
    });
  })();

  const goTo = (next) => {
    if (isFading || next === current) return;
    setIsFading(true);
    setTimeout(() => { setDisplayed(next); setCurrent(next); setIsFading(false); }, FADE_DURATION);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => { const next = (prev + 1) % services.length; goTo(next); return prev; });
    }, 3500);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFading, services.length]);

  const active = services[displayed] || services[0];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 pt-12 pb-16 rounded-b-3xl" style={{ backgroundColor: "#08203C" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* LEFT */}
        <div className="flex flex-col justify-center gap-6 w-full lg:w-1/2">
          <h1
            className="text-white font-extrabold leading-[1.1] text-5xl sm:text-6xl lg:text-[64px]"
            style={{ fontFamily: '"Rethink Sans", sans-serif' }}
          >
            {heading.includes(".")
              ? heading.split(".").map((part, i, arr) => (
                  <span key={i}>
                    {part.trim()}{i < arr.length - 1 ? "." : ""}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))
              : heading}
          </h1>

          <p className="text-[#8899b8] text-base leading-relaxed max-w-md" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
            {subtext}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div>
                  <p className="text-white font-extrabold text-3xl sm:text-4xl leading-tight" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-[#8899b8] text-sm mt-1" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div className="h-10 w-px hidden sm:block" style={{ backgroundColor: "#1e3a5f" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden"
          style={{ minHeight: "420px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isLoading && (
            <div className="w-full rounded-2xl animate-pulse bg-[#1e3a5f]" style={{ minHeight: "420px" }} />
          )}

          {!isLoading && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={displayed}
              src={active.img}
              alt={active.title}
              className="w-full h-full object-cover object-center rounded-2xl"
              style={{
                minHeight: "420px",
                maxHeight: "520px",
                opacity: isFading ? 0 : 1,
                transition: `opacity ${FADE_DURATION}ms ease, transform 700ms ease-in-out`,
                transform: isHovered ? "scale(1.02)" : "scale(1)",
              }}
            />
          )}

          {/* Carousel dots */}
          {!isLoading && (
            <div className="absolute bottom-4 left-4 flex gap-1.5 items-center z-10">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === current ? "28px" : "8px",
                    background: i === current ? "white" : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Service card */}
          {!isLoading && (
            <div
              className="absolute bottom-4 right-4 bg-white rounded-2xl flex items-center gap-3 p-3 shadow-xl z-10"
              style={{ maxWidth: "210px" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: active.iconBg, transition: `background ${FADE_DURATION}ms ease` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.icon} alt={active.title} className="w-5 h-5 object-contain" />
              </div>
              <div style={{
                opacity: isFading ? 0 : 1,
                transform: isFading ? "translateY(4px)" : "translateY(0px)",
                transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`,
              }}>
                <p className="font-bold text-sm text-[#08203C]">{active.title}</p>
                <p className="text-[11px] text-[#7a849a] leading-snug">{active.desc}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}