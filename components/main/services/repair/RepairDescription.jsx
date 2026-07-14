
import { MdCheckCircle } from "react-icons/md";
import Link from "next/link";

const movingImg = "/images/service-img-3.png";

const INCLUDED_SERVICES = [
  "Professional packing with quality materials",
  "Careful loading and unloading",
  "Secure transportation in modern vehicles",
  "Furniture disassembly and reassembly",
  "Unpacking and setup in your new home",
];

export default function RepairDescription() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-360 mx-auto flex flex-col items-center gap-10 lg:gap-16 px-4 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 w-full">

          {/* LEFT — Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8 flex-1 w-full">

            {/* Description */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <h2 className="font-rethink font-bold leading-[140%] tracking-[-0.936px] m-0 text-[#0E1109] text-xl sm:text-2xl">
                Description
              </h2>
              <p className="font-rethink font-normal leading-[140%] m-0 text-[#677489] text-base sm:text-lg">
                Easy Lift & Clean is your buddy for all things home! Whether you
                need a quick fix or a major overhaul, our fantastic team is here
                for you. We handle everything from plumbing and electrical work
                to carpentry and beyond. Trust us to keep your home looking
                great! Plus, we offer 24/7 support for any emergencies.
                Experience hassle-free home care with us today!
              </p>
            </div>

            {/* Included Services */}
            <div className="flex flex-col gap-4 lg:gap-5">
              <h3
                className="m-0 font-semibold leading-6 text-[#0E1109] text-lg sm:text-xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Included Services
              </h3>

              <div className="flex flex-col gap-3 lg:gap-4">
                {INCLUDED_SERVICES.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <MdCheckCircle size={22} color="#08203C" className="shrink-0" />
                    <span className="font-rethink font-normal leading-[140%] text-[#656565] text-base sm:text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Image + Price Card */}
          <div
            className="flex flex-col justify-end items-center gap-5 shrink-0 w-full lg:w-138 min-h-75 sm:min-h-100 lg:h-129 p-3 rounded-3xl border border-[#E3E8EF]"
            style={{
              background: `url(${movingImg}) lightgray 50% / cover no-repeat`,
            }}
          >
            {/* Price Card */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-5 w-full p-4 sm:p-4 rounded-3xl border border-[#E3E8EF] bg-white">

              {/* Price Info */}
              <div className="flex flex-col gap-1">
                <span className="font-rethink font-normal leading-[140%] text-[#677489] text-base">
                  Start From
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-rethink font-medium leading-[130%] tracking-[-1.248px] text-[#08203C] text-3xl sm:text-[32px]">
                    $75
                  </span>
                  <span className="font-rethink font-medium leading-[140%] tracking-[-0.936px] text-[#08203C] text-xl sm:text-2xl">
                    / hr
                  </span>
                </div>
              </div>

              {/* Book Now Button */}
              <Link
                href="/services/repair/book/step-1"
                className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity duration-200 no-underline w-full sm:flex-1 sm:max-w-45 pl-6 pr-2 py-2 rounded-3xl bg-[#08203C]"
              >
                <span className="font-rethink text-white font-semibold text-base leading-[140%]">
                  Book Now
                </span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full text-white text-base shrink-0 bg-white/15">
                  →
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}