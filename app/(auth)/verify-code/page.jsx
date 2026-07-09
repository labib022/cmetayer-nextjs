export default function VerifyCodePage() {
  return (
    <div>
      <h1>Verify code</h1>
      <label>
        Verification code
        <input placeholder="Enter 6-digit code" />
      </label>
      <button className="btn btn-primary">Verify</button>
    </div>
  );
}
