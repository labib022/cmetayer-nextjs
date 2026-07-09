import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div className="page">
      <div className="section-card form-card">
        <div className="row">
          <Link href="/login" className="text-link">Login</Link>
          <Link href="/register" className="text-link">Register</Link>
          <Link href="/forgot-password" className="text-link">Forgot password</Link>
        </div>
        {children}
      </div>
    </div>
  );
}
