"use client";

// ✅ redux path fix: redux/ → lib/redux/
import { useGetServicePageQuery } from "../../../../lib/redux/features/cms/cmsApi";

// ✅ assets/ import বাদ — public/ folder এর সরাসরি path
const fallbackImgs = [
  "/images/service-img-1.png",
  "/images/service-img-1.png",
  "/images/service-img-3.png",
  "/images/service-img-4.png",
];

const fallbackServices = [
  { header: "Home Cleaning",     sub_header: "Deep cleans, move-in/out, and recurring with professional maid services.", image: "/images/service-img-1.png" },
  { header: "Handyman & Repair", sub_header: "Plumbing, electrical, assembly, and general professional home repairs.",   image: "/images/service-img-3.png" },
  { header: "Laundry Service",   sub_header: "Wash, dry, and fold with professional services delivered to your door.",  image: "/images/service-img-4.png" },
];

export default function OurMovingServices() {
  const { data, isLoading } = useGetServicePageQuery("moving");

  const serviceSection = data?.data?.moving?.["Our Services"]?.[0];
  const services = serviceSection?.service_items?.length
    ? serviceSection.service_items.map((item, i) => ({
        header:     item.header,
        sub_header: item.sub_header,
        image:      item.image || fallbackImgs[i % fallbackImgs.length],
      }))
    : fallbackServices;

  const heading = serviceSection?.heading || "You May Also Like";
  const visible = services.slice(0, 3);

  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-300 mx-auto">

        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 sm:mb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#08203C]" />
              <span className="font-rethink text-sm font-medium text-[#08203C]">Our Services</span>
            </div>
            <h2 className="font-rethink font-extrabold text-3xl sm:text-4xl pt-2 leading-tight text-[#08203C]">
              {heading.includes("\n")
                ? heading.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))
                : heading}
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="font-rethink text-sm leading-relaxed max-w-85 lg:text-right text-[#7a849a] pt-0 sm:pt-6 lg:pt-12">
              Choose a service from the list below to get an instant quote or make a reservation immediately!
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl min-h-70 sm:min-h-80 animate-pulse bg-gray-200" />
              ))
            : visible.map((s) => (
                <div key={s.header} className="relative rounded-2xl overflow-hidden cursor-pointer group min-h-70 sm:min-h-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.header}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 min-h-70 sm:min-h-80"
                  />
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: "linear-gradient(0deg, rgba(13,31,60,0.92) 0%, transparent 55%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="flex flex-col items-start gap-2 p-4 rounded-lg"
                      style={{ background: "rgba(8, 32, 60, 0.40)", backdropFilter: "blur(50.75px)", WebkitBackdropFilter: "blur(50.75px)" }}
                    >
                      <h3 className="font-rethink font-medium leading-[140%] tracking-[-0.936px] m-0 text-white text-xl sm:text-2xl">
                        {s.header}
                      </h3>
                      <p className="font-rethink font-normal leading-[140%] m-0 text-[#ECEEF0] text-xs">
                        {s.sub_header}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

      </div>
    </section>
  );
}