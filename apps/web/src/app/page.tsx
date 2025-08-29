import Link from "next/link";

export default function HomePage() {
  return (
    <h1 className="mt-70 text-center text-4xl">
      <Link href="/signup">Sign Up</Link>
    </h1>
  );
}
