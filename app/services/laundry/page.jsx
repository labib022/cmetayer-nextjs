import Link from 'next/link';

export default function LaundryPage() {
  return (
    <div className="page">
      <section className="section-card">
        <h1>Laundry Services</h1>
        <p>Enjoy quick and reliable laundry pickup, washing, folding, and delivery.</p>
        <Link href="/services/laundry/book" className="btn btn-primary">Book laundry service</Link>
      </section>
    </div>
  );
}
