import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fiap Tech Challenge - Grupo 15',
  description: 'Projeto Tech Challenge do Grupo 15',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
