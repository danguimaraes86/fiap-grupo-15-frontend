'use client';
import './Nav.css';
import { SetStateAction, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Nav() {
  const pathname = usePathname();
  const [selected, setSelected] = useState('');

  const menuItems = [
    { label: 'Início', href: '/dashboard' },
    { label: 'Transferências', href: '/transferencias' },
    { label: 'Investimentos', href: '/investimentos' },
    { label: 'Outros serviços', href: '/outros-servicos' },
  ];

  const handleClick = (label: SetStateAction<string>) => {
    setSelected(label);
  };

  return (
    <nav className="card">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={
              pathname === item.href || selected === item.label ? 'active' : ''
            }
            onClick={() => handleClick(item.label)}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
