"use client";

import { useState, useEffect } from "react";
// ✅ redux path fix: redux/ → lib/redux/
import { useGetHomePageQuery } from "../../../lib/redux/features/cms/cmsApi";

// ✅ assets/ থেকে import বাদ — public/ folder এর সরাসরি path
const fallbackServices = [
  { header: "Moving & Packing",  sub_header: "Stress-free local and long-distance moving with professional packing.", image: "/images/service-img-1.png" },
  { header: "Home Cleaning",     sub_header: "Deep cleans, move-in/out, and recurring with professional maid services.", image: "/images/service-img-2.png" },
  { header: "Handyman & Repair", sub_header: "Plumbing, electrical, assembly, and general professional home repairs.", image: "/images/service-img-3.png" },
  { header: "Laundry Service",   sub_header: "Wash, dry, and fold with professional services delivered to your door.", image: "/images/service-img-4.png" },
];

// ✅ fallback image গুলো string path হিসেবে
const fallbackImgs = [
  "/images/service-img-1.png",
  "/images/service-img-2.png",
  "/images/service-img-3.png",
  "/images/service-img-4.png",
];

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function OurServices() {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const { data, isLoading } = useGetHomePageQuery();

  const serviceSection = data?.data?.home?.["Our Services"]?.[0];

  const services = serviceSection?.service_items?.length
    ? serviceSection.service_items.map((item, i) => ({
        header:     item.header,
        sub_header: item.sub_header,
        image:      item.image || fallbackImgs[i % fallbackImgs.length],
      }))
    : fallbackServices;

  useEffect(() => {
    const handleResize = () => { setVisibleCount(getVisibleCount()); setStart(0); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setStart(0); }, [services.length]);

  const visible  = services.slice(start, start + visibleCount);
  const maxStart = services.length - visibleCount;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-300 mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#08203C" }} />
              <span className="font-rethink text-sm font-medium" style={{ color: "#08203C" }}>Our Services</span>
            </div>
            <h2 className="font-rethink font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight" style={{ color: "#08203C" }}>
              Comprehensive Home Services <br /> You Can Count On
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="font-rethink text-sm leading-relaxed max-w-85 lg:text-right" style={{ color: "#7a849a" }}>
              Choose a service from the list below to get an instant quote or make a reservation immediately!
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStart(Math.max(0, start - 1))}
                disabled={start === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border-none text-white hover:-translate-y-1 disabled:opacity-40"
                style={{ background: "#08203C" }}
              >←</button>
              <button
                onClick={() => setStart(Math.min(maxStart, start + 1))}
                disabled={start >= maxStart}
                className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 text-white hover:-translate-y-1 disabled:opacity-40"
                style={{ backgroundColor: "#08203C" }}
              >→</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: visibleCount }).map((_, i) => (
                <div key={i} className="w-full rounded-2xl animate-pulse bg-gray-200" style={{ minHeight: "280px" }} />
              ))
            : visible.map((s) => (
                <div key={s.header} className="relative w-full rounded-2xl overflow-hidden cursor-pointer group" style={{ minHeight: "280px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.header}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ minHeight: "280px" }}
                  />
                  <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(0deg, rgba(13,31,60,0.92) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <div style={{ display: "flex", padding: "12px", flexDirection: "column", gap: "6px", borderRadius: "8px", background: "rgba(8, 32, 60, 0.40)", backdropFilter: "blur(50.75px)", WebkitBackdropFilter: "blur(50.75px)" }}>
                      <h3 className="font-rethink font-medium leading-[140%] tracking-[-0.936px] m-0 text-base sm:text-lg lg:text-[24px]" style={{ color: "#FFF" }}>{s.header}</h3>
                      <p className="font-rethink font-normal leading-[140%] m-0 text-[11px] sm:text-[12px]" style={{ color: "#ECEEF0" }}>{s.sub_header}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}