"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MdImage } from "react-icons/md";
import { useSubmitRepairQuoteMutation } from "../../../../../lib/redux/features/cms/cmsApi";

const SERVICE_CATEGORIES = [
  { label: "Plumbing Repair",       value: "plumbing_repair" },
  { label: "Electrical Work",       value: "electrical_work" },
  { label: "Furniture Assembly",    value: "furniture_assembly" },
  { label: "Painting & Drywall",    value: "painting&drywall" },
  { label: "Door & Window Repair",  value: "door&window_repair" },
  { label: "General Maintenance",   value: "general_maintenance" },
];

const inputClass = "w-full font-rethink text-sm text-[#656565] bg-white outline-none transition-all duration-200 px-3 py-3 gap-3";

export default function RepairBookStep1() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [submitRepairQuote, { isLoading }] = useSubmitRepairQuoteMutation();
  const [data, setData] = useState({
    fullName: "", email: "", phone: "",
    serviceCategory: "", description: "",
    photo: null, photoPreview: "",
  });

  const handleChange = (field) => (e) => setData({ ...data, [field]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("File size must be under 5MB"); return; }
    setData({ ...data, photo: file, photoPreview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitRepairQuote({
        name:            data.fullName,
        email:           data.email,
        phone:           data.phone,
        serviceCategory: data.serviceCategory,
        message:         data.description,
        image:           data.photo,
      }).unwrap();
      router.push("/services/repair/book/success");
    } catch (err) {
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-135 flex flex-col gap-8 relative"
        style={{ padding: "83px 32px 32px 32px", borderRadius: "32px", background: "#FAFAFA" }}>

        <button onClick={() => router.push("/services/repair")}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E3E8EF] text-[#0B1714] cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-lg">
          ✕
        </button>

        <h1 className="font-rethink font-medium leading-[130%] tracking-[-1.248px] m-0" style={{ color: "#0F172B", fontSize: "32px" }}>
          Request a Repair Quote
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-5 w-full" style={{ padding: "20px", borderRadius: "16px", background: "#fff", border: "1px solid #E3E8EF" }}>

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Full Name</label>
              <input type="text" placeholder="Enter your full name" value={data.fullName} onChange={handleChange("fullName")} required
                className={inputClass} style={{ borderRadius: "8px", border: "0.5px solid #E8EDE4" }}
                onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                onBlur={(e) => (e.target.style.borderColor = "#E8EDE4")} />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Email Address</label>
              <input type="email" placeholder="Enter your email address" value={data.email} onChange={handleChange("email")} required
                className={inputClass} style={{ borderRadius: "8px", border: "0.5px solid #E8EDE4" }}
                onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                onBlur={(e) => (e.target.style.borderColor = "#E8EDE4")} />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Phone Number</label>
              <input type="tel" placeholder="+880********" value={data.phone} onChange={handleChange("phone")} required
                className={inputClass} style={{ borderRadius: "8px", border: "0.5px solid #E8EDE4" }}
                onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                onBlur={(e) => (e.target.style.borderColor = "#E8EDE4")} />
            </div>

            {/* Service Category */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Service Category</label>
              <div className="relative">
                <select value={data.serviceCategory} onChange={handleChange("serviceCategory")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={{ borderRadius: "8px", border: "0.5px solid #E8EDE4" }}
                  onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EDE4")}>
                  <option value="">Select a category</option>
                  {SERVICE_CATEGORIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab0be] pointer-events-none">▾</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Describe the Issue</label>
              <textarea placeholder="E.g., The sink in the master bathroom is leaking from the P-trap..."
                value={data.description} onChange={handleChange("description")} rows={4}
                className={inputClass} style={{ borderRadius: "8px", border: "0.5px solid #E8EDE4", resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "#08203C")}
                onBlur={(e) => (e.target.style.borderColor = "#E8EDE4")} />
            </div>

            {/* Upload Photo */}
            <div className="flex flex-col gap-2">
              <label className="font-rethink font-semibold leading-[140%]" style={{ color: "#0B1714", fontSize: "16px" }}>Upload Photo (Optional)</label>
              <div className="flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                style={{ borderRadius: "14px", border: "2px dashed #ECEEF0", padding: "24px 16px", minHeight: "120px" }}
                onClick={() => fileRef.current?.click()}>
                {data.photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.photoPreview} alt="Preview" className="max-h-25 rounded-xl object-contain" />
                ) : (
                  <>
                    <MdImage size={32} color="#ECEEF0" />
                    <p className="font-rethink font-medium text-center m-0" style={{ color: "#08203C", fontSize: "14px" }}>Click to upload</p>
                    <p className="font-rethink font-normal text-center m-0" style={{ color: "#656565", fontSize: "12px" }}>PNG, JPG up to 5MB</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/png, image/jpeg" className="hidden" onChange={handlePhoto} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full flex items-center justify-between cursor-pointer border-none hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ padding: "8px 8px 8px 24px", borderRadius: "24px", background: "#08203C" }}>
            <span className="w-full text-center font-rethink text-white font-semibold leading-[140%]" style={{ fontSize: "16px" }}>
              {isLoading ? "Submitting..." : "Submit Request"}
            </span>
            <span className="flex items-center justify-center rounded-3xl bg-white shrink-0" style={{ padding: "8px", width: "40px", height: "40px" }}>
              <span style={{ color: "#08203C", fontSize: "16px" }}>→</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}