export default function ContactPage() {
  return (
    <div className="page">
      <section className="section-card form-card">
        <h1>Contact us</h1>
        <p>Share your needs and we will follow up promptly.</p>
        <label>
          Name
          <input placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Message
          <textarea rows="4" placeholder="How can we help?" />
        </label>
        <button className="btn btn-primary">Send message</button>
      </section>
    </div>
  );
}
