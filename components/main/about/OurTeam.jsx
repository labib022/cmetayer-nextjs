"use client";

import { useState } from "react";
// ✅ redux path fix: redux/ → lib/redux/
import { useGetAboutUsPageQuery } from "../../../lib/redux/features/cms/cmsApi";

// ✅ assets/ import বাদ — public/ folder এর সরাসরি path
const FALLBACK_TEAM = [
  { name: "Olivia Brooks",   role: "Client Service Manager",          img: "/images/team-member-1.png", bgPos: "center" },
  { name: "Emily Walker",    role: "Home Repair Expert",              img: "/images/team-member-2.png", bgPos: "center" },
  { name: "Liam Thompson",   role: "General Maintenance Technician",  img: "/images/team-member-3.png", bgPos: "center" },
  { name: "Aisha Rahman",    role: "Home Cleaning Supervisor",        img: "/images/team-member-4.png", bgPos: "top center" },
];

const TeamCard = ({ member }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="shrink-0 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300"
      style={{ width: "280px", borderRadius: "24px", padding: "16px", backgroundColor: hovered ? "#08203C" : "#FAFAFA" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "16px",
          background: `url(${member.img}) lightgray ${member.bgPos || "center"} / cover no-repeat`,
          flexShrink: 0,
          transform: hovered ? "rotate(3deg) translateY(-6px)" : "rotate(0deg) translateY(0)",
          transition: "transform 0.3s ease",
        }}
      />
      <h3
        className="font-rethink text-center font-medium leading-[130%] tracking-[-1.248px] m-0 transition-colors duration-300"
        style={{ fontSize: "24px", color: hovered ? "#fff" : "#0B1714" }}
      >
        {member.name}
      </h3>
      <p
        className="font-rethink text-center font-normal leading-[140%] m-0 text-base transition-colors duration-300"
        style={{ color: hovered ? "rgba(255,255,255,0.75)" : "#0B1714" }}
      >
        {member.role}
      </p>
    </div>
  );
};

export default function OurTeam() {
  const { data } = useGetAboutUsPageQuery();

  const apiTeam = data?.data?.about_us?.team_members;
  const TEAM = apiTeam?.length
    ? apiTeam.map((m, i) => ({
        name:  m.name,
        role:  m.position,
        img:   m.image || m.avatar || FALLBACK_TEAM[i % FALLBACK_TEAM.length].img,
        bgPos: m.bg_position || "center",
      }))
    : FALLBACK_TEAM;

  const sectionTitle = "Meet the The Easy Lift & Clean Team";
  const sectionDesc  = "A dedicated team of professionals working together to deliver reliable and thoughtful home cleaning services.";

  const LOOPED_TEAM = [...TEAM, ...TEAM];

  return (
    <section className="w-full bg-white overflow-hidden py-20">
      <style>{`
        @keyframes teamMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .team-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: teamMarquee 10s linear infinite;
        }
        .team-track:hover { animation-play-state: paused; }
      `}</style>

      {/* HEADER */}
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-20 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#08203C" }} />
              <span className="font-rethink text-base font-semibold leading-[140%]" style={{ color: "#08203C" }}>
                Our Team
              </span>
            </div>
            <h2
              className="font-rethink text-[#111] font-medium leading-[120%] tracking-[-1.56px] m-0 text-3xl sm:text-4xl lg:text-[40px]"
              style={{ maxWidth: "414px" }}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-6">
            <p
              className="font-rethink text-[#656565] font-normal leading-[140%] m-0"
              style={{ fontSize: "18px", maxWidth: "480px" }}
            >
              {sectionDesc}
            </p>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="w-full overflow-hidden">
        <div className="team-track py-6 px-5">
          {LOOPED_TEAM.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}