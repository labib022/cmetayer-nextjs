export default function ResetPasswordPage() {
  return (
    <div>
      <h1>Reset password</h1>
      <label>
        New password
        <input type="password" placeholder="Enter new password" />
      </label>
      <label>
        Confirm password
        <input type="password" placeholder="Confirm new password" />
      </label>
      <button className="btn btn-primary">Save password</button>
    </div>
  );
}
