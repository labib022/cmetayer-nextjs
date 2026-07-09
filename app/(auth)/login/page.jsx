export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <label>
        Email
        <input type="email" placeholder="you@example.com" />
      </label>
      <label>
        Password
        <input type="password" placeholder="Enter password" />
      </label>
      <button className="btn btn-primary">Sign in</button>
    </div>
  );
}
