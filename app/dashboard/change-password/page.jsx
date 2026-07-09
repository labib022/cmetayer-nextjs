export default function ChangePasswordPage() {
  return (
    <div>
      <h2>Change password</h2>
      <label>
        Current password
        <input type="password" placeholder="Current password" />
      </label>
      <label>
        New password
        <input type="password" placeholder="New password" />
      </label>
      <button className="btn btn-primary">Update password</button>
    </div>
  );
}
