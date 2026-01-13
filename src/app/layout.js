import './globals.css'
import { Web3Provider } from '../context/Web3Context'

export const metadata = {
  title: 'GreenXchange - Decentralized Green Credits Exchange',
  description: 'A Complete DEX for Tokenized Environmental Assets on Mantle L2',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}