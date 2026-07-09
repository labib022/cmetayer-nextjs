import Link from 'next/link';

export default function MovingPage() {
  return (
    <div className="page">
      <section className="section-card">
        <h1>Moving Services</h1>
        <p>Plan your move with professional support for packing, loading, transport, and setup.</p>
        <Link href="/services/moving/book" className="btn btn-primary">Book moving service</Link>
      </section>
    </div>
  );
}
