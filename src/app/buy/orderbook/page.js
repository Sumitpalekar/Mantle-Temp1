import Orderbook from '@/components/trading/Orderbook';

export const metadata = {
  title: 'Orderbook Trading | GreenXchange',
  description: 'Trade environmental credits using limit orders on our orderbook',
};

export default function OrderbookPage() {
  return <Orderbook />;
}