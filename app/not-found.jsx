import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page center">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">Go home</Link>
    </div>
  );
}
