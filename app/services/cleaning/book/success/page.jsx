"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";

export default function CleaningBookSuccess() {
  const router = useRouter();
  const [serviceDate, setServiceDate] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cleaningSuccess") || "{}");
    setServiceDate(saved.serviceDate || "");
    localStorage.removeItem("cleaningSuccess");
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not specified";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "long", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-120 flex flex-col items-center gap-8 text-center"
        style={{ padding: "32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <div className="flex items-center justify-center rounded-full" style={{ width: "64px", height: "64px", backgroundColor: "#E8F5F0" }}>
          <MdCheckCircle size={32} color="#079455" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-rethink font-medium leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>
            Booking Confirmed!
          </h1>
          <p className="font-rethink font-normal leading-[140%] m-0" style={{ color: "#656565", fontSize: "16px" }}>
            Your cleaning appointment has been scheduled. Our team will arrive at the requested time.
          </p>
        </div>

        {/* Scheduled Visit Card */}
        <div className="flex flex-col gap-2 w-full text-left"
          style={{ padding: "16px 20px", borderRadius: "12px", border: "1px solid #E3E8EF", background: "#fff" }}>
          <p className="font-rethink font-semibold leading-[140%] m-0" style={{ color: "#0B1714", fontSize: "16px" }}>Scheduled Visit</p>
          <p className="font-rethink font-normal leading-[140%] m-0" style={{ color: "#656565", fontSize: "14px" }}>{formatDate(serviceDate)}</p>
        </div>

        <button onClick={() => router.push("/services/cleaning")}
          className="w-full font-rethink font-semibold text-white text-base leading-[140%] border-none cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{ padding: "14px 24px", borderRadius: "40px", background: "#08203C" }}>
          Done
        </button>
      </div>
    </div>
  );
}