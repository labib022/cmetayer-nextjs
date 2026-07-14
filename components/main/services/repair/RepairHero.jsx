"use client";

import { useGetServicePageQuery } from "../../../../lib/redux/features/cms/cmsApi";

export default function RepairHero() {
  const { data } = useGetServicePageQuery("home_repair");

  const heroSection = data?.data?.home_repair?.hero?.[0];
  const title = heroSection?.title || "Home Repair Services";
  const subtitle =
    heroSection?.description ||
    "Plumbing, electrical, assembly, and general home repairs from vetted professionals.";

  return (
    <section className="relative px-2 sm:px-6 lg:px-16 py-4 bg-[#08203C] mx-2 mb-2 rounded-b-3xl overflow-hidden">

      {/* SVG Background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        viewBox="0 0 1440 380"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.3 }}
      >
        <path d="M375.487 -72V11.5214C375.487 17.8295 370.373 22.9432 364.065 22.9432H283.396C277.087 22.9432 271.973 28.0569 271.973 34.3649V115.031C271.973 121.339 266.859 126.453 260.551 126.453H179.882C173.574 126.453 168.46 131.566 168.46 137.874V218.54C168.46 224.848 163.346 229.962 157.038 229.962H76.3689C70.0606 229.962 64.9467 235.076 64.9467 241.384V322.05C64.9467 328.358 59.8328 333.472 53.5245 333.472H-30" stroke="#EAF3FC" strokeWidth="0.431035"/>
        <path d="M1064.487 -72V11.5214C1064.487 17.8295 1069.373 22.9432 1075.681 22.9432H1156.35C1162.658 22.9432 1167.772 28.0569 1167.772 34.3649V115.031C1167.772 121.339 1172.886 126.453 1179.194 126.453H1259.863C1266.171 126.453 1271.285 131.566 1271.285 137.874V218.54C1271.285 224.848 1276.399 229.962 1282.707 229.962H1363.376C1369.684 229.962 1374.798 235.076 1374.798 241.384V322.05C1374.798 328.358 1379.912 333.472 1386.22 333.472H1470" stroke="#EAF3FC" strokeWidth="0.431035"/>
        <path d="M575 -72V11.5214C575 17.8295 569.886 22.9432 563.578 22.9432H482.909C476.601 22.9432 471.487 28.0569 471.487 34.3649V115.031C471.487 121.339 466.373 126.453 460.065 126.453H379.396C373.087 126.453 367.973 131.566 367.973 137.874V218.54C367.973 224.848 373.087 229.962 379.396 229.962H460.065C466.373 229.962 471.487 224.848 471.487 218.54V136.447L471.587 135.772C472.353 130.599 476.744 126.736 481.973 126.635L491.475 126.453H563.578C569.886 126.453 575 131.566 575 137.874V218.54C575 224.848 569.886 229.962 563.578 229.962H482.195L479.483 230.143C474.983 230.443 471.487 234.18 471.487 238.69V247.452M471.487 238.528V322.05C471.487 328.358 466.373 333.472 460.065 333.472H379.396C373.087 333.472 367.973 338.585 367.973 344.893V425.559" stroke="#EAF3FC" strokeWidth="0.431035"/>
        <path d="M865 -72V11.5214C865 17.8295 870.114 22.9432 876.422 22.9432H957.091C963.399 22.9432 968.513 28.0569 968.513 34.3649V115.031C968.513 121.339 973.627 126.453 979.935 126.453H1060.604C1066.912 126.453 1072.026 131.566 1072.026 137.874V218.54C1072.026 224.848 1066.912 229.962 1060.604 229.962H979.935C973.627 229.962 968.513 224.848 968.513 218.54V136.447L968.413 135.772C967.647 130.599 963.256 126.736 958.027 126.635L948.525 126.453H876.422C870.114 126.453 865 131.566 865 137.874V218.54C865 224.848 870.114 229.962 876.422 229.962H957.805L960.517 230.143C965.017 230.443 968.513 234.18 968.513 238.69V247.452M968.513 238.528V322.05C968.513 328.358 973.627 333.472 979.935 333.472H1060.604C1066.912 333.472 1072.026 338.585 1072.026 344.893V425.559" stroke="#EAF3FC" strokeWidth="0.431035"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 mxw flex flex-col justify-center items-center gap-16 sm:gap-20 px-6 sm:px-10 md:px-16 lg:px-20 pt-10 pb-16 sm:pb-20 rounded-3xl">
        <div className="flex flex-col items-center gap-6 text-center w-full max-w-225">
          <h1 className="font-rethink text-white text-center font-bold leading-[120%] tracking-[-1.872px] m-0 text-4xl sm:text-5xl lg:text-[48px]">
            {title}
          </h1>
          <p
            className="font-rethink text-white text-center font-normal leading-[140%] m-0 text-base sm:text-lg"
            style={{ opacity: 0.8, fontSize: "18px" }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}