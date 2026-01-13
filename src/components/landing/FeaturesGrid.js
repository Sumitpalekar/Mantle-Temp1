import { FiLock, FiDollarSign, FiRepeat, FiActivity, FiLayers, FiGlobe } from 'react-icons/fi'

const features = [
  {
    name: 'Multi-Credit Support',
    description: 'Trade Carbon, Water, Renewable Energy, and Green Credits in one unified platform.',
    icon: FiLayers,
  },
  {
    name: 'Dual Trading System',
    description: 'AMM for instant swaps and Orderbook for limit orders with advanced price discovery.',
    icon: FiRepeat,
  },
  {
    name: 'Mantle L2 Integration',
    description: 'Near-zero gas fees, fast transactions, and Ethereum-level security on Mantle Network.',
    icon: FiGlobe,
  },
  {
    name: 'USDC Settlement',
    description: 'All trades settled in USDC stablecoin for price stability and easy accounting.',
    icon: FiDollarSign,
  },
  {
    name: 'Enterprise Security',
    description: 'Built with OpenZeppelin standards, reentrancy protection, and upgradeable contracts.',
    icon: FiLock,
  },
  {
    name: 'Real-time Analytics',
    description: 'Comprehensive dashboards with volume, price charts, and portfolio tracking.',
    icon: FiActivity,
  },
]

export default function FeaturesGrid() {
  return (
    <div id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Why Choose GreenXchange
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
          A complete DeFi ecosystem for environmental assets, built for traders, projects, and corporations.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/20 p-8 transition-all hover:border-primary-500/50 hover:bg-gray-900/80"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-primary-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 inline-flex rounded-xl bg-primary-500/10 p-3">
                <feature.icon className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}