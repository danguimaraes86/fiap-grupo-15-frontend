import Link from 'next/link';

export default function NotFoundView() {
  return (
    <main className="bg-primary">
      <Link className="text-black" href={'/'}>
        not found!
      </Link>
    </main>
  );
}
