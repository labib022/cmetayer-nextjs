export default function MovingBookPage() {
  return (
    <div className="page">
      <section className="section-card form-card">
        <h1>Book Moving</h1>
        <label>
          Date
          <input type="date" />
        </label>
        <label>
          Pickup address
          <input placeholder="Enter pickup address" />
        </label>
        <label>
          Drop-off address
          <input placeholder="Enter drop-off address" />
        </label>
        <button className="btn btn-primary">Confirm booking</button>
      </section>
    </div>
  );
}
