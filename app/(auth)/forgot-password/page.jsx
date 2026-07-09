export default function ForgotPasswordPage() {
  return (
    <div>
      <h1>Forgot password</h1>
      <label>
        Email
        <input type="email" placeholder="you@example.com" />
      </label>
      <button className="btn btn-primary">Send reset code</button>
    </div>
  );
}
