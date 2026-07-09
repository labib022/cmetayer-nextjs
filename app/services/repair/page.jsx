import Link from 'next/link';

export default function RepairPage() {
  return (
    <div className="page">
      <section className="section-card">
        <h1>Repair Services</h1>
        <p>Get fast assistance for household and commercial repair requests.</p>
        <Link href="/services/repair/book" className="btn btn-primary">Book repair service</Link>
      </section>
    </div>
  );
}
