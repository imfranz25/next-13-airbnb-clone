import './globals.css';
import { Nunito } from 'next/font/google';
import getCurrentUser from './helpers/getCurrentUser';

import ToastProvider from './providers/ToastProvider';
import Navbar from './components/Navbar';
import RegisterModal from './components/Modal/RegisterModal';
import LoginModal from './components/Modal/LoginModal';
import RentModal from './components/Modal/RentModal';
import SearchModal from './components/Modal/SearchModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb ',
  description: 'Airbnb - Find the perfect place to stay at an amazing price in 200 countries.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
