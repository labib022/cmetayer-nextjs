"use client";

import { useEffect } from "react";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h2
        className="text-[#08203C] text-xl font-bold"
        style={{ fontFamily: '"Rethink Sans", sans-serif' }}
      >
        Couldn't load your dashboard
      </h2>
      <p
        className="text-[#4C545F] text-sm max-w-md"
        style={{ fontFamily: '"Rethink Sans", sans-serif' }}
      >
        There was a problem fetching your account data. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-full bg-[#08203C] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer border-none"
        style={{ fontFamily: '"Rethink Sans", sans-serif' }}
      >
        Try again
      </button>
    </div>
  );
}