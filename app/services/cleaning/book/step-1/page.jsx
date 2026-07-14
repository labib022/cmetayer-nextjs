"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdCalendarToday, MdShoppingCart } from "react-icons/md";
import { useGetCleaningPriceMutation } from "../../../../../lib/redux/features/cms/cmsApi";

const SERVICE_CATEGORIES = [
  { label: "Standard Clean",          value: "standard_clean" },
  { label: "Deep Clean",              value: "deep_clean" },
  { label: "Move-In / Move-Out Clean", value: "move_in_out" },
  { label: "Post-Construction Clean", value: "post_construction" },
  { label: "Airbnb Turnover Clean",   value: "aribnb_turnover" },
];

const FREQUENCY_OPTIONS = [
  { label: "One-time",  value: "one_time" },
  { label: "Weekly",    value: "weekly" },
  { label: "Bi-weekly", value: "bi_weekly" },
  { label: "Monthly",   value: "monthly" },
];

const inputClass = "w-full font-rethink text-sm text-[#656565] bg-white rounded-xl border border-[#E3E8EF] outline-none transition-all duration-200 px-4 py-3 focus:border-[#08203C]";

export default function CleaningBookStep1() {
  const router = useRouter();
  const [getCleaningPrice, { isLoading: isPriceLoading }] = useGetCleaningPriceMutation();
  const [priceData, setPriceData] = useState(null);
  const [data, setData] = useState({
    bedrooms: 1, bathrooms: 1,
    serviceCategory: SERVICE_CATEGORIES[0].value,
    frequency: FREQUENCY_OPTIONS[0].value,
    serviceDate: "",
  });

  // ✅ আগের data থাকলে load করো
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cleaningData") || "{}");
    if (Object.keys(saved).length) {
      setData((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  const inc = (field) => setData((prev) => ({ ...prev, [field]: (prev[field] || 1) + 1 }));
  const dec = (field) => setData((prev) => ({ ...prev, [field]: Math.max(1, (prev[field] || 1) - 1) }));

  // ✅ price fetch
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const result = await getCleaningPrice({
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          services_category: data.serviceCategory,
          frequency: data.frequency,
        }).unwrap();
        setPriceData(result);
      } catch (err) {
        console.error("Price fetch failed:", err);
      }
    };
    fetchPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bedrooms, data.bathrooms, data.serviceCategory, data.frequency]);

  const handleNext = () => {
    // ✅ localStorage এ save করো
    localStorage.setItem("cleaningData", JSON.stringify(data));
    router.push("/services/cleaning/book/step-2");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-190 flex flex-col gap-8 relative"
        style={{ padding: "80px 32px 32px 32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <button onClick={() => router.push("/services/cleaning")}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E3E8EF] text-[#0B1714] cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-lg">
          ✕
        </button>

        <h1 className="font-rethink font-medium leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>
          Book a Cleaning
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 w-full">

          {/* LEFT — Form */}
          <div className="flex flex-col gap-5 flex-1" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>
            <h2 className="font-rethink font-medium leading-[140%] tracking-[-0.936px] m-0" style={{ color: "#0F172B", fontSize: "24px" }}>Home Size</h2>

            {/* Bedrooms */}
            <div className="flex items-center justify-between py-3 border-b border-[#E3E8EF]">
              <span className="font-rethink font-medium text-[#0B1714] text-base">Bedrooms</span>
              <div className="flex items-center gap-4">
                <button onClick={() => dec("bedrooms")} className="w-8 h-8 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center cursor-pointer hover:border-[#08203C] transition-colors duration-200 text-[#0B1714] font-bold">−</button>
                <span className="font-rethink font-medium text-[#0B1714] w-4 text-center">{data.bedrooms}</span>
                <button onClick={() => inc("bedrooms")} className="w-8 h-8 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center cursor-pointer hover:border-[#08203C] transition-colors duration-200 text-[#0B1714] font-bold">+</button>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center justify-between py-3 border-b border-[#E3E8EF]">
              <span className="font-rethink font-medium text-[#0B1714] text-base">Bathrooms</span>
              <div className="flex items-center gap-4">
                <button onClick={() => dec("bathrooms")} className="w-8 h-8 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center cursor-pointer hover:border-[#08203C] transition-colors duration-200 text-[#0B1714] font-bold">−</button>
                <span className="font-rethink font-medium text-[#0B1714] w-4 text-center">{data.bathrooms}</span>
                <button onClick={() => inc("bathrooms")} className="w-8 h-8 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center cursor-pointer hover:border-[#08203C] transition-colors duration-200 text-[#0B1714] font-bold">+</button>
              </div>
            </div>

            {/* Service Category */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">Service Category</label>
              <div className="relative">
                <select value={data.serviceCategory} onChange={(e) => setData({ ...data, serviceCategory: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                  {SERVICE_CATEGORIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
              </div>
            </div>

            {/* Service Date & Time */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">Service Date &amp; Time</label>
              <div className="relative">
                <input type="datetime-local" value={data.serviceDate || ""} onChange={(e) => setData({ ...data, serviceDate: e.target.value })} className={`${inputClass} pr-10`} />
                <MdCalendarToday size={16} color="#aab0be" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Frequency */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">Frequency</label>
              <div className="relative">
                <select value={data.frequency} onChange={(e) => setData({ ...data, frequency: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                  {FREQUENCY_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="flex flex-col gap-4 w-full lg:w-55 shrink-0" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>
            <div className="flex items-center gap-2">
              <MdShoppingCart size={18} color="#0B1714" />
              <h3 className="font-rethink font-semibold text-[#0B1714] text-base m-0">Order Summary</h3>
            </div>
            {isPriceLoading ? (
              <div className="flex flex-col gap-3 animate-pulse">{[1,2,3].map((i) => <div key={i} className="h-4 bg-gray-200 rounded" />)}</div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-rethink text-sm text-[#656565]">{data.bedrooms} Bed, {data.bathrooms} Bath</span>
                  <span className="font-rethink text-sm font-medium text-[#0B1714]">£{priceData?.price ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-rethink text-sm text-[#656565]">Service Category</span>
                  <span className="font-rethink text-sm font-medium text-[#0B1714]">£{priceData?.service_category_price ?? "-"}</span>
                </div>
                {priceData?.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-rethink text-sm text-[#079455]">Discount</span>
                    <span className="font-rethink text-sm font-medium text-[#079455]">-£{priceData.discount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-rethink text-sm text-[#656565]">Tax</span>
                  <span className="font-rethink text-sm font-medium text-[#0B1714]">£{priceData?.tax ?? "-"}</span>
                </div>
              </div>
            )}
            <div className="w-full h-px bg-[#E3E8EF]" />
            <div className="flex items-center justify-between">
              <span className="font-rethink font-medium text-[#0B1714] text-base">Total</span>
              <span className="font-rethink font-bold tracking-[-1.248px]" style={{ color: "#08203C", fontSize: "28px" }}>£{priceData?.total?.toFixed(2) ?? "-"}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 w-full">
          <Link href="/services/cleaning"
            className="font-rethink font-semibold text-sm text-[#0B1714] cursor-pointer hover:bg-[#e0e2e6] transition-colors duration-200 no-underline flex items-center justify-center"
            style={{ width: "173px", height: "48px", borderRadius: "24px", background: "#ECEEF0" }}>
            Back
          </Link>
          <button onClick={handleNext}
            className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity duration-200 border-none"
            style={{ padding: "8px 8px 8px 24px", borderRadius: "24px", background: "#08203C", flex: "1 0 0", height: "48px" }}>
            <span className="font-rethink text-white font-semibold text-base leading-[140%] w-full text-center">Next Step</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full text-white text-base shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}