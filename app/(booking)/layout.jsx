import Link from 'next/link';

export default function BookingLayout({ children }) {
  return (
    <div className="page">
      <div className="section-card">
        <div className="row">
          <Link href="/services/moving" className="text-link">Moving</Link>
          <Link href="/services/cleaning" className="text-link">Cleaning</Link>
          <Link href="/services/laundry" className="text-link">Laundry</Link>
          <Link href="/services/repair" className="text-link">Repair</Link>
        </div>
        {children}
      </div>
    </div>
  );
}
