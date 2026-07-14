"use client";

import { useGetLegalQuery } from "../../lib/redux/features/cms/cmsApi";

export default function TermsAndConditionsPage() {
  const { data, isLoading } = useGetLegalQuery("terms");
  const sections = data || [];
  return (
    <div className="w-full bg-white">
      {/* Hero Header */}
      <section className="font-rethink bg-[#08203C] px-4 sm:px-6 lg:px-16 py-4 mx-2 mb-2 rounded-b-3xl">
        <div className="w-full flex flex-col justify-center items-center gap-5 md:gap-6 py-10 md:py-14">
          <h1 className="text-white text-center font-bold text-[28px] sm:text-4xl md:text-[48px] leading-tight px-6">
            Terms & Conditions
          </h1>
          <p className="text-white/90 text-center text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-175 px-6">
            Please read our terms and conditions carefully before using our services.
          </p>
        </div>
      </section>
      {/* Content */}
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] max-w-275 mt-12 md:mt-20 pb-20">
          <style>{`
            .cms-rich-content p {
              font-size: 16px;
              line-height: 1.75;
              color: #1F2937;
              margin-bottom: 0.75rem;
            }
            .cms-rich-content h2 {
              font-size: 22px;
              font-weight: 700;
              color: #1C2532;
              margin-top: 2.5rem;
              margin-bottom: 0.75rem;
              line-height: 1.3;
            }
            .cms-rich-content ul {
              list-style: none;
              padding-left: 0;
              margin-bottom: 1rem;
            }
            .cms-rich-content ul li {
              position: relative;
              padding-left: 1.25rem;
              font-size: 16px;
              line-height: 1.75;
              color: #4C545F;
              margin-bottom: 0.5rem;
            }
            .cms-rich-content ul li::before {
              content: "•";
              position: absolute;
              left: 0.25rem;
              top: 0;
            }
            .cms-rich-content strong { font-weight: 700; }
            .cms-rich-content a { color: #2F6BE0; text-decoration: underline; }
            @media (min-width: 768px) {
              .cms-rich-content p, .cms-rich-content ul li { font-size: 18px; }
              .cms-rich-content h2 { font-size: 32px; }
            }
            @media (min-width: 1024px) {
              .cms-rich-content p, .cms-rich-content ul li { font-size: 20px; }
            }
          `}</style>
          {isLoading ? (
            <div className="flex flex-col gap-4 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 bg-gray-200 rounded w-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <div
                    className="cms-rich-content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  {section.last_updated && (
                    <p style={{ color: "#9CA3AF", fontSize: "14px", marginTop: "8px" }}>
                      Last updated: {new Date(section.last_updated).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}