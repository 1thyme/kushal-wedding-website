import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeToggle from './components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kushal & Sakshi\'s Wedding',
  description: 'Join us in celebrating our wedding! December 5th, 2025',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
