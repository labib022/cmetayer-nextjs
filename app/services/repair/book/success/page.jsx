"use client";

import { useRouter } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";

export default function RepairBookSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-120 flex flex-col items-center gap-8 text-center"
        style={{ padding: "32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <div className="flex items-center justify-center rounded-full" style={{ width: "64px", height: "64px", backgroundColor: "#E8F5F0" }}>
          <MdCheckCircle size={32} color="#079455" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-rethink font-medium leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>
            Request Received!
          </h1>
          <p className="font-rethink font-normal leading-[140%] m-0" style={{ color: "#656565", fontSize: "16px" }}>
            Our team will reach out to schedule a free diagnostic assessment based on your issue.
          </p>
        </div>

        <button onClick={() => router.push("/services/repair")}
          className="w-full font-rethink font-semibold text-white text-base leading-[140%] border-none cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{ padding: "14px 24px", borderRadius: "40px", background: "#08203C" }}>
          Done
        </button>
      </div>
    </div>
  );
}