export default function RepairBookPage() {
  return (
    <div className="page">
      <section className="section-card form-card">
        <h1>Book Repair</h1>
        <label>
          Issue summary
          <input placeholder="What needs repair?" />
        </label>
        <label>
          Preferred time
          <input type="datetime-local" />
        </label>
        <button className="btn btn-primary">Confirm booking</button>
      </section>
    </div>
  );
}
