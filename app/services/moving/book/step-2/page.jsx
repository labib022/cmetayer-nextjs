"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HOME_SIZES = ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms"];
const HEAVY_ITEMS_OPTIONS = ["Piano", "Pool Table", "Safe", "Hot Tub", "Gym Equipment", "Large Appliance"];

export default function MovingBookStep2() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ homeSize: "", heavyItems: [], needPacking: false });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movingData") || "{}");
    setData({
      homeSize:    saved.homeSize    || "",
      heavyItems:  saved.heavyItems  || [],
      needPacking: saved.needPacking || false,
    });
  }, []);

  const handleNext = () => {
    if (!data.homeSize) { setErrors({ homeSize: "Please select a home size" }); return; }
    const existing = JSON.parse(localStorage.getItem("movingData") || "{}");
    localStorage.setItem("movingData", JSON.stringify({ ...existing, ...data }));
    router.push("/services/moving/book/step-3");
  };

  const addHeavyItem    = (item) => !data.heavyItems.includes(item) && setData({ ...data, heavyItems: [...data.heavyItems, item] });
  const removeHeavyItem = (item) => setData({ ...data, heavyItems: data.heavyItems.filter((i) => i !== item) });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-135 flex flex-col gap-8 relative"
        style={{ padding: "83px 32px 32px 32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <button onClick={() => router.push("/services/moving")}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E3E8EF] text-[#0B1714] cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          style={{ fontSize: "18px" }}>✕</button>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-rethink font-bold leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>Build Your Moving Project</h1>
            <span className="font-rethink font-normal leading-[140%] shrink-0 pt-1" style={{ color: "#656565", fontSize: "14px" }}>Step 2 of 3</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#E3E8EF] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: "66.66%", backgroundColor: "#08203C" }} />
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>
          <h2 className="font-rethink font-bold leading-[140%] tracking-[-0.936px] m-0" style={{ color: "#0F172B", fontSize: "24px" }}>Scope of Move</h2>

          <div className="flex flex-col gap-1">
            <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>
              Home Size <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <div className="relative w-full">
              <select value={data.homeSize} onChange={(e) => { setData({ ...data, homeSize: e.target.value }); setErrors({}); }}
                className="w-full font-rethink text-sm text-[#656565] bg-white rounded-xl border outline-none transition-all duration-200 px-4 py-3 focus:border-[#08203C] appearance-none cursor-pointer"
                style={{ borderColor: errors.homeSize ? "#EF4444" : "#E3E8EF" }}>
                <option value="">Select bedroom size</option>
                {HOME_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
            </div>
            {errors.homeSize && <p className="font-rethink text-xs m-0" style={{ color: "#EF4444" }}>{errors.homeSize}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>
              Any extra heavy items? <span className="font-normal text-sm" style={{ color: "#aab0be" }}>(Optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {data.heavyItems.map((item) => (
                <span key={item} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-rethink font-medium text-white" style={{ backgroundColor: "#08203C" }}>
                  {item}
                  <button type="button" onClick={() => removeHeavyItem(item)} className="bg-transparent border-none text-white cursor-pointer text-xs leading-none hover:opacity-70">✕</button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {HEAVY_ITEMS_OPTIONS.filter((o) => !data.heavyItems.includes(o)).map((item) => (
                <button key={item} type="button" onClick={() => addHeavyItem(item)}
                  className="px-3 py-1.5 rounded-full text-sm font-rethink font-medium cursor-pointer border border-[#E3E8EF] bg-white text-[#0B1714] hover:border-[#08203C] transition-colors duration-200">
                  + {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>
              Do you need packing services? <span className="font-normal text-sm" style={{ color: "#aab0be" }}>(Optional)</span>
            </label>
            <div className="flex items-center gap-6">
              {[true, false].map((val) => (
                <label key={String(val)} className="flex items-center gap-2 cursor-pointer" onClick={() => setData({ ...data, needPacking: val })}>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: data.needPacking === val ? (val ? "#079455" : "#08203C") : "#E3E8EF", backgroundColor: data.needPacking === val ? (val ? "#079455" : "#08203C") : "transparent" }}>
                    {data.needPacking === val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="font-rethink text-sm" style={{ color: data.needPacking === val ? (val ? "#079455" : "#08203C") : "#656565" }}>{val ? "Yes" : "No"}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <button onClick={() => router.push("/services/moving/book/step-1")}
            className="font-rethink font-semibold text-sm text-[#0B1714] cursor-pointer hover:bg-[#e0e2e6] transition-colors duration-200 border-none"
            style={{ width: "173px", height: "48px", borderRadius: "24px", background: "#ECEEF0" }}>Back</button>
          <button type="button" onClick={handleNext}
            className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity duration-200 border-none"
            style={{ padding: "8px 8px 8px 24px", borderRadius: "24px", background: "#08203C", flex: "1 0 0" }}>
            <span className="w-full text-center font-rethink text-white font-semibold text-base leading-[140%]">Next Step</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full text-white text-base shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}