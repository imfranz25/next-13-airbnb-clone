import './globals.css';
import { Nunito } from 'next/font/google';

import Navbar from './components/Navbar/Navbar';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Staycify ',
  description: 'Staycify - Find the perfect place to stay at an amazing price in 200 countries.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
