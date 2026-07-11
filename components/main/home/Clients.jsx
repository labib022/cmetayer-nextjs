"use client";

// ✅ redux path fix: redux/ → lib/redux/
import { useGetHomePageQuery } from "../../../lib/redux/features/cms/cmsApi";

// ✅ public/ folder থেকে import লাগে না — সরাসরি string path
// ❌ আগে: import clientImg1 from "../../../public/images/client-img-1.png" (duplicate নামও ছিল bug)
const clientImg1Src = "/images/client-img-1.png";
const clientImg2Src = "/images/client-img-2.png";

const fallbackCards = [
  { type: "person",     img: clientImg1Src },
  { type: "stat-dark",  logo: "△", company: "Greenview Apartment", stat: "85+",  label: "Move-Out Cleans Completed", desc: "Fast, detailed turnover cleaning for rental unit transitions." },
  { type: "person",     img: clientImg2Src },
  { type: "stat-light", logo: "⬡", company: "UrbanStay Suites",    stat: "200+", label: "Guest Turnovers",           desc: "Reliable Airbnb cleaning with consistent finishing." },
];

const fallbackImgs  = [clientImg1Src, clientImg2Src];
const fallbackStats = [
  { type: "stat-light", logo: "⬡", company: "UrbanStay Suites",    stat: "200+", label: "Guest Turnovers",           desc: "Reliable Airbnb cleaning with consistent finishing." },
  { type: "stat-dark",  logo: "△", company: "Greenview Apartment", stat: "85+",  label: "Move-Out Cleans Completed", desc: "Fast, detailed turnover cleaning for rental unit transitions." },
];

const cardSize = { width: "clamp(220px, 28vw, 300px)", height: "clamp(260px, 32vw, 350px)" };

const PersonCard = ({ card }) => (
  <div className="client-person-card shrink-0 cursor-pointer"
    style={{ ...cardSize, borderRadius: "16px", background: `url(${card.img}) lightgray center / cover no-repeat` }} />
);

const StatDarkCard = ({ card }) => (
  <div className="client-stat-dark shrink-0 cursor-pointer"
    style={{ ...cardSize, padding: "20px", borderRadius: "24px", background: "#08203C", boxShadow: "7px 3px 0 0 #ECEEF0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ color: "#fff", fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(18px,2vw,24px)", fontWeight: 700 }}>{card.logo}</span>
      <span style={{ color: "rgba(255,255,255,0.75)", fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 500 }}>{card.company}</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ color: "#fff", fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, lineHeight: "1", margin: 0 }}>{card.stat}</p>
      <p style={{ color: "#fff", fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 700, margin: 0 }}>{card.label}</p>
      <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(11px,1.2vw,14px)", margin: 0, lineHeight: "1.5" }}>{card.desc}</p>
    </div>
  </div>
);

const StatLightCard = ({ card }) => (
  <div className="client-stat-light shrink-0 cursor-pointer"
    style={{ ...cardSize, padding: "20px", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span className="stat-light-text" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(18px,2vw,24px)", fontWeight: 700 }}>{card.logo}</span>
      <span className="stat-light-text" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 500 }}>{card.company}</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p className="stat-light-text" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, lineHeight: "1", margin: 0 }}>{card.stat}</p>
      <p className="stat-light-text" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 700, margin: 0 }}>{card.label}</p>
      <p className="stat-light-subtext" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(11px,1.2vw,14px)", margin: 0, lineHeight: "1.5" }}>{card.desc}</p>
    </div>
  </div>
);

export default function Clients() {
  const { data, isLoading } = useGetHomePageQuery();

  const clientSection = data?.data?.home?.["Clients"]?.[0];
  const heading = clientSection?.heading || "Trusted by Home and\nProperty Owners";

  const cards = (() => {
    const items = clientSection?.testimonial_items;
    if (!items?.length) return fallbackCards;
    const result = [];
    items.forEach((item, i) => {
      result.push({ type: "person", img: item.client_image || fallbackImgs[i % fallbackImgs.length] });
      result.push({
        ...fallbackStats[i % fallbackStats.length],
        ...(item.organization && { company: item.organization }),
        ...(item.items        && { stat: item.items }),
        ...(item.service      && { label: item.service }),
        ...(item.message      && { desc: item.message }),
      });
    });
    return result;
  })();

  const minRepeat   = Math.ceil(12 / cards.length);
  const loopedCards = Array.from({ length: minRepeat * 2 }, () => cards).flat();

  return (
    <section className="w-full bg-white overflow-hidden py-16">
      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .clients-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: marqueeLeft 50s linear infinite;
          will-change: transform;
        }
        .clients-track:hover { animation-play-state: paused; }
        .client-person-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .client-person-card:hover { transform: rotate(6deg) translateY(-10px); box-shadow: 12px 8px 0 0 #ECEEF0; }
        .client-stat-dark { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .client-stat-dark:hover { transform: rotate(6deg) translateY(-10px); box-shadow: 12px 8px 0 0 #ECEEF0; }
        .client-stat-light { background: rgba(8, 32, 60, 0.08) !important; transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease; }
        .client-stat-light:hover { background: #08203C !important; transform: rotate(6deg) translateY(-10px); box-shadow: 12px 8px 0 0 #ECEEF0; }
        .stat-light-text { color: #08203C; transition: color 0.3s ease; }
        .client-stat-light:hover .stat-light-text { color: #ffffff; }
        .stat-light-subtext { color: #656565; transition: color 0.3s ease; }
        .client-stat-light:hover .stat-light-subtext { color: rgba(255,255,255,0.7); }
      `}</style>

      {/* HEADER */}
      <div className="max-w-300 mx-auto px-6 lg:px-16 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#08203C" }} />
              <span style={{ color: "#08203C", fontFamily: '"Rethink Sans", sans-serif', fontSize: "13px", fontWeight: 500 }}>Clients</span>
            </div>
            <h2 style={{ color: "#08203C", fontFamily: '"Rethink Sans", sans-serif', fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, lineHeight: "1.2", margin: 0 }}>
              {heading.includes("\n")
                ? heading.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)
                : heading}
            </h2>
          </div>
          <p style={{ color: "#7a849a", fontFamily: '"Rethink Sans", sans-serif', fontSize: "14px", lineHeight: "1.6", maxWidth: "340px", margin: 0 }}
            className="lg:text-right lg:pt-12">
            From family homes to rentals, clients choose for reliable, professional cleaning.
          </p>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="w-full overflow-hidden">
        {isLoading
          ? <div className="flex gap-10 px-5 py-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 rounded-2xl animate-pulse bg-gray-200" style={cardSize} />
              ))}
            </div>
          : <div className="clients-track py-8 px-5">
              {loopedCards.map((card, i) => {
                if (card.type === "person")     return <PersonCard    key={i} card={card} />;
                if (card.type === "stat-dark")  return <StatDarkCard  key={i} card={card} />;
                if (card.type === "stat-light") return <StatLightCard key={i} card={card} />;
                return null;
              })}
            </div>
        }
      </div>
    </section>
  );
}