'use client';
import { useState } from 'react';

export default function CreditTypes({ compact = false }) {
  const [selected, setSelected] = useState('carbon');
  
  const credits = [
    { id: 'carbon', emoji: '🌍', name: 'Carbon', price: '$15.75', desc: 'Offset 1 ton CO₂' },
    { id: 'water', emoji: '💧', name: 'Water', price: '$8.20', desc: 'Conserve 1000L water' },
    { id: 'renewable', emoji: '⚡', name: 'Renewable', price: '$22.50', desc: '1 MWh clean energy' },
    { id: 'green', emoji: '🌿', name: 'Green', price: '$12.30', desc: 'Verified green projects' }
  ];
  
  if (compact) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {credits.map(credit => (
          <div
            key={credit.id}
            onClick={() => setSelected(credit.id)}
            className={`text-center p-2 rounded-lg cursor-pointer transition-colors ${
              selected === credit.id ? 'bg-emerald-500/20' : 'bg-gray-800/30'
            }`}
          >
            <div className="text-xl">{credit.emoji}</div>
            <p className="text-xs mt-1">{credit.name}</p>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-white">Credit Types</h3>
      {credits.map(credit => (
        <div
          key={credit.id}
          onClick={() => setSelected(credit.id)}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
            selected === credit.id
              ? 'bg-emerald-500/20 border border-emerald-500/30'
              : 'bg-gray-800/30 hover:bg-gray-800/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{credit.emoji}</div>
            <div>
              <p className="font-medium text-white">{credit.name} Credits</p>
              <p className="text-xs text-gray-400">{credit.desc}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-white">{credit.price}</p>
            <p className="text-xs text-gray-400">per credit</p>
          </div>
        </div>
      ))}
    </div>
  );
}