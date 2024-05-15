import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-semibold text-gray-700 text-gray-200">404</h1>
      <p className="text-gray-700 text-gray-300">Page not found. Check the address or <Link href="/">go back</Link>.</p>
    </div>
  );
}
