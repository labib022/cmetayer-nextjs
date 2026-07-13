"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";

const inputClass =
  "w-full font-rethink text-sm text-[#656565] bg-white rounded-xl border border-[#E3E8EF] outline-none transition-all duration-200 px-4 py-3 placeholder:text-[#aab0be] focus:border-[#08203C]";

export default function MovingBookStep1() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ pickup: "", dropoff: "", moveDate: "" });

  // ✅ আগের data থাকলে load করো
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movingData") || "{}");
    if (saved.pickup || saved.dropoff || saved.moveDate) {
      setData({ pickup: saved.pickup || "", dropoff: saved.dropoff || "", moveDate: saved.moveDate || "" });
    }
  }, []);

  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleNext = () => {
    const newErrors = {};
    if (!data.pickup)   newErrors.pickup   = "Pick-up address is required";
    if (!data.dropoff)  newErrors.dropoff  = "Drop-off address is required";
    if (!data.moveDate) newErrors.moveDate = "Move date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ localStorage এ save করো
    const existing = JSON.parse(localStorage.getItem("movingData") || "{}");
    localStorage.setItem("movingData", JSON.stringify({ ...existing, ...data }));
    router.push("/services/moving/book/step-2");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-135 flex flex-col gap-8 relative"
        style={{ padding: "83px 32px 32px 32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <button onClick={() => router.push("/services/moving")}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E3E8EF] text-[#0B1714] cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          style={{ fontSize: "18px" }}>✕</button>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-rethink font-bold leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>
              Build Your Moving Project
            </h1>
            <span className="font-rethink font-normal leading-[140%] shrink-0 pt-1" style={{ color: "#656565", fontSize: "14px" }}>Step 1 of 3</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#E3E8EF] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: "33.33%", backgroundColor: "#08203C" }} />
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>
          <h2 className="font-rethink font-bold leading-[140%] tracking-[-0.936px] m-0" style={{ color: "#0F172B", fontSize: "24px" }}>Location &amp; Timing</h2>

          <div className="flex flex-col gap-1">
            <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Pick-up Address</label>
            <div className="relative">
              <MdLocationOn size={18} color="#aab0be" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="123 Main St, City" value={data.pickup} onChange={handleChange("pickup")}
                className={`${inputClass} pl-9`} style={{ borderColor: errors.pickup ? "#EF4444" : "" }} />
            </div>
            {errors.pickup && <p className="font-rethink text-xs m-0" style={{ color: "#EF4444" }}>{errors.pickup}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Drop-off Address</label>
            <div className="relative">
              <MdLocationOn size={18} color="#aab0be" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="456 New Home Ave, City" value={data.dropoff} onChange={handleChange("dropoff")}
                className={`${inputClass} pl-9`} style={{ borderColor: errors.dropoff ? "#EF4444" : "" }} />
            </div>
            {errors.dropoff && <p className="font-rethink text-xs m-0" style={{ color: "#EF4444" }}>{errors.dropoff}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Expected Move Date</label>
            <div className="relative">
              <MdCalendarToday size={16} color="#aab0be" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="date" value={data.moveDate} onChange={handleChange("moveDate")}
                className={`${inputClass} pl-9`} style={{ borderColor: errors.moveDate ? "#EF4444" : "" }} />
            </div>
            {errors.moveDate && <p className="font-rethink text-xs m-0" style={{ color: "#EF4444" }}>{errors.moveDate}</p>}
          </div>
        </div>

        <button type="button" onClick={handleNext}
          className="w-full flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity duration-200 border-none"
          style={{ padding: "8px 8px 8px 24px", borderRadius: "24px", background: "#08203C" }}>
          <span className="w-full text-center font-rethink text-white font-semibold text-base leading-[140%]">Next Step</span>
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-white text-base shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>→</span>
        </button>
      </div>
    </div>
  );
}