import Link from 'next/link';

export default function CleaningPage() {
  return (
    <div className="page">
      <section className="section-card">
        <h1>Cleaning Services</h1>
        <p>Keep your home or office spotless with recurring or one-time cleaning appointments.</p>
        <Link href="/services/cleaning/book" className="btn btn-primary">Book cleaning service</Link>
      </section>
    </div>
  );
}
