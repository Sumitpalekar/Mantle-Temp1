import { FiTrendingUp, FiDollarSign, FiUsers, FiActivity } from 'react-icons/fi'

const stats = [
  {
    name: 'Total Volume',
    value: '$1.2M',
    change: '+12.5%',
    icon: FiTrendingUp,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    name: 'TVL',
    value: '$4.8M',
    change: '+8.2%',
    icon: FiDollarSign,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    name: 'Active Traders',
    value: '1,234',
    change: '+5.7%',
    icon: FiUsers,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    name: 'Transactions',
    value: '24.5K',
    change: '+15.3%',
    icon: FiActivity,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
  },
]

export default function StatsOverview() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Market Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg ${stat.bgColor} p-2`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.name}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="ml-1 text-gray-400">from last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}