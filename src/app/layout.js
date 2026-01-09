import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '../contexts/Web3Context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GreenXchange - Trade Green Credits',
  description: 'Blockchain-powered marketplace for verified environmental credits',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-900 text-white min-h-screen">
        <Web3Provider>
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Simple footer only - no complex nav */}
          <footer className="text-center p-6 text-gray-500 text-sm border-t border-gray-800">
            <p>GreenXchange • Powered by Ethereum Sepolia</p>
            <p className="mt-2">Trade verified green credits with full transparency</p>
          </footer>
        </Web3Provider>
      </body>
    </html>
  );
}