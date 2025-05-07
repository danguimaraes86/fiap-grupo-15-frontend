import Link from 'next/link';

export default function HomeView() {
  return (
    <main className="bg-primary">
      <Link className="text-black" href={'/teste'}>
        Hello World! <i className="bi bi-cash-coin"></i>
      </Link>
    </main>
  );
}
