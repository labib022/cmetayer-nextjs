import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="page">
      <div className="section-card">
        <h1>Dashboard</h1>
        <div className="row">
          <Link href="/dashboard" className="text-link">Overview</Link>
          <Link href="/dashboard/profile" className="text-link">Profile</Link>
          <Link href="/dashboard/change-password" className="text-link">Change password</Link>
        </div>
        <div style={{ marginTop: '1rem' }}>{children}</div>
      </div>
    </div>
  );
}
