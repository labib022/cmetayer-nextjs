"use client";

import { useGetServicePageQuery } from "../../../../lib/redux/features/cms/cmsApi";


const img1 = "/images/service-img-1.png";
const img2 = "/images/service-img-2.png";
const img4 = "/images/service-img-4.png";

const fallbackImgs = [img1, img2, img4];

const fallbackServices = [
  {
    header: "Moving & Packing",
    sub_header: "Stress-free local and long-distance moving with professional packing.",
    image: img1,
  },
  {
    header: "Home Cleaning",
    sub_header: "Deep cleans, move-in/out, and recurring with professional maid services.",
    image: img2,
  },
  {
    header: "Laundry Service",
    sub_header: "Wash, dry, and fold with professional services delivered to your door.",
    image: img4,
  },
];

export default function OurServices() {
  const { data, isLoading } = useGetServicePageQuery("home_repair");

  const serviceSection = data?.data?.home_repair?.["Our Services"]?.[0];
  const services = serviceSection?.service_items?.length
    ? serviceSection.service_items.map((item, i) => ({
        header: item.header,
        sub_header: item.sub_header,
        image: item.image || fallbackImgs[i % fallbackImgs.length],
      }))
    : fallbackServices;

  const heading = serviceSection?.heading || "You May Also Like";
  const visible = services.slice(0, 3);

  return (
    <section className="w-full bg-white py-16 px-6 lg:px-16">
      <div className="max-w-300 mx-auto">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: "#08203C" }}
              />
              <span
                className="font-rethink text-sm font-medium"
                style={{ color: "#08203C" }}
              >
                Our Services
              </span>
            </div>
            <h2
              className="font-rethink font-extrabold text-3xl sm:text-4xl leading-tight"
              style={{ color: "#08203C" }}
            >
              {heading.includes("\n")
                ? heading.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))
                : heading}
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <p
              className="font-rethink text-sm leading-relaxed max-w-85 lg:text-right"
              style={{ color: "#7a849a", paddingTop: "48px" }}
            >
              Choose a service from the list below to get an instant quote or
              make a reservation immediately!
            </p>

            {/* Arrows */}
            <div className="flex items-center gap-3"></div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="flex flex-wrap lg:flex-nowrap gap-5">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="relative flex-1 min-w-70 sm:min-w-0 rounded-2xl animate-pulse bg-gray-200"
                  style={{ minHeight: "320px" }}
                />
              ))
            : visible.map((s) => (
                <div
                  key={s.header}
                  className="relative flex-1 min-w-70 sm:min-w-0 rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ minHeight: "320px" }}
                >
                  <img
                    src={s.image}
                    alt={s.header}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ minHeight: "320px" }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(13,31,60,0.92) 0%, transparent 55%)",
                    }}
                  />

                  {/* Glassmorphism Text Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      style={{
                        display: "flex",
                        padding: "16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        borderRadius: "8px",
                        background: "rgba(8, 32, 60, 0.40)",
                        backdropFilter: "blur(50.75px)",
                        WebkitBackdropFilter: "blur(50.75px)",
                      }}
                    >
                      {/* Title */}
                      <h3
                        className="font-rethink font-medium leading-[140%] tracking-[-0.936px] m-0"
                        style={{ color: "#FFF", fontSize: "24px" }}
                      >
                        {s.header}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-rethink font-normal leading-[140%] m-0"
                        style={{ color: "#ECEEF0", fontSize: "12px" }}
                      >
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