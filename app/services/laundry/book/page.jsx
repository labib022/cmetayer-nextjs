export default function LaundryBookPage() {
  return (
    <div className="page">
      <section className="section-card form-card">
        <h1>Book Laundry</h1>
        <label>
          Pickup date
          <input type="date" />
        </label>
        <label>
          Items to wash
          <textarea rows="4" placeholder="Describe the items" />
        </label>
        <button className="btn btn-primary">Confirm booking</button>
      </section>
    </div>
  );
}
