export default function CleaningBookPage() {
  return (
    <div className="page">
      <section className="section-card form-card">
        <h1>Book Cleaning</h1>
        <label>
          Service type
          <select>
            <option>Standard cleaning</option>
            <option>Deep cleaning</option>
            <option>Office cleaning</option>
          </select>
        </label>
        <label>
          Preferred date
          <input type="date" />
        </label>
        <button className="btn btn-primary">Confirm booking</button>
      </section>
    </div>
  );
}
