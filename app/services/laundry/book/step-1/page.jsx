"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdCalendarToday, MdShoppingCart } from "react-icons/md";
import { useGetLaundryPriceMutation } from "../../../../../lib/redux/features/cms/cmsApi";

const BAG_SIZES = [
  { label: "Small (up to 10 lbs)",      value: "small" },
  { label: "Medium (up to 20 lbs)",     value: "medium" },
  { label: "Large (up to 30 lbs)",      value: "large" },
  { label: "Extra Large (up to 40 lbs)", value: "extra_large" },
];

const WASH_TYPES = [
  { label: "Standard Clothing", desc: "Shirts, pants, socks, underwear" },
  { label: "Delicates",         desc: "Silk, lace, lingerie, fine fabrics" },
  { label: "Bedding & Linens",  desc: "Sheets, duvet covers, pillowcases" },
  { label: "Heavy Items",       desc: "Towels, jeans, hoodies, blankets" },
  { label: "Work Uniforms",     desc: "Professional and industrial wear" },
];

const DETERGENTS = [
  "Standard Premium Detergent",
  "Hypoallergenic / Sensitive Skin",
  "Eco-Friendly / Natural",
  "Fragrance-Free",
  "Baby-Safe Detergent",
];

const inputClass = "w-full font-rethink text-sm text-[#656565] bg-white rounded-xl border border-[#E3E8EF] outline-none transition-all duration-200 px-4 py-3 focus:border-[#08203C] appearance-none cursor-pointer";

export default function LaundryBookStep1() {
  const router = useRouter();
  const [getLaundryPrice, { data: priceData }] = useGetLaundryPriceMutation();
  const [data, setData] = useState({
    bagSize: BAG_SIZES[1].label,
    washType: WASH_TYPES[0].label,
    detergent: DETERGENTS[0],
    serviceDate: "",
  });

  const price = priceData || { price: 35, service_fee: 4.9, tax: 3.19, discount: 0, total: 43.09 };

 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("laundryData") || "{}");
    if (Object.keys(saved).length) setData((prev) => ({ ...prev, ...saved }));
  }, []);

  
  useEffect(() => {
    const selectedBag = BAG_SIZES.find((b) => b.label === data.bagSize);
    getLaundryPrice({ bag_size: selectedBag?.value || "medium" });
  }, [data.bagSize, getLaundryPrice]);

  const handleNext = () => {

    localStorage.setItem("laundryData", JSON.stringify(data));
    router.push("/services/laundry/book/step-2");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-215 flex flex-col gap-8 relative"
        style={{ padding: "80px 32px 32px 32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <button onClick={() => router.push("/services/laundry")}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E3E8EF] text-[#0B1714] cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-lg">
          ✕
        </button>

        <h1 className="font-rethink font-medium leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>
          Customize Laundry
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 w-full">

          {/* LEFT — Form */}
          <div className="flex flex-col gap-5 flex-1" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>
            <h2 className="font-rethink font-medium leading-[140%] tracking-[-0.936px] m-0" style={{ color: "#0F172B", fontSize: "24px" }}>Laundry Details</h2>

            {/* Bag Size */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">Select Bag Size</label>
              <div className="relative">
                <select value={data.bagSize} onChange={(e) => setData({ ...data, bagSize: e.target.value })} className={inputClass}>
                  {BAG_SIZES.map((b) => <option key={b.value} value={b.label}>{b.label}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
              </div>
            </div>

            {/* Wash Type */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">What are we washing?</label>
              <div className="relative">
                <select value={data.washType} onChange={(e) => setData({ ...data, washType: e.target.value })} className={inputClass}>
                  {WASH_TYPES.map((w) => <option key={w.label} value={w.label}>{w.label} — {w.desc}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
              </div>
              {data.washType && (
                <p className="font-rethink text-xs text-[#aab0be] mt-1">
                  {WASH_TYPES.find((w) => w.label === data.washType)?.desc}
                </p>
              )}
            </div>

            {/* Detergent */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">Detergent Preferences</label>
              <div className="relative">
                <select value={data.detergent} onChange={(e) => setData({ ...data, detergent: e.target.value })} className={inputClass}>
                  {DETERGENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
              </div>
            </div>

            {/* Service Date */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold text-[#0B1714] text-base leading-[140%]">Service Date &amp; Time</label>
              <div className="relative">
                <input type="datetime-local" value={data.serviceDate || ""} onChange={(e) => setData({ ...data, serviceDate: e.target.value })}
                  className="w-full font-rethink text-sm text-[#656565] bg-white rounded-xl border border-[#E3E8EF] outline-none transition-all duration-200 px-4 py-3 pr-10 focus:border-[#08203C]" />
                <MdCalendarToday size={16} color="#aab0be" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="flex flex-col gap-4 w-full lg:w-60 shrink-0" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>
            <div className="flex items-center gap-2">
              <MdShoppingCart size={18} color="#0B1714" />
              <h3 className="font-rethink font-semibold text-[#0B1714] text-base m-0">Order Summary</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-rethink text-sm text-[#656565]">Wash &amp; Fold</span>
                <span className="font-rethink text-sm font-medium text-[#0B1714]">${price.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-rethink text-sm text-[#656565]">Service Fee</span>
                <span className="font-rethink text-sm font-medium text-[#0B1714]">${price.service_fee}</span>
              </div>
              {price.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-rethink text-sm text-[#079455]">Discount</span>
                  <span className="font-rethink text-sm font-medium text-[#079455]">-${price.discount}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-rethink text-sm text-[#656565]">Taxes</span>
                <span className="font-rethink text-sm font-medium text-[#0B1714]">${price.tax}</span>
              </div>
            </div>
            <div className="w-full h-px bg-[#E3E8EF]" />
            <div className="flex items-center justify-between">
              <span className="font-rethink font-medium text-[#0B1714] text-base">Total</span>
              <span className="font-rethink font-bold tracking-[-1.248px]" style={{ color: "#08203C", fontSize: "28px" }}>${price.total}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 w-full">
          <Link href="/services/laundry"
            className="font-rethink font-semibold text-sm text-[#0B1714] cursor-pointer hover:bg-[#e0e2e6] transition-colors duration-200 no-underline flex items-center justify-center"
            style={{ width: "173px", height: "48px", borderRadius: "24px", background: "#ECEEF0" }}>
            Back
          </Link>
          <button onClick={handleNext}
            className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity duration-200 border-none"
            style={{ padding: "8px 8px 8px 24px", borderRadius: "24px", background: "#08203C", flex: "1 0 0", height: "48px" }}>
            <span className="w-full text-center font-rethink text-white font-semibold text-base leading-[140%]">Next Step</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full text-white text-base shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}