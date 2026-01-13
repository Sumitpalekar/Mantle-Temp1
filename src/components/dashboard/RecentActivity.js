import { FiArrowUpRight, FiArrowDownRight, FiClock } from 'react-icons/fi'

const activities = [
  { type: 'buy', credit: 'Carbon', amount: '100', time: '2 min ago', status: 'completed' },
  { type: 'sell', credit: 'Water', amount: '50', time: '5 min ago', status: 'completed' },
  { type: 'swap', credit: 'Green', amount: '200', time: '10 min ago', status: 'pending' },
  { type: 'buy', credit: 'Renewable', amount: '75', time: '1 hour ago', status: 'completed' },
]

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <FiClock className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-gray-900/50 p-4"
          >
            <div className="flex items-center space-x-3">
              <div className={`rounded-lg p-2 ${
                activity.type === 'buy' ? 'bg-green-500/10' : 
                activity.type === 'sell' ? 'bg-red-500/10' : 'bg-blue-500/10'
              }`}>
                {activity.type === 'buy' ? (
                  <FiArrowUpRight className={`h-4 w-4 ${
                    activity.type === 'buy' ? 'text-green-400' : 
                    activity.type === 'sell' ? 'text-red-400' : 'text-blue-400'
                  }`} />
                ) : activity.type === 'sell' ? (
                  <FiArrowDownRight className="h-4 w-4 text-red-400" />
                ) : (
                  <FiArrowUpRight className="h-4 w-4 text-blue-400" />
                )}
              </div>
              <div>
                <div className="font-medium text-white">
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} {activity.credit}
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{activity.amount} CC</div>
              <div className={`text-xs ${
                activity.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {activity.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg border border-gray-700 bg-gray-800 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        View All Activity
      </button>
    </div>
  )
}