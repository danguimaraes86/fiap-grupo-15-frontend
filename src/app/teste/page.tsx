import Link from 'next/link';
import TesteComponent from '../../components/teste';

export default function TesteView() {
  return (
    <Link href={'/'}>
      <TesteComponent />
    </Link>
  );
}
