// src/components/common/Skeleton.jsx
"use client";

// ✅ Base skeleton block —
export function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] rounded-lg ${className}`}
      style={{
        animation: "shimmer 1.5s infinite linear",
      }}
    />
  );
}

// ✅ Login page skeleton
export function LoginSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-120 flex flex-col items-center gap-8 p-8 rounded-4xl bg-[#FAFAFA]">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 w-full">
          <SkeletonBlock className="h-8 w-48" />
          <SkeletonBlock className="h-4 w-72" />
          <SkeletonBlock className="h-4 w-60" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 w-full">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-12 w-full rounded-xl" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-12 w-full rounded-xl" />
            <div className="flex justify-end">
              <SkeletonBlock className="h-3 w-28" />
            </div>
          </div>

          {/* Button */}
          <SkeletonBlock className="h-14 w-full rounded-full" />

          {/* Divider */}
          <SkeletonBlock className="h-3 w-full" />

          {/* Google Button */}
          <SkeletonBlock className="h-14 w-full rounded-full" />
        </div>

        {/* Sign up link */}
        <SkeletonBlock className="h-4 w-48" />
      </div>
    </div>
  );
}

// ✅ Register page skeleton
export function RegisterSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F0F0] px-4 py-10">
      <div className="w-full max-w-120 flex flex-col items-center gap-8 p-8 rounded-4xl bg-[#FAFAFA]">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 w-full">
          <SkeletonBlock className="h-8 w-56" />
          <SkeletonBlock className="h-4 w-48" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 w-full">
          {["Full Name", "Email", "Password", "Confirm Password"].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-12 w-full rounded-xl" />
            </div>
          ))}

          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-4 w-4 rounded" />
            <SkeletonBlock className="h-4 w-64" />
          </div>

          {/* Button */}
          <SkeletonBlock className="h-14 w-full rounded-full" />
          <SkeletonBlock className="h-4 w-48 mx-auto" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-14 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ✅ Profile page skeleton
export function ProfileSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#F0F0F0] px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 p-6 bg-white rounded-2xl">
          <SkeletonBlock className="w-20 h-20 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-56" />
          </div>
        </div>

        {/* Info fields */}
        <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-12 w-full rounded-xl" />
            </div>
          ))}
          <SkeletonBlock className="h-12 w-36 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}

// ✅ Generic card skeleton — list page
export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3 p-5 bg-white rounded-2xl">
          <SkeletonBlock className="h-40 w-full rounded-xl" />
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-4 w-1/2" />
          <SkeletonBlock className="h-10 w-full rounded-full mt-2" />
        </div>
      ))}
    </div>
  );
}