import Link from 'next/link';

const services = [
  { title: 'Moving', href: '/services/moving', blurb: 'Fast and reliable relocation support.' },
  { title: 'Cleaning', href: '/services/cleaning', blurb: 'Residential and office cleaning for every space.' },
  { title: 'Laundry', href: '/services/laundry', blurb: 'Convenient garment and textile care.' },
  { title: 'Repair', href: '/services/repair', blurb: 'Quick fixes for home and business essentials.' }
];

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero-card">
        <p className="eyebrow">Flexible service booking</p>
        <h1>Book dependable home and business services in minutes.</h1>
        <p>Choose from moving, cleaning, laundry, and repair solutions tailored to your schedule.</p>
        <div className="hero-actions">
          <Link href="/services/moving" className="btn btn-primary">Explore services</Link>
          <Link href="/contact" className="btn btn-secondary">Contact us</Link>
        </div>
      </section>

      <section className="grid">
        {services.map((service) => (
          <article key={service.title} className="card">
            <h2>{service.title}</h2>
            <p>{service.blurb}</p>
            <Link href={service.href} className="text-link">Learn more →</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
