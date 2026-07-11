"use client";

import { useState } from "react";
import { useGetHomePageQuery } from "../../../lib/redux/features/cms/cmsApi";

// ✅ Next.js এ public/ folder থেকে import লাগে না
// সরাসরি /images/... path দিলেই হয়
const fallbackFaqs = [
  { id: 1, question: "How do I book a service?",                answer: "You can book a service directly through our website or app. Simply select your service, choose a time slot, and confirm your booking." },
  { id: 2, question: "What areas do you serve?",               answer: "We currently serve all major neighborhoods in the city. Enter your address during booking to confirm availability in your area." },
  { id: 3, question: "Are your cleaners background-checked?",  answer: "Yes, all our professionals go through thorough background checks and training before joining our team." },
  { id: 4, question: "Can I reschedule or cancel a booking?",  answer: "Yes, you can reschedule or cancel up to 24 hours before your appointment without any charges." },
  { id: 5, question: "Do I need to provide cleaning supplies?", answer: "No, our team brings all necessary supplies and equipment. Just let us know if you have any preferences." },
];

// ✅ import এর বদলে সরাসরি public folder এর path
const fallbackImages = [
  "/images/hero-img-1.png",
  "/images/hero-img-1.png",
  "/images/service-img-2.png",
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { data, isLoading } = useGetHomePageQuery();

  const faqSection = data?.data?.home?.["Faq"]?.[0];

  const displayFaqs = faqSection?.faq_items?.length ? faqSection.faq_items : fallbackFaqs;

  // ✅ API থেকে image আসলে সেটা নেবে, না হলে fallback
  const images = faqSection?.faq_images?.length
    ? faqSection.faq_images.map((f) => f.image)
    : fallbackImages;

  const heading = faqSection?.heading || "Need Help Before Booking?";

  if (isLoading) {
    return (
      <section className="w-full max-w-360 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 bg-white flex flex-col gap-10 sm:gap-12 lg:gap-16">
        <div className="animate-pulse flex flex-col gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl" />)}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-360 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 bg-white flex flex-col gap-10 sm:gap-12 lg:gap-16">

      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#08203C]" />
            <span style={{ fontFamily: '"Rethink Sans", sans-serif' }} className="text-[#08203C] text-sm font-medium">FAQs</span>
          </div>
          <h2 style={{ fontFamily: '"Rethink Sans", sans-serif', letterSpacing: "-1.56px" }}
            className="text-[#111] text-3xl sm:text-4xl xl:text-[40px] font-medium leading-[120%] m-0">
            {heading}
          </h2>
        </div>
        <p style={{ fontFamily: '"Rethink Sans", sans-serif' }} className="text-[#555] text-sm sm:text-base leading-relaxed lg:max-w-100 lg:mt-9 lg:shrink-0">
          Find helpful answers to common questions about scheduling, services, and our cleaning team.
        </p>
      </div>

      {/* Body */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16">

        {/* LEFT — FAQ List */}
        <div className="flex-1 flex flex-col">
          {displayFaqs.map((faq, i) => (
            <div key={faq.id || i} className="rounded-xl"
              style={{ backgroundColor: openIndex === i ? "rgba(8, 32, 60, 0.04)" : "transparent" }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left py-5 sm:py-6 px-4 border-none cursor-pointer group">
                <span style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                  className={`text-sm sm:text-base font-medium leading-[150%] pr-4 transition-colors duration-200 ${openIndex === i ? "text-[#08203C]" : "text-[#111]"}`}>
                  {faq.question}
                </span>
                <span className="shrink-0 transition-transform duration-300"
                  style={{ display: "inline-flex", transform: openIndex === i ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke={openIndex === i ? "#08203C" : "#111111"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT — Answer + Images */}
        <div className="w-full lg:w-115 xl:w-125 shrink-0 flex flex-col gap-6">

          {openIndex !== null && displayFaqs[openIndex] ? (
            <div className="bg-[#FAFAFA] rounded-2xl p-5 sm:p-6">
              <span style={{ fontFamily: '"Rethink Sans", sans-serif' }}
                className="inline-block text-xs font-semibold text-[#08203C] bg-gray-100 px-3 py-1 rounded-full mb-4">
                Answer
              </span>
              <p style={{ fontFamily: '"Rethink Sans", sans-serif' }} className="text-[#333] text-sm sm:text-[15px] leading-relaxed m-0">
                {displayFaqs[openIndex].answer}
              </p>
            </div>
          ) : (
            <div className="border border-gray-100 rounded-2xl p-5 sm:p-6 bg-gray-50">
              <p style={{ fontFamily: '"Rethink Sans", sans-serif' }} className="text-gray-400 text-sm text-center">
                Select a question to see the answer.
              </p>
            </div>
          )}

          {/* Images */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 h-40 sm:h-50 lg:h-55">
            {images.slice(0, 3).map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`faq-img-${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}