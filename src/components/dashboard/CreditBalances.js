import { FiDollarSign, FiTrendingUp } from 'react-icons/fi'

const credits = [
  { type: 'Carbon', symbol: 'CARBON', balance: '1,250', value: '$12,500', color: 'bg-emerald-500', change: '+2.5%' },
  { type: 'Water', symbol: 'WATER', balance: '500', value: '$5,000', color: 'bg-blue-500', change: '+1.2%' },
  { type: 'Renewable', symbol: 'RENEW', balance: '750', value: '$7,500', color: 'bg-yellow-500', change: '-0.5%' },
  { type: 'Green', symbol: 'GREEN', balance: '1,000', value: '$10,000', color: 'bg-green-500', change: '+3.8%' },
]

export default function CreditBalances() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Credit Balances</h3>
        <FiDollarSign className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {credits.map((credit) => (
          <div
            key={credit.type}
            className="flex items-center justify-between rounded-lg bg-gray-900/50 p-4"
          >
            <div className="flex items-center space-x-3">
              <div className={`h-10 w-10 rounded-lg ${credit.color} flex items-center justify-center`}>
                <span className="text-white font-bold">{credit.symbol.charAt(0)}</span>
              </div>
              <div>
                <div className="font-medium text-white">{credit.type}</div>
                <div className="text-sm text-gray-400">{credit.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{credit.balance} CC</div>
              <div className="flex items-center justify-end space-x-1 text-sm">
                <FiTrendingUp className={`h-3 w-3 ${
                  credit.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`} />
                <span className={credit.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                  {credit.change}
                </span>
              </div>
              <div className="text-xs text-gray-400">{credit.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-gray-900/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Value</span>
          <span className="text-2xl font-bold text-white">$35,000</span>
        </div>
      </div>
    </div>
  )
}