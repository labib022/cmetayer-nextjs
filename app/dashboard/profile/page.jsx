export default function ProfilePage() {
  return (
    <div>
      <h2>Profile</h2>
      <label>
        Full name
        <input placeholder="Your full name" />
      </label>
      <label>
        Phone number
        <input placeholder="Your phone number" />
      </label>
      <button className="btn btn-primary">Save profile</button>
    </div>
  );
}
