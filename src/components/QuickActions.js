'use client';

export default function QuickActions() {
  const actions = [
    { label: 'Buy Carbon', icon: '🛒', color: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' },
    { label: 'Sell Water', icon: '💰', color: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' },
    { label: 'View Impact', icon: '📊', color: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' },
    { label: 'Add Project', icon: '🏭', color: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' },
    { label: 'Get Help', icon: '❓', color: 'bg-gray-700 text-gray-300 hover:bg-gray-600' },
    { label: 'Settings', icon: '⚙️', color: 'bg-gray-700 text-gray-300 hover:bg-gray-600' }
  ];
  
  return (
    <div>
      <h3 className="font-medium text-white mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${action.color} hover:scale-105`}
          >
            <span className="text-xl mb-1">{action.icon}</span>
            <span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}