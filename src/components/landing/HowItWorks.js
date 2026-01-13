import { FiUpload, FiRepeat, FiShield, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    step: '01',
    title: 'Connect Wallet',
    description: 'Connect your Web3 wallet and switch to Mantle Sepolia network for ultra-low fees.',
    icon: FiUpload,
  },
  {
    step: '02',
    title: 'Select Credits',
    description: 'Choose from Carbon, Water, Renewable Energy, or Green credits to trade.',
    icon: FiRepeat,
  },
  {
    step: '03',
    title: 'Trade Securely',
    description: 'Execute trades using our AMM or orderbook system with enterprise-grade security.',
    icon: FiShield,
  },
  {
    step: '04',
    title: 'Track Impact',
    description: 'Monitor your portfolio and environmental impact with real-time analytics.',
    icon: FiCheckCircle,
  },
]

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
          Start trading environmental credits in just four simple steps
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/20 p-8 transition-all hover:border-primary-500/50 hover:bg-gray-900/80"
            >
              <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-sm font-bold text-white">
                {item.step}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="rounded-xl bg-primary-500/10 p-3">
                  <item.icon className="h-6 w-6 text-primary-400" />
                </div>
              </div>
              <h3 className="mt-6 text-center text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-center text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}