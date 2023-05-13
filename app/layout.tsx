import './globals.css';
import { Nunito } from 'next/font/google';

import Navbar from './components/Navbar';
import RegisterModal from './components/Modal/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import LoginModal from './components/Modal/LoginModal';
import { getCurrentUser } from './helpers/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Staycify ',
  description: 'Staycify - Find the perfect place to stay at an amazing price in 200 countries.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
