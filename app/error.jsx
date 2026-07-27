"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log to your monitoring service here (Sentry, LogRocket, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1
        className="text-[#08203C] text-2xl sm:text-3xl font-bold"
        style={{ fontFamily: '"Rethink Sans", sans-serif' }}
      >
        Something went wrong
      </h1>
      <p
        className="text-[#4C545F] text-sm sm:text-base max-w-md"
        style={{ fontFamily: '"Rethink Sans", sans-serif' }}
      >
        We hit an unexpected error while loading this page. You can try again, or head back home.
      </p>
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full bg-[#08203C] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer border-none"
          style={{ fontFamily: '"Rethink Sans", sans-serif' }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full border border-[#08203C] text-[#08203C] text-sm font-medium no-underline hover:bg-[#08203C]/5 transition-colors"
          style={{ fontFamily: '"Rethink Sans", sans-serif' }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}