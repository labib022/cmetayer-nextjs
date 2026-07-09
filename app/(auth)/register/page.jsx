export default function RegisterPage() {
  return (
    <div>
      <h1>Create account</h1>
      <label>
        Full name
        <input placeholder="Your full name" />
      </label>
      <label>
        Email
        <input type="email" placeholder="you@example.com" />
      </label>
      <label>
        Password
        <input type="password" placeholder="Create password" />
      </label>
      <button className="btn btn-primary">Register</button>
    </div>
  );
}
